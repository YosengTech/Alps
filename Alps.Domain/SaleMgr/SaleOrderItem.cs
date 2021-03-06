﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.ProductMgr;
using Alps.Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Alps.Domain.SaleMgr
{
    public class SaleOrderItem : EntityBase
    {
        public Commodity Commodity { get; set; }
        [Display(Name="品名")]
        public Guid CommodityID { get; set; }
        //public decimal Quantity { get; set; }
        public Guid UnitID { get; set; }
        public Unit Unit { get; set; }
        [Display(Name="价格")]
        public decimal Price { get; set; }
        public string Remark { get; set; }
        public Quantity Quantity { get; set; }
    }
}
