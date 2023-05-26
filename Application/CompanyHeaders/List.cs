using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistance;

namespace Application.CompanyHeaders
{
    public class List
    {
        public class Query : IRequest<Result<List<CompanyHeader>>> {}

        public class Handler : IRequestHandler<Query, Result<List<CompanyHeader>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }

            public async Task<Result<List<CompanyHeader>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<CompanyHeader>>.Success(await _context.CompanyHeaders.ToListAsync(cancellationToken));
            }
        }
    }        
}
