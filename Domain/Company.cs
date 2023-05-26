using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Company
    {
        public Data Data {get; set;}
    }

    public class Data
    {
        public string DateListed {get; set;}

        public string DisplayName {get; set;}

        public double PriceAsk { get; set; }

        public double PriceBid { get; set; }

         public double PriceLast { get; set; }

        public string Sector {get; set;}

         public string Symbol { get; set; }
    }
}
// {
//     "data": {
//         "dateListed": "1885-08-13",
//         "displayName": "BHP GROUP LIMITED",
//         "priceAsk": 38.29,
//         "priceBid": 38.25,
//         "priceChange": 0.9200000000000017,
//         "priceChangePercent": 2.4631860776439134,
//         "priceLast": 38.27,
//         "sector": "Materials",
//         "industryGroup": "Materials",
//         "securityType": 1,
//         "symbol": "BHP",
//         "volume": 8163812,
//         "xid": "60947",
//         "marketCap": 189077771147,
//         "statusCode": ""
//     }
// }