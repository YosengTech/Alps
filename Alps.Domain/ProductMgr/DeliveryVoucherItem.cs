using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.ProductMgr
{
    public class DeliveryVoucherItem:EntityBase
    {
        public DeliveryVoucher DeliveryVoucher { get; set; }
        public Guid DeliveryVoucherID { get; set; }
        public virtual Product Material { get; set; }
        [Display(Name = "物料")]
        public Guid MaterialID { get; set; }
        [Display(Name = "件数")]
        public decimal Count { get; set; }
        [Display(Name = "数量")]
        public decimal Quantity { get; set; }
        [Display(Name = "物品编号")]
        public string ProductNumber { get; set; }
        public Position Position { get; set; }
        [Display(Name = "仓库")]
        public Guid PositionID { get; set; }
    }
}
