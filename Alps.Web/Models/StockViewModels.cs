using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Alps.Web.Models
{
    public class StockInfoViewModel
    {
        public Guid ID { get; set; }
        [Display(Name="品名")]
        public string MaterialName { get; set; }
        [Display(Name = "仓位")]
        public string PositionName { get; set; }
        [Display(Name = "件数")]
        public decimal Weight { get; set; }
        public decimal Quantity { get; set; }
        [Display(Name="所有人")]
        public string Owner { get; set; }
        [Display(Name="序列号")]
        public string ProductNumber { get; set; }

    }
}