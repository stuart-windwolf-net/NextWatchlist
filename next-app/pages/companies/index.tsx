import React from "react";
import { Box, Paper, Stack } from "@mui/material";
//import { observer } from "mobx-react-lite";
import EmptyWatchList from "../../components/EmptyWatchList";
//import LoadingComponent from "../../components/LoadingComponent";
import CompanyHeaderList from "../../components/CompanyHeaderList";

import { GetStaticProps } from "next/types";
import CompanySearchInputMui from "../../components/CompanySearchInputMui";
//import agent from "../api/agent";
import { CompanyHeader } from "../../models/companyHeader";
import { listCompanies } from "../../lib/api/CompanyApi";
import ServerError from "../server-error";


export interface CompanyHeaderProps {
    headers: CompanyHeader[]
}

export interface StaticProps {
    companyHeaders: Array<CompanyHeader>;
    isError: boolean;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    console.log("getStaticProps - CompanyHeaderDashboard with URL of: ", ctx.params);

    // Get an array of CompanyHeaders from the Axios Agent
    let isError: boolean = false;
    let companyHeaders: Array<CompanyHeader> | null = null;
 
    try {
        companyHeaders = await listCompanies();
        console.log("companyHeaders = await agent.CompanyHeaders.list() - ", Array.isArray(companyHeaders));
 
    } catch (error) {
        console.log(error);
        isError = true;
    }

    return {        
        props: { companyHeaders, isError },  
    }
};


export default function CompanyHeaderDashboard(
    { companyHeaders}:any, 
    { isError}: any 
) {    
    console.log ("CompanyHeaderDashboard: Array.isArray(companyHeaders) Index.tsx: ", Array.isArray(companyHeaders));
 
    const headers: Array<CompanyHeader> = companyHeaders;
    console.log ("CompanyHeaderDashboard: Array.isArray(headers) Index.tsx: ", Array.isArray(headers));

    if (isError)
        return <ServerError />;
    if (headers === null || headers?.length === 0) {
        return  <EmptyWatchList headers={headers}/>;
    } else {
        // const props:CompanyHeaderProps = {
        //     headers: headers 
        // };

        // console.log("Index.tsx props: ", headers);
      
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
