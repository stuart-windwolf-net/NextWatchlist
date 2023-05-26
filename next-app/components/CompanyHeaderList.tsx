import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Button, Card, CardActions, CardContent,  Stack,  useTheme,  Typography } from "@mui/material";
import React, { SyntheticEvent } from "react";
import link from "next/link";
import useMediaQuery from '@mui/material/useMediaQuery';
import { CompanyHeader } from "../models/companyHeader";
import EmptyWatchList from "./EmptyWatchList";
import { CompanyHeaderProps } from "../pages/companies/index"; 
import { useRouter } from "next/router";
import { deleteCompany } from "../lib/api/CompanyApi";


export default function CompanyHeaderList({headers}:CompanyHeaderProps) { 
	const router = useRouter();
 
	async function handleCompanyHeaderDelete(e:SyntheticEvent<HTMLButtonElement>, id: number) {
		await deleteCompany(id).then (() => {
			router.reload();
		});
    }

	console.log ("CompanyHeaderList Array.isArray(headers): ", Array.isArray(headers));

	const theme = useTheme();
	const smallestText = useMediaQuery(theme.breakpoints.down('sm'));

	const responsiveVariant =  smallestText ? 'body1' : 'h6';

	const avatarStyle = {
		"&.MuiAvatar-root": {
			backgroundColor: "primary.main",
			height: "50px",
			width: "50px"
		}
	};

	if (headers === null || headers === undefined || headers?.length === 0) {
		return <EmptyWatchList headers={headers} />;
	} 

	return (
		<Box>
			{ headers.map((companyHeader: CompanyHeader) => (
					<Card 
						key={companyHeader.symbol}
						sx={{ 
							marginTop: 3, 
							boxShadow: 6, 
							minWidth: '350px', 
							border: '2px solid ' + theme.palette.primary.light
						}}							
					>	
					<CardContent sx={{ marginTop: 2, marginLeft: 2}}>
						<Stack 
							direction={'row'} 
							spacing={3} 
							justifyContent='flex-start'	
							alignItems={'center'}
						>
							<Avatar sx={{...avatarStyle, color: 'white'}}>{companyHeader.symbol}</Avatar>
							<Typography variant={responsiveVariant}>
								{companyHeader.displayName}
							</Typography>
						</Stack>
					</CardContent>  

					<CardActions>
						<Stack 
							direction={'row'} 
							spacing={2} 
							justifyContent='flex-end' 
							sx={{ width: '100%', marginRight: 2, marginBottom: 2}}
						>
							<Button 																	
								component={link} 
								href={`/companyDetails?symbol=${companyHeader.symbol}`}  
								variant='contained' 									
								color='primary'
								sx={{ '&.MuiButtonBase-root:hover': {color: 'white'} }}							
							>
								<b>View</b>
							</Button>

							<LoadingButton 									 
								name={ companyHeader.id.toString() }
								onClick={(e) => handleCompanyHeaderDelete(e, companyHeader.id)} 
								variant='contained' 
								color='error'
								sx={{color: 'white'}}									
							>
								<b>Delete</b>
							</LoadingButton>	
						</Stack>
					</CardActions>
					</Card>
				))}
		</Box>
	)
}


