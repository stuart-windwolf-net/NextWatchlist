import { fireEvent, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import CompanySearchInputMui from './CompanySearchInputMui';
import { CompanyHeader } from '../models/companyHeader';
import { ToastContainer } from 'react-toastify';


// eslint-disable-next-line jest/no-mocks-import
import { fakeArrayOf1, fakeArrayOf20 } from '../__mocks__/fakeData/CompanyHeaders';


describe('CompanySearchInputMui', () => {
    describe('CSMui rejects invalid ASX symbols', () => {
        beforeEach(() => {
            const headers:Array<CompanyHeader> = fakeArrayOf1;
            
            // Need to render ToastContainer first or won't be found in the document
            // eslint-disable-next-line testing-library/no-render-in-setup
            render(
                <div>
                    <ToastContainer />
                    <CompanySearchInputMui headers={headers} /> 
                </div>
            );
        });

        describe('CSMui Rejects character lengths < 1 or > 6', () => {
            it.each`
            symbol
            ${""}
            ${"ABCABCA"}
            `("Rejects '$symbol' for invalid character length: $symbol.length" , async ({symbol}) => {
                // Arrange
                const textInput = screen.getByPlaceholderText("ASX Symbol");
                const textSearch = screen.getByLabelText("search");

                // Act
                // Can't use UserEvent.type to alter the value property
                fireEvent.change(textInput, {target: {value: symbol}});
                await user.click(textSearch);

                // Assert
                expect(screen.getByText(/A symbol from 1 to 6 alphabetic characters is required/)).toBeInTheDocument();
            });
        });

        describe('CSMui Rejects non alphabetic characters', () => {
            it.each`
            code            | description
            ${"ABC1"}       | ${"numeric character"}
            ${"ABC*"}       | ${"control character"}
            ${"AB CD"}      | ${"space character"}
            `("Rejects '$code' for non alpha characters: $description" , async ({code}) => {
                // Arrange
                const textInput1 = screen.getByPlaceholderText("ASX Symbol");
                const textSearch = screen.getByLabelText("search");

                // eslint-disable-next-line testing-library/no-debugging-utils
                //screen.debug(textInput);

                // Act
                // Can't use UserEvent.type to alter the value property
                fireEvent.change(textInput1, {target: {value: code}});
                await user.click(textSearch);

                // Assert
                expect(screen.getByText(/A symbol may only contain alphabetic characters/)).toBeInTheDocument();
            });
        });

        it('rejects CPU when exists as a duplicate symbol', async () => {
            // Arrange
            const textInput1 = screen.getByPlaceholderText("ASX Symbol");
            const textSearch = screen.getByLabelText("search");

            // Act
            // Can't use UserEvent.type to alter the value property
            fireEvent.change(textInput1, {target: {value: 'CPU'}});
            await user.click(textSearch);

            // Assert
            expect(screen.getByText(/A duplicate entry for CPU, already exists!/)).toBeInTheDocument();
        });
    });
           
    it('rejects a symbol when 20 or more are already saved', async () => {
        // Arrange
        const headers:Array<CompanyHeader> = fakeArrayOf20;
        
        render(
            <div>
                <ToastContainer />
                <CompanySearchInputMui headers={headers} /> 
            </div>
        );

        const textInput1 = screen.getByPlaceholderText("ASX Symbol");
        const textSearch = screen.getByLabelText("search");

        // Act
        // Can't use UserEvent.type to alter the value property
        fireEvent.change(textInput1, {target: {value: 'XXX'}});
        await user.click(textSearch);

        // Assert
        expect(screen.getByText(/A maximum of 20 companies may be stored in the watch list/)).toBeInTheDocument();
    });        
})