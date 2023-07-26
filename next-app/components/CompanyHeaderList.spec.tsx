import { render, screen } from "@testing-library/react";
import React from 'react';

// eslint-disable-next-line jest/no-mocks-import
import { fakeArrayOf3 } from "../__mocks__/fakeData/CompanyHeaders";
import CompanyHeaderList from "./CompanyHeaderList";
import { CompanyHeader } from "../models/companyHeader";


jest.mock('next/router', () => ({
    useRouter: jest.fn().mockImplementation(() => ({
        reload: () => Promise.resolve(true),
        asPath: "/",
        prefetch: () => Promise.resolve(true)
    })),
}));    

// eslint-disable-next-line jest/no-disabled-tests
describe('CompanyHeaderList', () => {
    describe('renders symbol and display name for each company in the list', () => {
        beforeEach(() => {
            const headers:Array<CompanyHeader> = fakeArrayOf3;
            
            // Need to render ToastContainer first or won't be found in the document
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(<CompanyHeaderList headers={headers} />);
        });

        describe('CompanyHeaderList', () => {
            it.each`
            symbol      |   displayName
            ${"CPU"}    |   ${"COMPUTERSHARE LIMITED"}
            ${"ASX"}    |   ${"ASX LIMITED"}
            `("renders '$symbol' and $displayName" , async ({symbol, displayName}) => {
                expect(await screen.findByText(symbol)).toBeInTheDocument();
                expect(await screen.findByText(displayName)).toBeInTheDocument();
            });
        });
    });
});
