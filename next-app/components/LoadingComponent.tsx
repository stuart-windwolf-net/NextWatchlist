import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface LoadingComponentProps {
	message: string;
}

export default function LoadingComponent({ message = 'Loading...'}: LoadingComponentProps) {
	return (
	  <Box sx={{ display: 'flex', marginTop: 15, marginLeft: 20 }}>
		<CircularProgress />
		<Typography variant='h5' sx={{marginTop: 20}}>{message}</Typography>
	  </Box>
	);
}
