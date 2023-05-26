import { Box, Stack, Typography } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import React from "react";
import CompanySearchInputMui from "./CompanySearchInputMui";
//import { CompanyHeader } from "../models/companyHeader";
import { CompanyHeaderProps } from "../pages/companies";

export default function EmptyWatchList ({headers}:CompanyHeaderProps): JSX.Element {
    return (
        <>
            <Stack>
                <Box style={{
                    width: '100%',
                    position: 'fixed',
                    marginBottom: 20,
                    marginTop: 55,
                    backgroundColor: 'white',
                    zIndex: 1700,
                    border: 0,
                    boxShadow: "none"
                }}>
                    <CompanySearchInputMui headers={headers} />
                </Box>

                <Box sx={{display: "block", marginTop: 30, marginLeft: "10%", height:"250px", width: "80%", backgroundColor:"white"}}>
                    <SearchRoundedIcon sx={{ fontSize:'80px', marginTop: 5, marginLeft: "45%"}} />

                    <Typography variant="h5" sx={{marginTop: 5, textAlign: "center"}}>
                            Your Watch List is currently empty, please enter an ASX Symbol to add new companies.
                    </Typography>
                </Box>
            </Stack>
        </>
    )
}