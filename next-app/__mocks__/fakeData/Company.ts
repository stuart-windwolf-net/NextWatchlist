import { Company } from "../../models/company";

export const fakeCompany:Company = { 
    displayName: "COMPUTERSHARE LIMITED.",
    symbol: "CPU",
    dateListed: "1994-05-27",
    sector: "Industrials",
    priceAsk: 22.7,
    priceBid: 22.150000000000002, 
    priceLast: 22.400000000000002
};

export const badCompany:Company = { 
    displayName: "BAD CO LIMITED.",
    symbol: "CPX",
    dateListed: "1991-05-27",
    sector: "None",
    priceAsk:12.7,
    priceBid: 12.150000000000002, 
    priceLast: 12.400000000000002
};

