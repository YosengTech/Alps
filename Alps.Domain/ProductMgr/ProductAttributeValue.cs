using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.ProductMgr
{
    public class ProductAttributeValue:EntityBase
    {
        public Guid ProductAttributeID { get; set; }
        public Guid CatagoryID { get; set; }
        public string Name { get; set; }
    }
}
