import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { Company } from '../../models/company';
import { CompanyHeader } from '../../models/companyHeader';

import Router from 'next/router';

// const sleep = (delay: number) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     })
// }

//const router = useRouter();

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
        //await sleep(1500);
        return response;
}, (error: AxiosError) => {
    if (error?.response === null || error?.response === undefined) return;

    const {data, status, config} = error.response as any;
    switch (status) {
        case 400: 
         
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
            Router.push('/404');
        }

        if (data.errors) {
            const modalStateErrors = [];

            for (const key in data.errors) {
                if (data.errors[key]) {
                    modalStateErrors.push(data.errors[key])
                }
            }

            throw modalStateErrors.flat();
        } else {
            toast.error(data);
        }
        break;

        case 401: 
            toast.error('unauthorised');
            break;

        case 404: 
            console.log(`Error in agent - ${status}, ${data}`)
            //Router.push({ pathname: '/404', query: { message: data, statusCode: '404' } });

            //Router.push('/404');  
            break;

        case 409:
            toast.error(data);
            break;            

        case 500:             
            //router.push({pathname: "/losescreen", query: {somekey: "someValue" });
            console.log(`Error in agent - ${status}, ${data}`)
            //Router.push({ pathname: '/Server_Error', query: { message: data } });

            break;   
        default:
            console.log(`Error in agent - ${status}, ${data}`)
            //Router.push( { pathname: '/Server_Error', query: { message: data }});           

    }

    console.log ('In axios interceptor error: error.response.data: ', error.response.data);

    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string) => axios.post<T>(url).then(responseBody),
    put: <T> (url: string) => axios.put<T>(url).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
    getCompany: <T> (url: string) => axios.get<T>(url).then(responseBody)
}

const CompanyHeaders = {
    list: () => requests.get<CompanyHeader[]>('/companies'),
    details: (id: number) => requests.get<CompanyHeader>(`/companies/${id}`),
    create: (companyHeader: CompanyHeader) => axios.post<CompanyHeader>(`/companies/?symbol=${companyHeader.symbol}`, companyHeader),
    update: (companyHeader: CompanyHeader) => axios.put<void>(`/companies/${companyHeader.id}`, companyHeader),
    delete: (id: number) => axios.delete<void>(`/companies/${id}`),
    getCompany:(code:string) => requests.getCompany<Company>(`/companyDetails/${code}`),
}

const agent = {
    CompanyHeaders
}

export const revalidate = async function(path:string):Promise<Response> {
    let resp:Response = new Response();

    await fetch(`/api/revalidate?path=${path}`)
    .then( 
          res => {
            resp = res;
            console.log("Revalidated CompanyHeader Cache response: ", res);
           }
      )
    .then(
      (error) => {
        if (error !== undefined && error !== null) {
            resp.text = error;
            console.log("Failed to Revalidate CompanyHeader Cache response: ", error);
            toast.error(error);
        }
      }
    );

    return resp;
}

export default agent;