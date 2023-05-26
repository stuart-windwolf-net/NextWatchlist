using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;
using Application.Core;

namespace Application.CompanyHeaders
{
    public class Find
    {
        public class  Query: IRequest<Result<CompanyHeader>>
        {        
            public string Symbol { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CompanyHeader>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<CompanyHeader>> Handle(Query request, CancellationToken cancellationToken)
            {
                var companyHeader = _context.CompanyHeaders.Where(h => h.Symbol == request.Symbol).FirstOrDefault();

                return Result<CompanyHeader>.Success(companyHeader); 
             }
        }        
    }
}