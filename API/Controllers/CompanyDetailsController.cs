using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistance;
using Domain;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net;

namespace API.Controllers
{
    public class CompanyDetails : BaseApiController
    {
        private readonly DataContext _context;

        public CompanyDetails(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{code}")]
        public async Task<ActionResult<Company>> GetCompanyDetails(string code)
        {            
            using var client = new HttpClient();

            var response = await client.GetAsync($"https://asx.api.markitdigital.com/asx-research/1.0/companies/{code}/header");
            var asxHeader = response.Content.ReadAsStringAsync().Result;
             
            if (!response.IsSuccessStatusCode)
            {
                CompanyError companyError = JsonConvert.DeserializeObject<CompanyError>(asxHeader);
                if (companyError.Error.Message == "Bad Request: Symbol not found")
                {
                    return NotFound($"ASX Symbol '{code}' not found");
                }

                return StatusCode((int)response.StatusCode, $"{companyError.Error.Message} for Symbol '{code}'");
            }

            if (asxHeader != null) 
            {
                Company company = JsonConvert.DeserializeObject<Company>(asxHeader);
                return Ok(company.Data);
            }
            else
            {
                return NotFound($"Company with '{code}' not found in ASX");
            }
         }
    }
}