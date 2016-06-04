using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.ProductMgr
{
    public class ProductSkuInfo
    {
        [Display(Name = "品名")]
        public Guid SkuID { get; set; }
        [Display(Name = "品名")]
        public string Name { get; set; }
        [Display(Name = "计价方式")]
        public PricingMethod PricingMethod { get; set; }
        public ProductSkuInfo() { }
        public ProductSkuInfo(Guid id) : this(id, string.Empty) { }
        public ProductSkuInfo(Guid id, string name)
            : this(id, name, PricingMethod.PricingByQuantity)
        {
        }
        public ProductSkuInfo(Guid id, string name, PricingMethod pricingMethod)
        {
            this.SkuID = id;
            this.Name = name;
            this.PricingMethod = pricingMethod;
        }
        public static ProductSkuInfo Create(Guid id, string name, PricingMethod pricingMethod)
        {
            return new ProductSkuInfo(id, name, pricingMethod);
        }
    }
}
