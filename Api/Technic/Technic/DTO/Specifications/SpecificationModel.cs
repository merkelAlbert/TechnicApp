using System;

namespace Technic.DTO.Specifications
{
    public class SpecificationModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string Measure { get; set; }
    }
}