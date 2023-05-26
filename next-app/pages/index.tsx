import * as React from 'react';
import type { NextPage } from 'next';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
import HomePage from './home-page';

const Home: NextPage = () => {
	console.log("In index (Home)")
  return (
	<>
		<HomePage />
	</>
  );
};

export default Home;