using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Alps.Domain.Common;
namespace Alps.Domain.ProductMgr
{
    public class WarehouseVoucherItem : EntityBase
    {
        public WarehouseVoucher WarehouseVoucher { get; set; }
        public Guid WarehouseVoucherID { get; set; }


        //[Display(Name = "产品")]
        //public Guid ProductID { get; set; }
        //[Display(Name = "SKU")]
        //public Guid SkuID { get; set; }
        public ProductSkuInfo ProductSkuInfo { get; set; }
        [Display(Name = "数量")]
        public decimal Quantity { get; set; }
        //[Display(Name = "单位")]
        //public Guid UnitID { get; set; }
        [Display(Name = "重量")]
        public decimal Weight { get; set; }
        [Display(Name = "计价方式")]
        public PricingMethod PricingMethod { get; set; }
        //[Display(Name="计价数量")]
        //public decimal PricingQuantity { get; set; }
        [Display(Name = "价格")]
        public decimal Price { get; set; }
        [Display(Name = "金额")]
        public decimal Amount { get; set; }
        [Display(Name = "物品编号")]
        public string ProductNumber { get; set; }

        [Display(Name = "仓库")]
        public Guid PositionID { get; set; }

        [Display(Name = "订单")]
        public Guid? PurchaseOrderItemID { get; set; }

        //public virtual Unit Unit { get; set; }
        public virtual Position Position { get; set; }
        //public virtual Product Product { get; set; }
    }
    
}
