using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alps.Web.Admin.Model
{
    public class StockListDto
    {
    public string Name { get; set; }
    public decimal Quantity { get; set; }
    public decimal AuxiliaryQuantity { get; set; }
    public string Warehouse { get; set; }
    }
}
