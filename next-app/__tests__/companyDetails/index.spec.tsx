import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Company } from '../../models/company';

// eslint-disable-next-line jest/no-mocks-import
import { badCompany, fakeCompany } from '../../__mocks__/fakeData/Company';
import CompanyDetails from '../../pages/companyDetails';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
//import { useRouter } from 'next/router';

// Base URL http://localhost:5000/api
// list:       '/companies'),
// create:     post<CompanyHeader>(`/companies/?symbol=${companyHeader.symbol}`, companyHeader),
// update:     put<void>(`/companies/${companyHeader.id}`, companyHeader),
// delete:     delete<void>(`/companies/${id}`),
// getCompany  getCompany<Company>(`/companyDetails/${code}`),

const server = setupServer();

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockImplementation(() => ({
        asPath: "/",
        query: { symbol: 'CPU' },
        prefetch: () => Promise.resolve(true)
    })),
}));    

beforeAll(() => {server.listen()});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('CompanyDetails', () => {
    beforeEach(() => {
        server.use(
            rest.get<Company> ("http://localhost:5000/api/companyDetails/CPU", (req, res, ctx) => {
                return res(  
                    ctx.delay(1000),      
                    ctx.json(     
                        fakeCompany     
                    )   
                );
            })
        )
    });

    it('initially displays "loading"', () => {
        // Arrange
        render(<CompanyDetails />);

        // Act
        const element = screen.getByText(/loading/i);

        // Assert
        expect(element).toBeInTheDocument();

    });

    it('displays "CompanyDetails"', async () => {
        
        // Arrange
        render(<CompanyDetails />);

        // wait for the loading spinner to go away
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i), {timeout:5000});

        // Act
        const element = await screen.findByText(/COMPUTERSHARE LIMITED./i);

        // Assert
        expect(element).toBeInTheDocument();
    }, 10000);
})

// eslint-disable-next-line jest/no-disabled-tests
describe('no data leads to 404 page displaying message', () => {
    beforeEach( async () => {
        server.use(
            rest.get<Company> ("http://localhost:5000/api/companyDetails/CPU", (req, res, ctx) => {
                return res(  
                    ctx.delay(100), 
                    ctx.status(404),
                    ctx.json(     
                        'No Data Found for CPU'
                    )   
                );
            })
        )
    })
        
    // eslint-disable-next-line jest/no-disabled-tests
    it('displays error message', async () => {
           
        // Arrange
        render(<CompanyDetails />);

        //await waitForElementToBeRemoved(screen.queryByText(/loading/i), { timeout:5000 });
   
        // Act
        const element = await screen.findByText(/No Data Found for CPU/i, undefined, { timeout:5000 });

        // Assert
        expect(element).toBeInTheDocument();
    }, 10000);        
})
