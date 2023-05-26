using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;

namespace Application.CompanyHeaders
{
    public class Create
    {
        public class Command : IRequest<Result<CompanyHeader>>
        {
            public CompanyHeader CompanyHeader { get; set; }            
        }

        public class Handler : IRequestHandler<Command, Result<CompanyHeader>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.CompanyHeader).SetValidator(new CompanyHeaderValidator());
                }

            }

            public async Task<Result<CompanyHeader>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.CompanyHeaders.Add(request.CompanyHeader);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<CompanyHeader>.Failure("Failed to create Company Header");

                return Result<CompanyHeader>.Success(request.CompanyHeader);                
            }
        }        
    }
}