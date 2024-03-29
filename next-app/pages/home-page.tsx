import {  Box, Container, Typography } from "@mui/material";
import marketImage from "../public/Logo.jpg"
import { imageLoader } from "../imageLoader";
import Head from "next/head";
import Image from "next/image";

export default function HomePage() {
    return (
		<>
			<Head>
				<title>Home - Company Watchlist</title>
			</Head>
			<Box sx={{  
					backgroundImage:'linear-gradient(135deg, rgb(24, 42, 115) 0%, rgb(33, 138, 174) 69%, rgb(32, 167, 172) 89%)',
					height: '100vh',
				}}
			> 
				<Container sx={{ display: 'inline-block', marginTop: 25, marginLeft: 10 }} >
					<Box sx={{ width:"150px"}}>
						<Image	
							priority={true}					
							loader={imageLoader}
							unoptimized
							src={marketImage}
							alt={'Market logo'}
							width="100"
							height="100"
						/>	
					</Box>

					<Typography variant='h2' sx={{  marginTop: 3, marginLeft: 0, paddingLeft:0, color:'white', display: 'inline-flex' }}>
						Company Watch List
					</Typography>
				</Container>
			</Box>
		 </>
    )
}