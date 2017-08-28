using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alps.Web.Admin.Model
{
  public class PurchaseOrderListModel
  {
    public DateTime CreateTime { get; set; }
    public string Creater { get; set; }
    public DateTime ConfirmTime { get; set; }
    public string Confirmer { get; set; }
    public Guid ID { get; set; }
    public Guid OrderID { get; set; }
    public string Supplier { get; set; }
    public decimal TotalQuantity { get; set; }


  }

  public class PurchaseOrderItemEditModel
  {
    public Guid SKUID { get; set; }
    public decimal Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal Amount { get; set; }
  }
  public class PurchaseOrderEditModel
  {
    public Guid ID { get; set; }
    public string Supplier { get; set; }
    public string Department { get; set; }
    public Guid SupplierID { get; set; }
    public Guid DepartmentID { get; set; }
    public IEnumerable<PurchaseOrderItemEditModel> Items { get; set; }
  }

}
