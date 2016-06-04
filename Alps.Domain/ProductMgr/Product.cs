using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Alps.Domain.Common;
namespace Alps.Domain.ProductMgr
{
    public class Product : EntityBase
    {
        [Display(Name = "品名")]
        public string Name { get; set; }
        //public Guid CatagoryID { get; set; }
        //[Display(Name = "类别")];
        //public virtual Catagory Catagory { get; set; }

        [Display(Name = "全名")]
        public string FullName { get; set; }
        [Display(Name="简介")]
        public string ShortDescription { get; set; }
        [Display(Name="详细介绍")]
        public string FullDescription { get; set; }

        //public ProductGrade ProductGrade { get; set; }
        [Display(Name="删除否")]
        public bool Deleted { get; set; }
        [Display(Name = "基本单位")]
        public Guid BaseUnitID { get; set; }
        [Display(Name = "类别")]
        public virtual ICollection<ProductCatagorySetting> ProductCatagorySettings { get; set; }
        [Display(Name = "计价方式")]
        public PricingMethod PricingMethod { get; set; }
        [Display(Name = "定价")]
        public decimal ListPrice { get; set; }
        //public ICollection<ProductAttributeCombination> ProductAttributeCombination { get; set; }
        public virtual Unit BaseUnit { get; set; }
        public static Product Create(string name,string shortDiscription,string fullDiscription,PricingMethod priceMethod,decimal price,Guid baseUnitID)
        {
            Product product = new Product();
            product.Name = name;
            product.FullName = shortDiscription;
            product.FullDescription = fullDiscription;
            product.ShortDescription = shortDiscription;
            //product.PackingQuantity = packingQuantity;
            //product.Weight = weight;
            product.PricingMethod = priceMethod;
            product.ListPrice = price;
            product.BaseUnitID = baseUnitID;
            product.ProductCatagorySettings = new HashSet<ProductCatagorySetting>();
            return product;
        }
        public void AddAssociatedCatagory(Catagory catagory,int displayOrder)
        {
            var productCatagorySetting = ProductCatagorySetting.Create(catagory.ID,catagory.Name,displayOrder);
            this.ProductCatagorySettings.Add(productCatagorySetting);
        }
        
        public void SetDeleted()
        {
            this.Deleted = true;
        }
        public PurchaseMgr.ProductInOrder GetProductInOrder()
        {
            return new PurchaseMgr.ProductInOrder(this.ID, this.FullName, this.PricingMethod);
        }
    }
}
