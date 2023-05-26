import { Card, CardHeader, CardContent, Typography } from "@mui/material";
//import { useRouter } from "next/router";

export default function ServerError() {
	//const router = useRouter();	

    return(
		<>
			<Card sx={{marginLeft: '10%', marginRight: '10%', marginTop: 15}}>
				<CardHeader title='Server Error' titleTypographyProps={{ variant: 'h2'}} />
				<CardContent sx={{marginBottom: 3}}>
					<Typography variant="h5" sx={{ color: 'red'}}>
						TEST
						{/* {commonStore?.error?.message}  */}
					</Typography>
				</CardContent> 

				{/* { commonStore?.error?.details &&   */}
				{false &&
					<>
						<CardHeader title='Stack trace' titleTypographyProps={{ variant: 'h4', color: 'teal', marginTop: 3}} />
						<CardContent>
							<Typography>
								TEST DETAILS
								{/* <pre>{commonStore.error.details}</pre> */}
							</Typography>
						</CardContent>
					</>
				}
			</Card>
		</>
    )
}
