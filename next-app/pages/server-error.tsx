import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ServerError } from "../models/serverError";

export interface Server_ErrorProps {
	error:ServerError | undefined
}

export default function Server_Error({error = undefined}:Server_ErrorProps) {
	console.log('Server_Error - error: ', error);

	const router = useRouter();	
	const { message, details, statusCode  } = router.query;

	console.log(`Server_Error - message: ${message}, details: ${details}, statusCode: ${statusCode}`);

	let errMessage:string | undefined = error?.message ? error.message : '';
	let errDetails:string[] | undefined = error?.details ? error.details : new Array<string>();
	let errCode:string | undefined = error?.statusCode ? error.statusCode : '';

	// Where they exist values pushed by router supercede those entered as params 
	if (message !== undefined && !Array.isArray(message)) errMessage = message;
	if (details !== undefined && Array.isArray(details)) errDetails = details;
	if (statusCode !== undefined && !Array.isArray(statusCode)) errCode = statusCode;

    return(
		<>
			<Card sx={{marginLeft: '10%', marginRight: '10%', marginTop: 15}}>
				<CardHeader title='Server Error' titleTypographyProps={{ variant: 'h2'}} />
				<CardContent sx={{marginBottom: 3}}>
					<Typography variant="h5" sx={{ color: 'red'}}>
						Error {errCode} - {errMessage}
					</Typography>
				</CardContent> 

				{errDetails.length > 0 &&
					<>
						<CardHeader title='Stack trace' titleTypographyProps={{ variant: 'h4', color: 'teal', marginTop: 3}} />
						<CardContent>
							<Typography>
								Error Details:
							</Typography>
							{errDetails.map((errorDetail:string) => (
								<Typography variant="h6" key={errorDetail}>
									{errorDetail}
								</Typography>
							))}
						</CardContent>
					</>
				}
			</Card>
		</>
    )
}
