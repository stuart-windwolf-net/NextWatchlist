
import { render, screen } from "@testing-library/react";
import React from 'react';

// eslint-disable-next-line jest/no-mocks-import
import { fakeArrayOf0 } from "../__mocks__/fakeData/CompanyHeaders";
import EmptyWatchList from "./EmptyWatchList";
import { CompanyHeader } from "../models/companyHeader";

describe('EmptyWatchList', () => {
    it('renders "EmptyWatchList"', () => {
        const headers:Array<CompanyHeader> = fakeArrayOf0;

        render(<EmptyWatchList headers={headers} />);

        const myElement:HTMLElement = screen.getByText(/Your Watch List is currently empty, please enter an ASX Symbol to add new companies./i);
        expect(myElement).toBeInTheDocument();
    })
})