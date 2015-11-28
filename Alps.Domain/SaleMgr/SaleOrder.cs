using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.Common;
using Alps.Domain.ProductMgr;
using Alps.Domain.AccountingMgr;
using System.ComponentModel.DataAnnotations;
namespace Alps.Domain.SaleMgr
{
    public class SaleOrder : EntityBase
    {
        public TradeAccount Customer { get; set; }
        [Display(Name="客户")]
        public Guid CustomerID { get; set; }
        public DateTime OrderTime { get; set; }
        public string DeliveryAddress { get; set; }
        public  ICollection<SaleOrderItem> Items { get; set; }
        public  ICollection<DeliveryVoucher> DeliveryVouchers { get; set; }
        public SaleOrder ParentSaleOrder { get; set; }
        public SaleOrder()
        {
            Items = new HashSet<SaleOrderItem>();
            DeliveryVouchers = new HashSet<DeliveryVoucher>();
        }

        public static SaleOrder Create(Guid customerID,SaleOrder parentSaleOrder = null)
        {
            SaleOrder saleOrder = new SaleOrder();
            saleOrder.CustomerID = customerID;
            saleOrder.Items = new HashSet<SaleOrderItem>();
            saleOrder.OrderTime = DateTime.Now;
            saleOrder.ParentSaleOrder = parentSaleOrder;
            return saleOrder;
        }

        public void UpdateItems(Guid goodsID, decimal count, decimal weight, Guid unitID, decimal price)
        {
            SaleOrderItem existingItem = this.Items.FirstOrDefault(p => p.GoodsID == goodsID);
            if (existingItem == null)
            {
                existingItem = new SaleOrderItem();
                this.Items.Add(existingItem);
            }
            existingItem.GoodsID = goodsID;
            existingItem.Quantity += new Quantity(count, weight);
            existingItem.UnitID = unitID;
            existingItem.Price = price;

            if (existingItem.Quantity.Count == 0)
            {
                this.Items.Remove(existingItem);
            }
            if (existingItem.Quantity.IsNegative())
                throw new DomainException("订单数量不能小于零");
        }
    }
}
