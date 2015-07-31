using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.SaleMgr
{
    public class SaleOrder:EntityBase 
    {
        public Customer Customer { get; set; }
        public DateTime OrderTiem { get; set;}
        public virtual ICollection<SaleOrderItem> Items { get; set; }
    }
}
