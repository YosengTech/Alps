using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.DistributionMgr
{
    public class DistributionVoucher:EntityBase
    {
        public Guid OrderID { get; set; }
        public int Sequence { get; set; }

    }
}
