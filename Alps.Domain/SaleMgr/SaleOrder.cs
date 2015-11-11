using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.Common;
namespace Alps.Domain.SaleMgr
{
    public class SaleOrder : EntityBase
    {
        public Customer Customer { get; set; }
        public DateTime OrderTime { get; set; }
        public virtual ICollection<SaleOrderItem> Items { get; set; }
        public Guid ParentSaleOrderID { get; set; }

        public void UpdateItems(Guid goodsID,decimal count, decimal weight, Guid unitID, decimal price)
        {
            SaleOrderItem existingItem = this.Items.FirstOrDefault(p => p.GoodsID == goodsID);
            if (existingItem == null)
            {
                existingItem = new SaleOrderItem();
                this.Items.Add(existingItem);
            }
            existingItem.GoodsID = goodsID;
            existingItem.Quantity += new Quantity(count,weight);
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
