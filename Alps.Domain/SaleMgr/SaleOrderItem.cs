using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.ProductMgr;
using Alps.Domain.Common;
namespace Alps.Domain.SaleMgr
{
    public class SaleOrderItem:EntityBase 
    {
        public Material Material { get; set; }
        public decimal Quantity { get; set; }
        public Unit Unit { get; set; }
        public string Remark { get; set; }
    }
}
