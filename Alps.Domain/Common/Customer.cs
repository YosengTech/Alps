using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.Common
{
    public class Customer : EntityBase
    {
        public string Name { get; set; }
        public static Customer Create(string name)
        {
            var c = new Customer() { Name = name };
            return c;
        }
    }

}
