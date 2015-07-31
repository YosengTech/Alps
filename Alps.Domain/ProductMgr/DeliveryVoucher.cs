using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.AccountingMgr;
namespace Alps.Domain.ProductMgr
{
    public class DeliveryVoucher:EntityBase
    {
        public string Creater { get; set; }
        public DateTime CreateTime { get; set; }
        public TradeAccount Source { get; set; }
        public TradeAccount Destination { get; set; }
        public ICollection<DeliveryVoucherItem> Items { get; set; }
        public DeliveryVoucherState State { get; set; }
    }
}
