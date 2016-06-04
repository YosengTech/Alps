using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.AccountingMgr;
using System.ComponentModel.DataAnnotations;
namespace Alps.Domain.ProductMgr
{
    public class WarehouseVoucher : EntityBase
    {
        protected WarehouseVoucher()
        {
            Items = new HashSet<WarehouseVoucherItem>();
        }
        [Display(Name = "制单人")]
        [MinLength(1, ErrorMessage = "名字最少5个字母")]
        public string Creater { get; set; }
        [Display(Name = "制单时间")]
        [DisplayFormat(DataFormatString = "yyyy/mm/dd")]
        public DateTimeOffset CreateTime { get; set; }
        [Display(Name = "来源")]
        public Guid SourceID { get; set; }
        [Display(Name = "去处")]
        public Guid DestinationID { get; set; }
        [Display(Name = "来源")]
        public virtual TradeAccount Source { get; set; }
        [Display(Name = "去处")]
        public virtual TradeAccount Destination { get; set; }
        [Display(Name = "单据状态")]
        public virtual WarehouseVoucherState State { get; set; }
        [Display(Name = "提交人")]
        public string SubmitUser { get; set; }
        [Display(Name = "总数量")]
        public decimal TotalQuantity { get; set; }
        [Display(Name = "总重量")]
        public decimal TotalWeight { get; set; }
        [Display(Name = "总金额")]
        public decimal TotalAmount { get; set; }
        [Display(Name = "明细")]
        public virtual ICollection<WarehouseVoucherItem> Items { get; set; }

        public static WarehouseVoucher Create(Guid sourceID, Guid destinationID, string creater)
        {
            WarehouseVoucher newWarehouseVoucher = new WarehouseVoucher();
            newWarehouseVoucher.State = WarehouseVoucherState.Unconfirmed;
            newWarehouseVoucher.Creater = creater;
            newWarehouseVoucher.CreateTime = DateTime.Now;
            newWarehouseVoucher.SourceID = sourceID;
            newWarehouseVoucher.DestinationID = destinationID;
            newWarehouseVoucher.SubmitUser = "";
            return newWarehouseVoucher;
        }
        public void Submit(string user)
        {
            this.State = WarehouseVoucherState.Confirmed;
            SubmitUser = user;
        }
        public bool ProductNumberIsExist(string productNumber)
        {
            return this.Items.Count(p => p.ProductNumber == productNumber) > 0;
        }
        public void AddItem(ProductSkuInfo productSkuInfo, decimal quantity, decimal weight, decimal price, string productNumber, Position position, Guid? purchaseOrderItemID = null)
        {
            AddItem(productSkuInfo, quantity, weight, price, productNumber, position.ID, purchaseOrderItemID);
        }
        public void AddItem(ProductSkuInfo productSkuInfo, decimal quantity, decimal weight, decimal price, string productNumber, Guid positionID, Guid? purchaseOrderItemID = null)
        {
            if (productNumber == null)
                productNumber = string.Empty;
            if (productNumber != string.Empty)
                if (ProductNumberIsExist(productNumber))
                    throw new DomainException("已存在同样产品编号");
            WarehouseVoucherItem newWarehouseVoucherItem = new WarehouseVoucherItem();
            newWarehouseVoucherItem.WarehouseVoucher = this;
            newWarehouseVoucherItem.WarehouseVoucherID = this.ID;
            newWarehouseVoucherItem.ProductSkuInfo = productSkuInfo;
            newWarehouseVoucherItem.Quantity = quantity;
            //newWarehouseVoucherItem.UnitID = unitID;
            newWarehouseVoucherItem.Weight = weight;
            newWarehouseVoucherItem.Price = price;
            if (productSkuInfo.PricingMethod == PricingMethod.PricingByQuantity)
                newWarehouseVoucherItem.Amount = quantity * price;
            else
                newWarehouseVoucherItem.Amount = weight * price;
            //newWarehouseVoucherItem.Amount = pricingQuantity * price;
            newWarehouseVoucherItem.ProductNumber = productNumber;
            newWarehouseVoucherItem.PositionID = positionID;
            newWarehouseVoucherItem.PurchaseOrderItemID = purchaseOrderItemID;
            Items.Add(newWarehouseVoucherItem);
        }
        public void RemoveItem(Guid itemID)
        {
            WarehouseVoucherItem item = Items.FirstOrDefault(p => p.ID == itemID);
            if (item == null)
                throw new DomainException("无此ID");
            Items.Remove(item);
        }
        public void UpdateItem(Guid itemID, ProductSkuInfo productSkuInfo, decimal quantity, decimal weight, decimal price, string productNumber, Guid positionID, Guid? purchaseOrderItemID)
        {
            WarehouseVoucherItem item = this.Items.FirstOrDefault(p => p.ID == itemID);
            if (item != null)
            {
                if (productNumber == null)
                    productNumber = string.Empty;
                //item.Product = product;
                item.ProductSkuInfo = productSkuInfo;
                item.Quantity = quantity;
                item.Weight = weight;
                item.ProductNumber = productNumber;
                item.PositionID = positionID;
                item.Price = price;
                //item.Amount = price * pricingQuantity;
                item.PurchaseOrderItemID = purchaseOrderItemID;
                if (item.PricingMethod == PricingMethod.PricingByQuantity)
                    item.Amount = item.Quantity * item.Price;
                if (item.PricingMethod == PricingMethod.PricingByWeight)
                    item.Amount = item.Weight * item.Price;
            }
            else
            {
                throw new DomainException("无此ID");
            }
        }
        public void UpdateItem(IEnumerable<WarehouseVoucherItem> items)
        {
            var existingItems = this.Items.ToList();
            var updatedItems = items.Where(p => this.Items.Any(k => k.ID == p.ID)).ToList();
            var addedItems = items.Where(p => !this.Items.Any(k => k.ID == p.ID)).ToList();
            var deletedItems = this.Items.Where(p => !items.Any(k => k.ID == p.ID)).ToList();
            deletedItems.ForEach(p => this.Items.Remove(p));
            addedItems.ForEach(p => this.AddItem(p.ProductSkuInfo, p.Quantity, p.Weight, p.Price, p.ProductNumber, p.PositionID, p.PurchaseOrderItemID));
            updatedItems.ForEach(p => this.UpdateItem(p.ID, p.ProductSkuInfo, p.Quantity, p.Weight, p.Price, p.ProductNumber, p.PositionID, p.PurchaseOrderItemID));

        }


    }
}
