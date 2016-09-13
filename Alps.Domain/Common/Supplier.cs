using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.Common
{
    public class Supplier:EntityBase 
    {
        public string Name { get; set; }
        public static Supplier Create(string name)
        {
            return new Supplier() { Name = name };
        }
    }
}
