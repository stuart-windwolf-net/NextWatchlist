using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistance;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.CompanyHeaders;
using Newtonsoft.Json;
using AutoMapper;
using Application.Core;
using System.Net;

namespace API.Controllers
{
    public class CompaniesController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public CompaniesController(DataContext context, IMediator mediator, IMapper mapper)
        {
            _mapper = mapper;
            _mediator = mediator;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<CompanyHeader>>> GetCompanies()
        {
            return HandleResult(await _mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyHeader>> GetCompanies(int id)
        {
            return  HandleResult(await _mediator.Send(new Detail.Query{Id = id}));
        }

        [HttpPost]
        public async Task<ActionResult> CreateCompany(string symbol)
        {
            symbol = symbol.ToUpper();
            using var client = new HttpClient();

            var response = await client.GetAsync($"https://asx.api.markitdigital.com/asx-research/1.0/companies/{symbol}/header");
            if (response.StatusCode != HttpStatusCode.OK)
            {
                return StatusCode((int)response.StatusCode, $"Could not find ASX Code {symbol}");
            }

            var asxHeader = response.Content.ReadAsStringAsync().Result;
            
            //Company? company = null;
            CompanyHeader? companyHeader = null;

             // Create our new CompanyHeader out of the returned JSon string 
            if (asxHeader != null) 
            {
                Company company = JsonConvert.DeserializeObject<Company>(asxHeader);
                CompanyHeader header = _mapper.Map<CompanyHeader>(company?.Data);

                companyHeader = _mediator.Send(new Find.Query{Symbol = symbol}).Result.Value;
                if (companyHeader == null)
                {
                    Result<CompanyHeader> result = await _mediator.Send(new Create.Command{CompanyHeader = header});
                    if (result.IsSuccess)
                    {
                        return StatusCode(201, result.Value);
                    }
                    else
                    {
                        return HandleResult(result);
                    }
                }
                else
                {
                    return StatusCode(409, "Duplicate record found, new record was not created");                             
                }                                
             }
            else
            {
                return NotFound($"Company with '{symbol}' not found in ASX");
            }
         }


        // [HttpPut("{id}")]
        // public async Task<IActionResult> EditCompanyHeader(int id, CompanyHeader companyHeader)
        // {
        //     companyHeader.Id = id;
        //     return Ok(await _mediator.Send(new Edit.Command{CompanyHeader = companyHeader}));
        // }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompanies(int id)
        {
            return Ok(await _mediator.Send(new Delete.Command{Id = id}));
        }    
    }
}