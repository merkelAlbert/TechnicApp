using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Technic.DAL.Models;

namespace Technic.QueryFilters
{
    public class MachinesQueryFilter
    {
        public bool IsPrivateOffice { get; set; }
        public Guid? MachineTypeId { get; set; }
        public decimal? FromPrice { get; set; }
        public decimal? ToPrice { get; set; }

        public Dictionary<Guid, int> FromNumberSpecifications { get; set; } = new Dictionary<Guid, int>();
        public Dictionary<Guid, int> ToNumberSpecifications { get; set; } = new Dictionary<Guid, int>();
        public Dictionary<Guid, string> StringSpecifications { get; set; } = new Dictionary<Guid, string>();
    }
}