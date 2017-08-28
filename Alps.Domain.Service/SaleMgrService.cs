using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.Service
{
    public class SaleMgrService
    {
        private AlpsContext db = null;
        public SaleMgrService(AlpsContext db)
        {
            this.db = db;
        }
        public void SubmintSaleOrder(Guid id)
        {
            var saleOrder= db.SaleOrders.Find(id);
            saleOrder.Confirm();
            
        }


    }
}
