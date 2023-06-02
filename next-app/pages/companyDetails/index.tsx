import { Avatar, Button, Card, Stack, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import LoadingComponent from "../../components/LoadingComponent";
import Server_Error from "../server-error";
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import React from "react";
import { getCompany } from "../../lib/api/CompanyApi";
import { Company } from "../../models/company";
import { AxiosError } from "axios";

export default function CompanyDetails():JSX.Element {
	const [company, setCompany] = useState<Company | null>(null);
	const [error, setError] = useState<string | undefined>(undefined);
	const [isLoading, setLoading] = useState(false);

	const router = useRouter();

	// we know that is always a string and always present
	const { symbol } = router.query;
	const code = symbol as string;

	const theme = useTheme();

	const smallestText = useMediaQuery(theme.breakpoints.down('sm'));
	const responsiveTitleVariant = smallestText ? 'body1' : 'h5';
	const responsiveSymbolVariant = smallestText ? 'body2' : 'h6';
	const responsiveBodyTextVariant = smallestText ? 'body2' : 'body1';

	useEffect(() => {
		console.log("In CompanyDetail useEffect code: ", code);
		
		if (code){
			setLoading(true);

			getCompany(code)
				.then(
					(data) => {
						setCompany(data);
						setLoading(false);
						setError(undefined);

						console.log("In CompanyDetail useEffect data: ", data);
					},
					(error:AxiosError) => {
						if (error !== null && error !== undefined) {
							console.log("Error in companyDetails useEffect error: ", error.response?.data);
							
							setLoading(false);
							setCompany(null);
							
							if (error.response?.data !== undefined) {
								setError(error.response.data as string);
							} else {
								setError(error.message);
							}
						}
					});		
				}	
	}, [code]);

	const firstCellStyles = {
		width: 150,
		marginLeft: 4,
		borderBottomWidth: 0,
		lineHeight: 0.01
	}

	const cellStyles = {
		marginLeft: 4,
		borderBottomWidth: 0,
		lineHeight: 0.01
	}

	const headerBackGroundColor = 'rgba(50,200,250,0.05)';
	const cardFirstContentStyle = {
		"&:last-child": { paddingBottom: '10px' },
		marginBottom: 0,
		marginLeft: 2,
		marginRight: 2,
		width: '100%',
		boxShadow: 1,
		backgroundColor: headerBackGroundColor
	}

	const avatarStyle = {
		"&.MuiAvatar-root": {
			backgroundColor: 'rgba(0,0,0,0.00)',	// Fully Transparent backgroud			
			height: 90,
			width: 90,
			marginBottom: 1
		}
	}

	//console.log("Company: ", company);
	if (isLoading) {
		return <LoadingComponent message="Loading ..." />;
	} else if (company) {
		return (
				<Card sx={{ marginTop: 15, marginLeft: 5, marginRight: 5, minWidth: 350, boxShadow: 3 }}>
					<Stack direction={'row'} display='inline-flex' spacing={3} marginTop={2} width={'100%'}>
						<CardContent sx={cardFirstContentStyle}>
							<Stack
								width={'100%'}
								direction={'row'}
								spacing={3}
								justifyContent='flex-start'
								alignItems={'center'}
								sx={{ marginBottom: 0 }}
							>
								<Avatar
									variant='square'
									alt='Company Watchlist'
									sx={avatarStyle}
								>
									<AccountBalanceRoundedIcon sx={{ height: '80px', width: '80px', color: 'primary.main' }} />
								</Avatar>
								<Stack
									direction={'column'}
									spacing={2}
									justifyContent='flex-start'
								>
									<Typography variant={responsiveTitleVariant} sx={{ marginTop: 2 }}>
										{company.displayName}
									</Typography>
									<Typography variant={responsiveSymbolVariant} sx={{ marginTop: 1, marginBottom: 2, fontWeight: 'bolder' }}>
										{company.symbol}
									</Typography>
								</Stack>
							</Stack>
						</CardContent>
					</Stack>

					<CardContent sx={{ marginTop: 2, marginright: 2, marginBottom: 0 }}>
						<TableContainer sx={{ marginTop: 0 }}>
							<Table size='small'>
								<TableBody>
									<TableRow sx={{ height: '10px', minHeight: 10 }}>
										<TableCell sx={firstCellStyles}>
											<Typography variant={responsiveBodyTextVariant} sx={{ fontWeight: 'bolder' }}>Listed on:</Typography>
										</TableCell>
										<TableCell sx={cellStyles}>
											<Typography variant={responsiveBodyTextVariant}>{company.dateListed}</Typography>
										</TableCell>
									</TableRow>
									<TableRow sx={{ height: '10px', minHeight: 10 }}>
										<TableCell sx={firstCellStyles}>
											<Typography variant={responsiveBodyTextVariant} sx={{ fontWeight: 'bolder' }}>Industry Sector:</Typography>
										</TableCell>
										<TableCell sx={cellStyles}>
											<Typography variant={responsiveBodyTextVariant}>{company.sector}</Typography>
										</TableCell>
									</TableRow>

									<TableRow sx={{ height: '25px' }} />

									<TableRow sx={{ height: '20px', minHeight: 10 }}>
										<TableCell sx={firstCellStyles}>
											<Typography variant={responsiveBodyTextVariant} sx={{ fontWeight: 'bolder' }}>Price Asked:</Typography>
										</TableCell>
										<TableCell sx={cellStyles}>
											<Typography variant={responsiveBodyTextVariant}>{company.priceAsk.toString()}</Typography>
										</TableCell>
									</TableRow>
									<TableRow sx={{ height: '20px', minHeight: 10 }}>
										<TableCell sx={firstCellStyles}>
											<Typography variant={responsiveBodyTextVariant} sx={{ fontWeight: 'bolder' }}>Price Bid:</Typography>
										</TableCell>
										<TableCell sx={cellStyles}>
											<Typography variant={responsiveBodyTextVariant}>{company.priceBid.toString()}</Typography>
										</TableCell>
									</TableRow>
									<TableRow sx={{ height: '20px', minHeight: 20 }}>
										<TableCell sx={firstCellStyles}>
											<Typography variant={responsiveBodyTextVariant} sx={{ fontWeight: 'bolder' }}>Last Price:</Typography>
										</TableCell>
										<TableCell sx={cellStyles}>
											<Typography variant={responsiveBodyTextVariant}>{company.priceLast.toString()}</Typography>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</CardContent>

					<CardActions sx={{ marginTop: 2, marginLeft: 2, marginBottom: 2 }}>
						<Button
							variant='contained'
							color='primary'
							sx={{ marginLeft: 0, marginBottom: 2, color: 'white', '&.MuiButtonBase-root:hover': { color: 'white' } }}
							href='/companies'
						>
							<Typography sx={{ fontWeight: 'bolder' }}>Return to Companies</Typography>
						</Button>
					</CardActions>
				</Card>
		)		
	}
	if (error) {
		return <Server_Error error={{statusCode:"404", message:`${error}`, details:undefined}} />;
	} else {
		return (<div>ERROR</div>);
		//return <Server_Error error={{statusCode:"404", message:`Error loading details for company ${code}`, details:undefined}} />;
	}
}

