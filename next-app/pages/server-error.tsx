import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ServerError } from "../models/serverError";

export interface Server_ErrorProps {
	error:ServerError | undefined
}

export default function Server_Error({error = undefined}:Server_ErrorProps) {
	const router = useRouter();	

	const { routeMessage, routeDetails, routeStatusCode } = router.query;
	let message, details, statusCode;	

	if (error !== undefined && error !== null) {
		message = error.message;
		details = error.details;
		statusCode = error.statusCode;		
	}

	// console.log ("Server_Error routeMessage: ", routeMessage);
	// console.log ("Server_Error routeDetails: ", routeDetails);
	// console.log ("Server_Error routeStatusCode: ", routeStatusCode);
	// console.log ("Server_Error message: ", message);
	// console.log ("Server_Error details: ", details);
	// console.log ("Server_Error statusCode: ", statusCode);

	const errMessage:string | undefined = message ? message : routeMessage as string | undefined;
	const errDetails:string[] | undefined = details ? details : routeDetails as string[] | undefined;
	const errCode:string | undefined = statusCode ? statusCode : routeStatusCode as string | undefined;

    return(
		<>
			<Card sx={{marginLeft: '10%', marginRight: '10%', marginTop: 15}}>
				<CardHeader title='Server Error' titleTypographyProps={{ variant: 'h2'}} />
				<CardContent sx={{marginBottom: 3}}>
					<Typography variant="h5" sx={{ color: 'red'}}>
						Error {errCode} - {errMessage}
					</Typography>
				</CardContent> 

				{errDetails &&
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
