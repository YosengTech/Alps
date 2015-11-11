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
    }
}
