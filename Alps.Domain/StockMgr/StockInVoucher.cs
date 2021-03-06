﻿using Alps.Domain.AccountingMgr;
using Alps.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.StockMgr
{
    public class StockInVoucher : EntityBase
    {

        public Guid SourceID { get; set; }
        public Guid DepartmentID { get; set; }
        public decimal TotalAuxiliaryQuantity { get; set; }
        public decimal TotalQuantity { get; set; }
        public decimal TotalAmount { get; set; }
        public string Confirmer { get; set; }
        public DateTimeOffset? ConfirmTime { get; set; }
        public StockInVoucherStatus Status { get; set; }
        public string Creater { get; set; }
        public DateTimeOffset CreateTime { get; set; }
        public virtual ICollection<StockInVoucherItem> Items { get; set; }

        public virtual TradeAccount Source { get; set; }
        public virtual TradeAccount Department { get; set; }

        public StockInVoucher()
        {
            Items = new HashSet<StockInVoucherItem>();
        }
        public static StockInVoucher Create(Guid sourceID, Guid departmentID, string creater)
        {
            StockInVoucher voucher = new StockInVoucher()
            {
                SourceID = sourceID,
                DepartmentID = departmentID,
                Creater = creater,
                CreateTime = DateTimeOffset.Now
            };
            return voucher;
        }
        public StockInVoucherItem AddItem(Guid productSkuID, decimal quantity, decimal price, Guid positionID, string serialNumber, decimal auxiliaryQuantity, bool reFreshQuantity = true)
        {
            var item = new StockInVoucherItem()
            {
                ProductSkuID = productSkuID,
                Quantity = quantity,
                Price = price,
                PositionID = positionID,
                AuxiliaryQuantity = auxiliaryQuantity,
                SerialNumber = serialNumber ?? "" ,
                StockInVoucherID = this.ID
            };
            this.Items.Add(item);
            if (reFreshQuantity)
                ReFreshQuantity();
            return item;
        }
        public void RemoveItem(Guid id,bool reFreshQuantity = false)
        {
            var item = this.Items.FirstOrDefault(p => p.ID == id);
            if (item == null)
                throw new DomainException("无此ID");
            this.Items.Remove(item);
            if (reFreshQuantity)
                ReFreshQuantity();
        }
        public void UpdateItem(Guid id,Guid productSkuID, decimal quantity, decimal price, Guid positionID, string serialNumber, decimal auxiliaryQuantity=0, bool reFreshQuantity = true)
        {
            var item = this.Items.FirstOrDefault(p => p.ID == id);
            if (item == null)
                throw new DomainException("无此ID");
            item.ProductSkuID = productSkuID;
            item.Quantity = quantity;
            item.Price = price;
            item.PositionID = positionID;
            item.SerialNumber = serialNumber;
            item.AuxiliaryQuantity = auxiliaryQuantity;
            if (reFreshQuantity)
                ReFreshQuantity();
        }
        private void ReFreshQuantity()
        {
            this.TotalQuantity = this.Items.Sum(p => p.Quantity);
            this.TotalAuxiliaryQuantity = this.Items.Sum(p => p.AuxiliaryQuantity);
            this.TotalAmount = this.Items.Sum(p => p.Price * p.Quantity);
        }
        public void UpdateItems(IEnumerable<IStockInVoucherItemBase> items)
        {
            var existingItems = this.Items.ToList();
            var updatedItems = items.Where(p => this.Items.Any(k => k.ID == p.ID)).ToList();
            var addedItems = items.Where(p => !this.Items.Any(k => k.ID == p.ID)).ToList();
            var deletedItems = this.Items.Where(p => !items.Any(k => k.ID == p.ID)).ToList();
            deletedItems.ForEach(p => this.RemoveItem(p.ID,false));
            addedItems.ForEach(p => this.AddItem(p.ProductSkuID, p.Quantity, p.Price, p.PositionID, p.SerialNumber, p.AuxiliaryQuantity,false));
            updatedItems.ForEach(p => this.UpdateItem(p.ID, p.ProductSkuID, p.Quantity, p.Price, p.PositionID, p.SerialNumber, p.AuxiliaryQuantity,false));
            ReFreshQuantity();
        }
        public StockInVoucherItem AddItem(IStockInVoucherItemBase item)
        {
            return this.AddItem(item.ProductSkuID, item.Quantity, item.Price, item.PositionID, item.SerialNumber, item.AuxiliaryQuantity);
        }
    }
    public interface IStockInVoucherItemBase
    {
        Guid ID { get; set; }
        Guid ProductSkuID { get; set; }
        decimal Quantity { get; set; }
        decimal Price { get; set; }
        Guid PositionID { get; set; }
        string SerialNumber { get; set; }
        decimal AuxiliaryQuantity { get; set; }
    }

}
