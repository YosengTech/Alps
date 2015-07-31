using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Alps.Domain.ProductMgr
{
    public class WarehouseVoucherItem:EntityBase
    
    {
        public WarehouseVoucher WarehouseVoucher { get; set; }
        public Guid WarehouseVoucherID { get; set; }
        public virtual Material Material { get; set; }
        public Guid MaterialID { get; set; }
        [Display(Name="数量")]
        [Range(10,20)]
        public decimal Count { get; set; }
        public decimal Quantity { get; set; }
        public string ProductNumber { get; set; }
        public Position Position { get; set; }
        public Guid PositionID { get; set; }

    }
}
