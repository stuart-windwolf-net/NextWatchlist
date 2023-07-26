import React from "react";
import { Box, Paper, Stack } from "@mui/material";
import EmptyWatchList from "../../components/EmptyWatchList";
import CompanyHeaderList from "../../components/CompanyHeaderList";

import { GetStaticProps } from "next/types";
import CompanySearchInputMui from "../../components/CompanySearchInputMui";
import { CompanyHeader } from "../../models/companyHeader";
import { listCompanies } from "../../lib/api/CompanyApi";
import Server_Error from "../server-error";


export interface CompanyHeaderProps {
    headers: CompanyHeader[]
}

export interface CompanyHeaderDashboardProps {
    headers: Array<CompanyHeader> | null;
    isError: boolean;
}

export const getStaticProps: GetStaticProps = async () => {
     // Get an array of CompanyHeaders from the Axios Agent
    let isError: boolean = false;
    let headers: Array<CompanyHeader> | null = null;


    try {
        headers = await listCompanies();
    } catch (error) {
        console.log(error);
        isError = true;
    }

    const props: CompanyHeaderDashboardProps = { headers: headers, isError: isError }

    return {        
        props  
    }
};


export default function CompanyHeaderDashboard(
    props: CompanyHeaderDashboardProps
) {    
    const { headers, isError } = props;

    if (isError === true)
        return <Server_Error error={{message:`Error loading Company Headers`, statusCode: '500', details: undefined}} />;
    if (headers === null || headers?.length === 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return  <EmptyWatchList headers={headers!}/>;
    } else {
        return (
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

                <Paper style={{
                    marginTop: 200,
                    border: 0,
                    boxShadow: "none",
                    marginLeft: '10%',
                    width: '80%',
                    marginBottom: 5,
                    backgroundColor: 'white'
                }}>
                    <CompanyHeaderList headers={headers}  />
                </Paper>
            </Stack>
        )
    }
}
