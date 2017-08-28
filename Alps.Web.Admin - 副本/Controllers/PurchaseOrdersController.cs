using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Alps.Domain.PurchaseMgr;
using Alps.Domain;
using Alps.Web.Admin.Model;

namespace Alps.Web.Admin.Controllers
{
  [Produces("application/json")]
  [Route("api/PurchaseOrders")]
  public class PurchaseOrdersController : Controller
  {
    private AlpsContext context = null;
    public PurchaseOrdersController(AlpsContext context)
    {
      this.context = context;
    }
    // GET: api/PurchaseOrders
    [HttpGet]
    public IQueryable<PurchaseOrderListModel> Get()
    {
      return context.PurchaseOrders.Select(p => new PurchaseOrderListModel
      {
        ID = p.ID,
        Supplier = p.Supplier.Name,
        CreateTime = p.OrderTime,
        Confirmer = p.Creater,
        Creater = p.Creater,
        ConfirmTime = p.OrderTime,
        TotalQuantity = p.TotalQuantity
      }).AsQueryable();
      //var result = Json(context.PurchaseOrders.ToList());
      //return result;
    }

    // GET: api/PurchaseOrders/5
    [HttpGet("{id}", Name = "Get")]
    public async Task<ActionResult> Get(Guid id)
    {
      PurchaseOrder purchaseOrder = await context.PurchaseOrders.FindAsync(id);
      PurchaseOrderEditModel purchaseOrderEditModel = new PurchaseOrderEditModel { ID = purchaseOrder.ID, Supplier = purchaseOrder.Supplier.Name,
        Items = purchaseOrder.Items.Select(p=>new PurchaseOrderItemEditModel { SKUID=p.ProductSkuInfo.SkuID,Price=p.Price,Amount=p.Amount,Quantity=p.Quantity})};
      if (purchaseOrder == null)
      {
        return NotFound();
      }

      return Ok(purchaseOrderEditModel);
    }

    // POST: api/PurchaseOrders
    [HttpPost]
    public void Post([FromBody]string value)
    {
    }

    // PUT: api/PurchaseOrders/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE: api/ApiWithActions/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
