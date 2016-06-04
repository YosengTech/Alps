using Alps.Domain.ProductMgr;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Alps.Web.Infrastructure;
namespace Alps.Web.Models.ProductMgr
{
    public class ProductEditModel
    {
        [Display(Name = "物料名")]
        public string Name { get; set; }
        //public Guid CatagoryID { get; set; }
        //[Display(Name = "类别")];
        //public virtual Catagory Catagory { get; set; }

        [Display(Name = "全名")]
        public string FullName { get; set; }
        [Display(Name = "简介")]
        public string ShortDiscription { get; set; }
        [Display(Name = "详细介绍")]
        public string FullDiscription { get; set; }
        [Display(Name = "包装数")]
        public int PackingQuantity { get; set; }
        [Display(Name = "理论重量")]
        public decimal Weight { get; set; }
        //public ProductGrade ProductGrade { get; set; }
        [Display(Name = "删除否")]
        public bool Deleted { get; set; }

        [Display(Name = "计价方式")]
        public PricingMethod PricingMethod { get; set; }
        [Display(Name = "定价")]
        public decimal ListPrice { get; set; }

        public IList<AlpsSelectListItem<int>> PricingMethodSelectList { get; set; }
        //public 
    }
}