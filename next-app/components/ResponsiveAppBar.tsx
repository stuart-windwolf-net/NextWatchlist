import * as React from 'react';
import 	{ AppBar,  
		  Box, 
		  Drawer,		
		  IconButton ,
		  List,
		  ListItem,
		  ListItemButton,
		  Toolbar,
		  Button,
		  Typography
		  }
from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

// import CompanySearchInputMui from './CompanySearchInputMui';
import Link from 'next/dist/client/link';

const drawerWidth = 240;

export interface navProps {
	navItems:{text: string, href: string}[]
}

export default function DrawerAppBar(props: navProps) {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<Box aria-label='appDrawer' onClick={handleDrawerToggle} 
			sx={{ textAlign: 'center', backgroundColor:'blueviolet' }}>
			<List>
				{props.navItems.map((item) => (
					<ListItem key={item.text} disablePadding id={item.text}>
						<ListItemButton sx={{ textAlign: 'center' }}>
							<Link style={{ textDecoration: 'none', color: 'white' }}  href={item.href}>
								{item.text}
							</Link>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

		return (
		<Box sx={{ display: 'flex'}}>
			<AppBar component="nav">
				<Toolbar sx={{ 
					display: 'inline-flex',
					height: 5, 
					minWidth: 400,
					backgroundImage:'linear-gradient(135deg, rgb(24, 42, 115) 0%, rgb(33, 138, 174) 69%, rgb(32, 167, 172) 89%)'
					}} 
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 3, display: { sm: 'none' } }}					
					>
						<MenuIcon sx={{marginLeft:5}} />
					</IconButton>
					<Box sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
						{props.navItems.map((item) => (
							<Button key={item.text} sx={{ color: '#fff', mr: 3, ml: 3}}>
								<Link style={{ textDecoration: 'none', color: 'white' }} href={item.href}>
									<Typography variant='h6'>
										{item.text}
									</Typography>
								</Link>
							</Button>
						))}
					</Box>
					{/* <CompanySearchInputMui /> */}
				</Toolbar>
			</AppBar>

			<Box component="nav">
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none', zIndex:1800 },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
}
