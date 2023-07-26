import  Server_Error  from '../pages/server-error';
import { render, screen } from '@testing-library/react';

const message = 'Error - Testing Error';
const statusCode = '500';
const detail1 = 'Detail 1';
const detail2 = 'Detail 2';

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockImplementationOnce( () => {
        return { query: '' }        
    }).mockImplementationOnce(() => {
        return { query: { routeStatusCode: statusCode, routeMessage :message, routeDetails: [detail1, detail2] } }        
    })
}))

describe('Server_Error', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    it('displays error text from input parameters', async () => {
        render(<Server_Error error={{ message: message, statusCode: statusCode, details: [detail1, detail2] }} />);

        // Act
        const errMessage = screen.getByText(/Error - Testing Error/);
        const errCode = screen.getByText(/500/);
        const errDetails1 = screen.getByText(/Detail 1/);
        const errDetails2 = screen.getByText(/Detail 1/);

        // Assert
        expect(errMessage).toBeInTheDocument();
        expect(errCode).toBeInTheDocument();
        expect(errDetails1).toBeInTheDocument();
        expect(errDetails2).toBeInTheDocument();
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it('displays Error text from routing', async () => {
        // Arrange
        // Doesn't seem to work when not in the highest scope.

        // jest.mock('next/router', () => ({
        //     useRouter: jest.fn().mockImplementation(() => ({
        //         asPath: "/Server_Error",
        //         query: { routeStatusCode: statusCode, routeMessage: message, routeDetails: [detail1, detail2] },
        //         prefetch: () => Promise.resolve(true)
        //     })),
        // }));        

        render(<Server_Error error={undefined}/>);

         // Act
         const errMessage = screen.getByText(/Error - Testing Error/);
         const errCode = screen.getByText(/500/);
         const errDetails1 = screen.getByText(/Detail 1/);
         const errDetails2 = screen.getByText(/Detail 1/);
 
        // Assert
        expect(errMessage).toBeInTheDocument();
        expect(errCode).toBeInTheDocument();
        expect(errDetails1).toBeInTheDocument();
        expect(errDetails2).toBeInTheDocument();
    });
})


