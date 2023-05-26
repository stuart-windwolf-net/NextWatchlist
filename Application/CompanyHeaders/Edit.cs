using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using FluentValidation;
using Domain;
using MediatR;
using Persistance;

namespace Application.CompanyHeaders
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CompanyHeader CompanyHeader { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.CompanyHeader).SetValidator(new CompanyHeaderValidator());
            }

        }        

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var companyHeader = await _context.CompanyHeaders.FindAsync(request.CompanyHeader.Id);

                if (companyHeader == null) return null;

                _mapper.Map(request.CompanyHeader, companyHeader);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the Company Header");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }        
    }
}