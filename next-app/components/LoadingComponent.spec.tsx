
import { render, screen } from "@testing-library/react";
import LoadingComponent from "./LoadingComponent";
import { LoadingComponentProps } from "./LoadingComponent";
import React from 'react';

const props:LoadingComponentProps = { message: "Loading"} 
describe('LoadingComponent', () => {
    it('renders "LoadingComponent"', () => {
        render(<LoadingComponent message={props.message} />);

        const myElement:HTMLElement = screen.getByText(/loading/i);
        expect(myElement).toBeInTheDocument();
    })
})