import { Button, Card, CardContent, CardHeader} from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeIcon from '@mui/icons-material/Home';
import Link from "next/link";
import { useRouter } from "next/router";

export default function NotFound (): JSX.Element {
	const router = useRouter();	
	const { message } = router.query;
	const theMessage:string = message as string ? 
		`Error: ${message as string}` : 
		"Oops we've looked everywhere and can't find what you're looking for";

    return (
		<Card sx={{ width: '80%', marginTop: 17, marginLeft:'10%', marginRight:'10%'}}>
			<CardHeader 
				avatar={ <SearchRoundedIcon sx={{ fontSize:'80px' }} /> }
				title={theMessage}
				titleTypographyProps={{variant: 'h5', marginLeft: 3}}
				sx={{ marginTop:3, marginLeft: 3, marginRight: 3, fontSize:'80px'}}
			/>
			<CardContent sx={{textAlign:'center', marginBottom: 3}}>
				<Button startIcon={<HomeIcon />} 
						variant="contained" 
						component={Link}
						href="/"
						color="primary">
					Go to Home Page
				</Button>
			</CardContent>
		</Card>
    )
}
