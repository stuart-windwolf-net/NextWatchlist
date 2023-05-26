import agent, {revalidate} from "../../pages/api/agent";
import { CompanyHeader } from "../../models/companyHeader";
import { Company } from "../../models/company";

export const listCompanies = async ():Promise<CompanyHeader[]> => {
    return await agent.CompanyHeaders.list();
}

export const createCompany = async (header:CompanyHeader):Promise<boolean> => {
    let createdHeader:boolean = false;
    let success:boolean = false

    await agent.CompanyHeaders.create(header).then((resp) => {
        console.log("createCompany Creating new header for: ", header.symbol);
        const head:CompanyHeader = resp.data;

        if (head !== undefined && head !== null) {
            if (head.symbol.toUpperCase() === header.symbol.toUpperCase()) {
                createdHeader = true;
                console.log("createCompany created new header for: ", head.symbol);
            }
        } else {
            console.log("createCompany did NOT create new header: ", header.symbol);
        }
    });

    if (createdHeader) {
        const resp:Response = await revalidate('/companies');

        if (resp.status !== 200) {
            console.log('Failed to revalidate: ', resp);
        } else {
            console.log('Revalidated Successfully');
            success = true;
        }		
    }

    return success;
}

export const deleteCompany = async (id:number):Promise<boolean> => {
    let deletedHeader:boolean = false;
    let success:boolean = false

        try {
            await agent.CompanyHeaders.delete(id);

            deletedHeader = true;
        } catch (error) {
            console.log("deleteCompany - ", error);
        }

        if (deletedHeader) {
        const resp:Response = await revalidate('/companies');

        if (resp.status !== 200) {
            console.log('Failed to revalidate: ', resp);
        } else {
            console.log('Revalidated Successfully');

            success = true;
        }		
    }

    return success;
}

export const getCompany = async (code: string):Promise<Company> => {
    return await agent.CompanyHeaders.getCompany(code);
}