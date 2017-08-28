using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain;
using Alps.Domain.PurchaseMgr;
using Alps.Domain.ProductMgr;
namespace Alps.Service.PurchaseMgr
{
    public class PurchaseMgrAppService
    {
        public readonly AlpsContext db = null;
        public PurchaseMgrAppService(AlpsContext db)
        {
            this.db = db;
        }
        public IQueryable<PurchaseOrder> GetAllPurchaseOrders()
        {
            return db.PurchaseOrders;
        }
        public PurchaseOrder GetPurchaseOrder(Guid id)
        {
            return db.PurchaseOrders.Find(id);
        }
        public PurchaseOrder CreaterPurchaseOrder(PurchaseOrder purchaseOrder)
        {
            PurchaseOrder newPurchaseOrder = PurchaseOrder.Create(purchaseOrder.SupplierID, purchaseOrder.Creater);
            newPurchaseOrder.UpdateItem(purchaseOrder.Items);
            db.PurchaseOrders.Add(newPurchaseOrder);
            return purchaseOrder;
        }
        public void UpdatePurchaseOrder(Guid id,PurchaseOrder purchaseOrder)
        {
            PurchaseOrder existingPurchaseOrder = db.PurchaseOrders.Find(id);
            db.Entry(existingPurchaseOrder).CurrentValues.SetValues(purchaseOrder);
            //Dictionary<PurchaseOrderItem, PricingMethod> pList = from p in db.Products
            //                                                     from i in purchaseOrder.Items
            //                                                     where p.ID == i.ProductID
            //                                                     select new { i, p.PricingMethod };
            foreach(PurchaseOrderItem item in purchaseOrder.Items)
            {
                var p=db.ProductSkus.Find(item.ProductSkuInfo.SkuID);
                if(p!=null)
                {
                    item.ProductSkuInfo = p.GetProductSkuInfo();
                }

            }
            existingPurchaseOrder.UpdateItem(purchaseOrder.Items);
        }
        public void ConfirmPurchaseOrder(Guid id)
        {
            PurchaseOrder purchaseOrder = db.PurchaseOrders.Find(id);
            purchaseOrder.Confirm();
        }
    }
}
