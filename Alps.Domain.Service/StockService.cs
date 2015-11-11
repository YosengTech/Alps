﻿using System;
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
                foreach (WarehouseVoucherItem item in voucher.Items)
                {
                    StockIn(voucher.DestinationID, item.MaterialID, item.Count, item.Quantity, item.PositionID, item.ProductNumber);
                }
            }
        }
        public void StockIn(Guid ownerID, Guid materialID, decimal count, decimal quantity, Guid positionID, string productNumber = "")
        {
            Commodity existCommodity =null;
            if (productNumber == string.Empty)
                existCommodity = db.Commodities.FirstOrDefault(p => p.OwnerID == ownerID && p.MaterialID == materialID && p.PositionID == positionID);
            else
                existCommodity = db.Commodities.FirstOrDefault(p => p.ProductNumber == productNumber);
            if (existCommodity == null)
            {
                Commodity newCommodity = Commodity.Create(materialID, count, quantity, ownerID, positionID, productNumber);
                db.Commodities.Add(newCommodity);

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
            Commodity commodity = db.Commodities.FirstOrDefault(p => p.ProductNumber == productNumber);
            if (commodity == null)
            {
                throw new DomainException("无此编码");
            }
            db.Commodities.Remove(commodity);
        }
        public void StockOut(Guid ownerID, Guid materialID, decimal count, decimal quantity, Guid positionID, string productNumber = "")
        {
            Commodity commodity = db.Commodities.FirstOrDefault(p => p.OwnerID == ownerID && p.MaterialID == materialID && p.PositionID == positionID && p.ProductNumber == productNumber);
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
                        db.Commodities.Remove(commodity);
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