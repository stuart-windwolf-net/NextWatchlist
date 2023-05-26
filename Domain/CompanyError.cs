using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class CompanyError
    {
        public CoyError Error { get; set; }
    }

    public class CoyErrorItem
    {
        public string Message { get; set; }
    }

    public class CoyError
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public CoyErrorItem[] Errors { get; set; }
    }

}


//  "{
//      \"error\":
//     {
//         \"code\":400,
//         \"message\":\"Bad Request: Symbol not found\",
//         \"errors\":
//         [
//             {\"message\":\"Bad Request: Symbol not found\"}
//         ]
//     }
// }"