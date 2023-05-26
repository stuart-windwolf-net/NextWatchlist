import { Button, Card, CardContent, CardHeader} from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeIcon from '@mui/icons-material/Home';
import Link from "next/link";

export default function NotFound (): JSX.Element {
    return (
		<Card sx={{ width: '80%', marginTop: 17, marginLeft:'10%', marginRight:'10%'}}>
			<CardHeader 
				avatar={ <SearchRoundedIcon sx={{ fontSize:'80px' }} /> }
				title="Oops - We've looked everywhere and could not find this"
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
