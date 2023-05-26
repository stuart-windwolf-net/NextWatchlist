
import { render, screen } from "@testing-library/react";
import LoadingComponent from "./LoadingComponent";
import { Props } from "./LoadingComponent";
import React from 'react';

const props:Props = { message: "Loading"} 
it('renders "LoadingComponent"', () => {
    render(<LoadingComponent message={props.message} />);

    const myElement:HTMLElement = screen.getByText(/loading/i);
    expect(myElement).toBeInTheDocument();
})