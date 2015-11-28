using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.ProductMgr;
using Alps.Domain.Common;
namespace Alps.Domain.Service
{
    public class ProductMgrService
    {
        private AlpsContext db = null;
        public ProductMgrService(AlpsContext db)
        {
            this.db = db;
        }
        public void SubmitVoucher(WarehouseVoucher voucher,string submitter)
        {
            voucher.Submit(submitter);
            StockService stockService = new StockService(db);
            stockService.UpdateStock(voucher);
        }

        public void UpdateWarehouseVoucher(Guid id, WarehouseVoucher warehouseVoucher)
        {
            var exitingWarehouseVoucher = db.WarehouseVouchers.Find(id);
            db.Entry(exitingWarehouseVoucher).CurrentValues.SetValues(warehouseVoucher);
            WarehouseVoucherItem updatedItem = null;
            foreach (WarehouseVoucherItem item in exitingWarehouseVoucher.Items.ToList())
            {
                updatedItem = warehouseVoucher.Items.FirstOrDefault(p => p.ID == item.ID);
                if (updatedItem == null)
                {
                    exitingWarehouseVoucher.Items.Remove(item);
                }
                else
                {
                    db.Entry(item).CurrentValues.SetValues(updatedItem);
                }
            }
            foreach (WarehouseVoucherItem item in warehouseVoucher.Items)
            {
                item.WarehouseVoucherID = exitingWarehouseVoucher.ID;
                exitingWarehouseVoucher.Items.Add(item);

            }
        }
    }
}
