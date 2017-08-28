using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Alps.Domain.Common;
namespace Alps.Domain.ProductMgr
{
    public class ProductStock:EntityBase
    {
        
        //public virtual Product Product { get; set; }
        //public Guid ProductID { get; set; }

        public Guid SkuID { get; set; }
        public decimal Quantity { get; set; }
        public decimal Weight { get; set; }
        public Guid PositionID { get; set; }
        public Guid DepartmentID { get; set; }
        public string ProductNumber { get; set; }

        public virtual Department Department { get; set; }

        public static ProductStock Create(Guid skuID, decimal quantity, decimal weight, Guid departmentID, Guid positionID, string productNumber = "")
        {
            ProductStock productStock=new ProductStock();
            productStock.SkuID = skuID;
            productStock.Quantity = quantity;
            productStock.Weight = weight;
            productStock.DepartmentID = departmentID;
            productStock.PositionID = positionID;
            productStock.ProductNumber = productNumber;
            return productStock;
        }

    }
}
