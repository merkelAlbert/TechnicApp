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

        public Dictionary<Guid, string> Specifications { get; set; } = new Dictionary<Guid, string>();
    }
}