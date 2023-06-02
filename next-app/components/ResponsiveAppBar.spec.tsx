import { render, screen } from "@testing-library/react";
//import user from '@testing-library/user-event';
import React from 'react';
import DrawerAppBar from "./ResponsiveAppBar";

const navItems = [{ text: 'Home', href: '/' }, { text: 'Saved Companies', href: '/companies' }];

describe('DrawerAppBar', () => {
    it('DrawerAppBar shows with "Saved Companies" Menu Item', async () => {
        render(<DrawerAppBar navItems={navItems} />);

        const myElement:HTMLElement = screen.getByRole('heading', { name: /Saved Companies/});
        expect(myElement).toBeInTheDocument();
      });
})

