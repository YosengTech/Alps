﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.ProductMgr
{
    public class ProductSku : EntityBase
    {
        public Guid ProductID { get; set; }
        [Display(Name="SKU描述")]
        public string Description { get; set; }
        [Display(Name = "库存数量")]
        public int StockQuantity { get; set; }
        [Display(Name = "库存重量")]
        public int StockWeight { get; set; }
        [Display(Name = "定价")]
        public decimal Price { get; set; }
        [Display(Name = "属性")]
        public string Attributes { get; set; }
        public string AttributeName { get; set; }
        [Display(Name = "创建时间")]
        public DateTime CreatedTime { get; set; }
        [Display(Name = "修改时间")]
        public DateTime ModifiedTime { get; set; }

        [Display(Name = "计价方式")]
        public PricingMethod PricingMethod { get; set; }
        //[Display(Name = "包装数")]
        //public int PackingQuantity { get; set; }
        //[Display(Name = "理论重量")]
        //public decimal Weight { get; set; }
        public virtual Product Product { get; set; }

        public static ProductSku Create(Guid productID, string attributes, int stockQuantity,PricingMethod pricingMethod, decimal price)
        {
            ProductSku sku = new ProductSku();
            sku.ProductID = productID;
            sku.Attributes = attributes;
            sku.Description = attributes;
            sku.PricingMethod = pricingMethod;
            sku.UpdatePrice(price);
            sku.UpdateStockQuantity(stockQuantity, true);
            sku.CreatedTime = DateTime.Now;
            sku.ModifiedTime = sku.CreatedTime;
            return sku;
        }
        public void UpdatePrice(decimal price)
        {
            this.Price = price;
        }
        public void UpdateStockQuantity(int quantity, bool fullUpdate = false)
        {
            if (fullUpdate)
            {
                if (quantity >= 0)
                    this.StockQuantity = StockQuantity;
                else
                    throw new DomainException("库存数量不能为负");
            }
            else
            {
                if (this.StockQuantity + quantity >= 0)
                    this.StockQuantity = +quantity;
                else
                    throw new DomainException("减少量超过库存数量");
            }
        }

        public ProductSkuInfo GetProductSkuInfo()
        {
            return ProductSkuInfo.Create(this.ID, this.AttributeName, this.PricingMethod);
        }
    }
}
