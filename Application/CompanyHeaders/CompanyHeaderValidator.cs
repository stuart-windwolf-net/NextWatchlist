using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.CompanyHeaders
{
    public class CompanyHeaderValidator : AbstractValidator<CompanyHeader>
    {
        public CompanyHeaderValidator()
        {
            RuleFor(x => x.Id).NotNull().GreaterThan(0);           
            RuleFor(x => x.Symbol).NotEmpty();           
            RuleFor(x => x.DisplayName).NotEmpty();       
            RuleFor(x => x.Sector).Length(1, 100).When(x => !string.IsNullOrEmpty(x.Sector));
            RuleFor(x => x.DateListed)
                .Must(DateListed => DateListed < DateTime.Today)
                .When(x => x.DateListed != null)
                .WithMessage("Invalid date/time");
         }

        // Well only keep this for reference for new Validators in Fluent 11 onwards
        private bool BeLessThanToday(string dateListed)
        {
            DateTime dateListedDate;                
            if (!string.IsNullOrEmpty(dateListed))
            {
                if (DateTime.TryParse(dateListed, out dateListedDate))
                {
                    if (dateListedDate.Date < DateTime.Today.Date) 
                        return true;
                }
            }
            return false;
        }
    }
}