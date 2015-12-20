using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.Common;
using Alps.Domain.ProductMgr;
using Alps.Domain.AccountingMgr;
using Alps.Domain.DistributionMgr;
using System.ComponentModel.DataAnnotations;
namespace Alps.Domain.SaleMgr
{
    public class SaleOrder : EntityBase
    {
        public TradeAccount Customer { get; set; }
        [Display(Name="客户")]
        public Guid CustomerID { get; set; }
        [Display(Name="下单时间")]
        public DateTime OrderTime { get; set; }
        public string DeliveryAddress { get; set; }
        public  ICollection<SaleOrderItem> Items { get; set; }
        public  ICollection<DistributionVoucher> DeliveryVouchers { get; set; }
        public SaleOrder ParentSaleOrder { get; set; }
        public SaleOrder()
        {
            Items = new HashSet<SaleOrderItem>();
            DeliveryVouchers = new HashSet<DistributionVoucher>();
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

        public void UpdateItems(Guid commodityID, decimal count, decimal weight, Guid unitID, decimal price)
        {
            SaleOrderItem existingItem = this.Items.FirstOrDefault(p => p.CommodityID == commodityID);
            if (existingItem == null)
            {
                existingItem = new SaleOrderItem();
                this.Items.Add(existingItem);
            }
            existingItem.CommodityID = commodityID;
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
