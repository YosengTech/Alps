using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
namespace Alps.Web.Models.ProductMgr
{
    public class ProductStockListModel
    {
        public Guid ID { get; set; }
        [Display(Name="产品名")]
        public string ProductName { get; set; }
        [Display(Name="数量")]
        public decimal Quantity { get; set; }
        [Display(Name="重量")]
        public decimal Weight { get; set; }
        [Display(Name="仓位")]
        public string PositionName { get; set; }
        [Display(Name="所属部门")]
        public string OwnerName { get; set; }
        [Display(Name="产品编号")]
        public string ProductNumber { get; set; }
    }
}