using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.ProductMgr
{
    public class Position:EntityBase 
    {
        public string Number { get; set; }
        public string Name { get; set; }
        public string Warehouse { get; set; }
    }
}
