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
using Alps.Domain.ProductMgr;
using Alps.Web.Models;
using Alps.Domain;
using Alps.Service;
using Alps.Service.WarehouseMS;
namespace Alps.Web.Controllers
{
    public class DeliveryVoucherApiController : ApiController
    {
        private AlpsContext db = null;
        private DeliveryVoucherAppService deliverVoucherAS=null;
        public DeliveryVoucherApiController()
        {
            db = new AlpsContext();
            deliverVoucherAS = new DeliveryVoucherAppService(db);
        }
        // GET: api/DeliveryVoucherApi
        public IQueryable<DeliveryVoucher> GetDeliveryVouchers()
        {
            return deliverVoucherAS.GetDeliveryVouchers();
        }

        // GET: api/DeliveryVoucherApi/5
        [ResponseType(typeof(DeliveryVoucher))]
        public async Task<IHttpActionResult> GetDeliveryVoucher(Guid id)
        {
            DeliveryVoucher deliveryVoucher =await deliverVoucherAS.GetDeliveryVoucherAsync(id); // await db.DeliveryVouchers.FindAsync(id);
            if (deliveryVoucher == null)
            {
                return NotFound();
            }

            return Ok(deliveryVoucher);
        }

        // PUT: api/DeliveryVoucherApi/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDeliveryVoucher(Guid id, DeliveryVoucher deliveryVoucher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != deliveryVoucher.ID)
            {
                return BadRequest();
            }
            deliverVoucherAS.UpdateDeliveryVoucher(id, deliveryVoucher);
            //db.Entry(deliveryVoucher).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeliveryVoucherExists(id))
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

        // POST: api/DeliveryVoucherApi
        [ResponseType(typeof(DeliveryVoucher))]
        public async Task<IHttpActionResult> PostDeliveryVoucher(DeliveryVoucher deliveryVoucher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            deliveryVoucher.Creater = this.User.Identity.Name;
            deliveryVoucher.CreateTime = DateTime.Now;
            deliverVoucherAS.CreateDeliveryVoucher(deliveryVoucher);
            //db.DeliveryVouchers.Add(deliveryVoucher);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DeliveryVoucherExists(deliveryVoucher.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = deliveryVoucher.ID }, deliveryVoucher);
        }

        // DELETE: api/DeliveryVoucherApi/5
        [ResponseType(typeof(DeliveryVoucher))]
        public async Task<IHttpActionResult> DeleteDeliveryVoucher(Guid id)
        {
            deliverVoucherAS.DeleteDeliveryVoucher(id);
            await db.SaveChangesAsync();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DeliveryVoucherExists(Guid id)
        {
            return db.DeliveryVouchers.Count(e => e.ID == id) > 0;
        }
        public IHttpActionResult Submit(Guid id,DeliveryVoucher voucher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (voucher != null)
            {
                deliverVoucherAS.UpdateDeliveryVoucher(id, voucher);
            }
            var exitingDeliverVoucher = db.DeliveryVouchers.Find(id);
            deliverVoucherAS.SubmitDeliveryVoucher(id, User.Identity.Name);
            //exitingWarehouseVoucher.Submit("LeeLee");
            //Alps.Domain.Service.StockService stockService = new Domain.Service.StockService(db);
            //stockService.UpdateStock(exitingWarehouseVoucher);
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeliveryVoucherExists(id))
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
    }
}