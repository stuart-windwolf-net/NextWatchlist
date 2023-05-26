using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class CompanyHeader
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        public string DisplayName { get; set; }
        
        public string Symbol { get; set; }

        public DateTime? DateListed {get; set;}

        public string? Sector { get; set; }
    }
}