using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.Common;
using Alps.Domain.ProductMgr;
namespace Alps.Domain.SaleMgr
{
    public class Goods:EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal StockQuantity{get;set;}
        public Unit Unit{get;set;}
        public decimal Price{get;set;}
        public Guid MaterialID{get;set;}
        public bool IsFutures { get; set; }
        public DateTime? DateOfDelivery { get; set; }
    }
}
