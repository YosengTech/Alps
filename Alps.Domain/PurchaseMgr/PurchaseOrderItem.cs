using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.ProductMgr;
using Alps.Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Alps.Domain.PurchaseMgr
{
    public class PurchaseOrderItem : EntityBase
    {
        public PurchaseOrder PurchaseOrder { get; set; }
        [Key]
        public Guid PurchaseOrderID { get; set; }
        [Display(Name = "物料")]
        public Guid MaterialID { get; set; }

        [Display(Name = "条数")]
        public decimal Count { get; set; }
        public decimal Quantity { get; set; }
        public Unit Unit { get; set; }
        public Guid UnitID { get; set; }
        public string ProductNumber { get; set; }
    }
}
