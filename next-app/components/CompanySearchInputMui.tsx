import React, { SyntheticEvent, useState, KeyboardEvent, MouseEvent } from 'react'
import { toast } from 'react-toastify';
import { CompanyHeader } from '../models/companyHeader';
import { useRouter } from 'next/router';
import {createCompany} from '../lib/api/CompanyApi'

import SearchIcon from '@mui/icons-material/Search';
import { TextField, Paper, IconButton, InputAdornment, Box } from '@mui/material';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
//import CompanyHeaderList from './CompanyHeaderList';
import { CompanyHeaderProps } from '../pages/companies';
//import agent, {revalidate} from '../pages/api/agent';
//import CompanyDetails from '../pages/companyDetails';


export default function CompanySearchInputMui({headers}:CompanyHeaderProps): React.ReactElement {
	const companyHeaders:Array<CompanyHeader> = headers;
	console.log('CompanySearchInputMui companyHeaders isArray: ', Array.isArray(companyHeaders));

	const router = useRouter();

	const [code, setCode] = useState('');

	function handleInputChange(e: SyntheticEvent<HTMLInputElement>) {
		setCode(e.currentTarget.value);
	}

	function isAlpha(name: string): boolean {
		return /^[A-Za-z]*$/.test(name);
	}

	async function addCompany() {
		code ? console.log(`In - addCompany() code: ${code}`) : console.log('In - addCompany() code: is null'); 

		// Validate first
		if (code.length < 1 || code.length > 6) {
			toast.error("A symbol from 1 to 6 alphabetic characters is required");
			return;
		} else if (!isAlpha(code)) {
			toast.error("A symbol may only contain alphabetic characters");
			return;
		}

		if (companyHeaders.length >= 20) {
			toast.error("A maximum of 20 companies may be stored in the watch list");
			return;
		}

		const head: CompanyHeader | undefined = companyHeaders.find(ch => ch.symbol.toUpperCase() === code.toUpperCase());
		if (head) {
			console.log("CompanySearchInputMui head?.symbol: ", head?.symbol);

			toast.error(`A duplicate entry for ${code.toUpperCase()}, already exists!`);
			return;
		}

		// Now create a new header to populate and save 
		const header: CompanyHeader = {
			id: 0,
			displayName: '',
			symbol: code,
			dateListed: '',
			sector: ''
		}

		await createCompany(header).then(() => {
			console.log("CompanySearchInputMui code: ", code);
			setCode('');
			router.reload();

			return;
		})
	}
	
	async function handleInputClick(e: MouseEvent<HTMLButtonElement>) {
		console.log ('e.currentTarget.value: ', e.currentTarget.value);
		console.log ('e.target', e.target);

		setCode(e.currentTarget.value);
		await addCompany();
	}

	async function handleInputKeyPress(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			e.preventDefault();
			console.log ('e.currentTarget.value: ', e.currentTarget.value);
			console.log ('e.target', e.target);
	
			setCode(e.currentTarget.value);
			await addCompany();
		}
	}


	return (
		<Paper component="form" 
					sx={{ 
						display: 'flex', 
						alignItems: 'center', 
						width: '100%', 
						height: '150px', 
						border: 0,
						boxShadow: 'none',
						backgroundColor:'white' }}
						>
			<Box sx={{ 
						height: '80px',
				 		width: '352px',
						marginLeft: '10%',
						border: '2px solid deepskyblue',
						boxShadow: 6						
					}}
					>
				<TextField
					sx={{ verticalAlign: 'center', marginTop:3, marginLeft:'20px' }}
					size='small'
					id="input-with-icon-textfield"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountBalanceRoundedIcon sx={{ marginLeft: 1, color: 'deepskyblue' }} />
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									type="button"
									sx={{ p: 5 }} aria-label="search"
									onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleInputClick(e)}
								>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
						disableUnderline: true
					}}
					variant="standard"
					placeholder='ASX Symbol'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
					onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handleInputKeyPress(e)}
					value={code}
				/>
			</Box>
		</Paper>
	)
}

