using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.PurchaseMgr;
namespace Alps.Domain.Service
{
    public class PurchaseMgrService
    {
        private readonly AlpsContext db=null;
        public PurchaseMgrService(AlpsContext db)
        {
            this.db = db;
        }
        public void CreatePurchaseVoucher(Guid supplierID,string creater)
        {
            PurchaseOrder order = PurchaseOrder.Create(supplierID, creater);
            db.PurchaseOrders.Add(order);
        }
        public void UpdatePurchaseVoucher(PurchaseOrder order)
        {
            var existingOrder = db.PurchaseOrders.Find(order.ID);
            if (existingOrder != null)
            {
                db.Entry(existingOrder).CurrentValues.SetValues(order);
                PurchaseOrderItem updatedItem = null;
                foreach (PurchaseOrderItem item in existingOrder.Items.ToList())
                {
                    updatedItem = order.Items.FirstOrDefault(p => p.ID == item.ID);
                    if (updatedItem == null)
                    {
                        existingOrder.Items.Remove(item);
                        //db.WarehouseVoucherItems.Remove(item);
                    }
                    else
                    {
                        db.Entry(item).CurrentValues.SetValues(updatedItem);
                        order.Items.Remove(updatedItem);
                    }
                }
                foreach (PurchaseOrderItem item in order.Items)
                {
                    item.PurchaseOrderID = existingOrder.ID;
                    existingOrder.Items.Add(item);

                }
            }
            
        }


    }
}
