using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistance
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.CompanyHeaders.Any())   return;

            var companyHeaders = new List<CompanyHeader>()
            {
                new CompanyHeader()
                {
                    DisplayName = "COMPUTERSHARE LIMITED.",
                    Symbol = "CPU",
                    DateListed = DateTime.Parse("1994-05-27"),
                    Sector = "Information Technology"
                },
                new CompanyHeader()
                {
                    DisplayName = "AUSTRALIA AND NEW ZEALAND BANKING GROUP LIMITED",
                    Symbol = "ANZ",
                    DateListed = DateTime.Parse("1969-09-30"),
                    Sector = "Financials"
                },
                new CompanyHeader()
                {
                    DisplayName = "WESFARMERS LIMITED",
                    Symbol = "WES",
                    DateListed = DateTime.Parse("1984-11-15"),
                    Sector = "Consumer Discretionary"
                },
                new CompanyHeader()
                {
                    DisplayName = "BHP GROUP LIMITED",
                    Symbol = "BHP",
                    DateListed = DateTime.Parse("1885-08-13"),
                    Sector = "Materials"
                }
            };

            await context.CompanyHeaders.AddRangeAsync(companyHeaders);
            await context.SaveChangesAsync();
        }
    }
}