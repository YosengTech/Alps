using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.ProductMgr;
namespace Alps.Domain.Service
{
    public class StockService
    {
        private AlpsContext db;
        public StockService(AlpsContext db)
        {
            this.db = db;
        }
        public void UpdateStock(WarehouseVoucher voucher)
        {
            if (voucher.State == WarehouseVoucherState.Confirmed)
            {
                var source = db.TradeAccounts.Find(voucher.SourceID);
                var destination = db.TradeAccounts.Find(voucher.DestinationID);
                if (source.InventoryManagement)
                {
                    foreach (WarehouseVoucherItem item in voucher.Items)
                    {
                        StockOut(voucher.SourceID, item.MaterialID, item.Count, item.Quantity, item.PositionID, item.ProductNumber);
                    }
                }
                if (destination.InventoryManagement)
                {
                    foreach (WarehouseVoucherItem item in voucher.Items)
                    {
                        StockIn(voucher.DestinationID, item.MaterialID, item.Count, item.Quantity, item.PositionID, item.ProductNumber);
                    }
                }
            }
            else
                throw new DomainException("入库单未提交");
        }
        public void StockIn(Guid ownerID, Guid materialID, decimal count, decimal quantity, Guid positionID, string productNumber = "")
        {
            Product existCommodity =null;
            if (productNumber == string.Empty)
                existCommodity = db.Products.FirstOrDefault(p => p.OwnerID == ownerID && p.MaterialID == materialID && p.PositionID == positionID);
            else
                existCommodity = db.Products.FirstOrDefault(p => p.ProductNumber == productNumber);
            if (existCommodity == null)
            {
                Product newCommodity = Product.Create(materialID, count, quantity, ownerID, positionID, productNumber);
                db.Products.Add(newCommodity);

            }
            else
            {
                if (productNumber != string.Empty)
                {
                    throw new DomainException("已存在此编码");
                }
                else
                {
                    existCommodity.Count += count;
                    existCommodity.Quantity += quantity;
                }
            }
        }
        public void StockOut(string productNumber)
        {
            Product commodity = db.Products.FirstOrDefault(p => p.ProductNumber == productNumber);
            if (commodity == null)
            {
                throw new DomainException("无此编码");
            }
            db.Products.Remove(commodity);
        }
        public void StockOut(Guid ownerID, Guid materialID, decimal count, decimal quantity, Guid positionID, string productNumber = "")
        {
            Product commodity = db.Products.FirstOrDefault(p => p.OwnerID == ownerID && p.MaterialID == materialID && p.PositionID == positionID && p.ProductNumber == productNumber);
            if (commodity != null)
            {
                if (productNumber == string.Empty)
                {
                    if (commodity.Count >= count && commodity.Quantity >= quantity)
                    {
                        commodity.Count -= count;
                        commodity.Quantity -= quantity;
                    }
                    else
                        throw new DomainException("库存量不足");
                }
                else
                {
                    if (commodity.Count == count && commodity.Quantity == quantity)
                    {
                        db.Products.Remove(commodity);
                    }
                    else
                        throw new DomainException("库存量已发生改变");
                }
            }
            else
            {
                throw new DomainException("库存中无此商品");
            }

        }

    }
}
