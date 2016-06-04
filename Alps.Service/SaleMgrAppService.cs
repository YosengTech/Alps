using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain;
using Alps.Domain.SaleMgr;
namespace Alps.Service
{
    public class SaleMgrAppService
    {
        private AlpsContext db = null;
        public SaleMgrAppService(AlpsContext db)
        {
            this.db = db;
        }
        public SaleOrder UpdateSaleOrder(SaleOrder saleOrder)
        {
            if (saleOrder.ID==Guid.Empty)
            {
                saleOrder.OrderTime = DateTime.Now;
                db.SaleOrders.Add(saleOrder);
            }
            else
            {
                var existingSaleOrder = db.SaleOrders.Find(saleOrder.ID);
                
            }
            return saleOrder;
        }
    }
}
