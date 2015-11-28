using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.Common;
namespace Alps.Domain.DistributionMgr
{
    public class DistributionItem : EntityBase
    {
        public Guid GoodID { get; set; }
        public Quantity Quantity { get; set; }
    }
}
