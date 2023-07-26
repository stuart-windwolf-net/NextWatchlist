/// <reference types="jest"/>

import CompanyHeaderDashboard from '../../pages/companies';
// eslint-disable-next-line jest/no-mocks-import
import { fakeArrayOf1 } from '../../__mocks__/fakeData/CompanyHeaders';
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockImplementationOnce( () => {
        return { query: '' }        
    })
}))

describe('CompanyHeaderDashboard', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    it('displays "Error loading Company Headers" when isError is true', () => {
        render(<CompanyHeaderDashboard headers={null} isError={true} />);

        // Act
        const errMessage = screen.getByText(/Error loading Company Headers/);
        const errCode = screen.getByText(/500/);
 
        // Assert
        expect(errMessage).toBeInTheDocument();
        expect(errCode).toBeInTheDocument();
     });

    it('displays EmptyWatchList when no data is present', () => {
        render(<CompanyHeaderDashboard headers={null} isError={false} />);

        // Act
        const errMessage = screen.getByText(/Your Watch List is currently empty, please enter an ASX Symbol to add new companies./);
 
        // Assert
        expect(errMessage).toBeInTheDocument();
     });
     
    // eslint-disable-next-line jest/no-disabled-tests
    it('displays CompanyHeaderList when valid headers are given', async () => {
        // Arrange
        render(<CompanyHeaderDashboard headers={fakeArrayOf1} isError={false} />);

         // Act
        const symbol = screen.getByText(/CPU/);
        const company = screen.getByText(/Computershare/);
 
        // Assert
        expect(symbol).toBeInTheDocument();
        expect(company).toBeInTheDocument();
    });
})


