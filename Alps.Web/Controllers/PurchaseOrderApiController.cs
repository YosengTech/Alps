using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Alps.Domain.PurchaseMgr;
using Alps.Web.Models;
using Alps.Domain;
using Alps.Service.PurchaseMgr;
namespace Alps.Web.Controllers
{
    public class PurchaseOrderApiController : ApiController
    {
        private AlpsContext db = new AlpsContext();

        // GET: api/PurchaseOrders
        public IQueryable<PurchaseOrder> GetPurchaseOrders()
        {
            return db.PurchaseOrders.ToList().AsQueryable();
        }

        // GET: api/PurchaseOrders/5
        [ResponseType(typeof(PurchaseOrder))]
        public async Task<IHttpActionResult> GetPurchaseOrder(Guid id)
        {
            PurchaseOrder purchaseOrder = await db.PurchaseOrders.FindAsync(id);
            if (purchaseOrder == null)
            {
                return NotFound();
            }

            return Ok(purchaseOrder);
        }

        // PUT: api/PurchaseOrders/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPurchaseOrder(Guid id, PurchaseOrder purchaseOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != purchaseOrder.ID)
            {
                return BadRequest();
            }
            new PurchaseMgrAppService(db).UpdatePurchaseOrder(id, purchaseOrder);
            //db.Entry(purchaseOrder).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseOrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/PurchaseOrders
        [ResponseType(typeof(PurchaseOrder))]
        public async Task<IHttpActionResult> PostPurchaseOrder(PurchaseOrder purchaseOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            purchaseOrder.Creater = this.RequestContext.Principal.Identity.Name;
            new PurchaseMgrAppService(db).CreaterPurchaseOrder(purchaseOrder);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PurchaseOrderExists(purchaseOrder.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = purchaseOrder.ID }, purchaseOrder);
        }

        // DELETE: api/PurchaseOrders/5
        [ResponseType(typeof(PurchaseOrder))]
        public async Task<IHttpActionResult> DeletePurchaseOrder(Guid id)
        {
            PurchaseOrder purchaseOrder = await db.PurchaseOrders.FindAsync(id);
            if (purchaseOrder == null)
            {
                return NotFound();
            }

            db.PurchaseOrders.Remove(purchaseOrder);
            await db.SaveChangesAsync();

            return Ok(purchaseOrder);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PurchaseOrderExists(Guid id)
        {
            return db.PurchaseOrders.Count(e => e.ID == id) > 0;
        }
        [NonAction]
        public async Task<IHttpActionResult> GetPurchaseOrderEditModel(Guid id)
        {
            var existingPurchaseOrder=await db.PurchaseOrders.FindAsync(id);
            return Json(existingPurchaseOrder);
        }
        public async Task<IHttpActionResult> ConfirmPurchaseOrder(Guid id)
        {
            new PurchaseMgrAppService(db).ConfirmPurchaseOrder(id);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}