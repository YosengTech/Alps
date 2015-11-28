using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.ProductMgr
{
    public class DeliveryVoucherItem:EntityBase
    {
        public virtual Material Material { get; set; }
        public Guid MaterialID { get; set; }
        public decimal Count { get; set; }
        public decimal Quantity { get; set; }
        public string ProductNumber { get; set; }
        public Position Position { get; set; }
        public Guid PositionID { get; set; }
    }
}
