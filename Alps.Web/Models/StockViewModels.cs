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
        public string PositionName { get; set; }
        public decimal Count { get; set; }
        public decimal Quantity { get; set; }
        [Display(Name="所有人")]
        public string Owner { get; set; }

    }
}