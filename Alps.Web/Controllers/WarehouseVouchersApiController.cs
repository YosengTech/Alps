using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Alps.Domain.ProductMgr;
using Alps.Web.Models;

namespace Alps.Web.Controllers
{
    public class WarehouseVouchersApiController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/WarehouseVouchersApi
        public IQueryable<WarehouseVoucher> GetWarehouseVouchers()
        {
            return db.WarehouseVouchers;
        }

        // GET: api/WarehouseVouchersApi/5
        [ResponseType(typeof(WarehouseVoucher))]
        public IHttpActionResult GetWarehouseVoucher(Guid id)
        {
            WarehouseVoucher warehouseVoucher = db.WarehouseVouchers.Find(id);
            if (warehouseVoucher == null)
            {
                return NotFound();
            }

            return Ok(warehouseVoucher);
        }

        // PUT: api/WarehouseVouchersApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutWarehouseVoucher(Guid id, WarehouseVoucher warehouseVoucher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != warehouseVoucher.ID)
            {
                return BadRequest();
            }

            db.Entry(warehouseVoucher).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarehouseVoucherExists(id))
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

        // POST: api/WarehouseVouchersApi
        [ResponseType(typeof(WarehouseVoucher))]
        public IHttpActionResult PostWarehouseVoucher(WarehouseVoucher warehouseVoucher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.WarehouseVouchers.Add(warehouseVoucher);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (WarehouseVoucherExists(warehouseVoucher.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = warehouseVoucher.ID }, warehouseVoucher);
        }

        // DELETE: api/WarehouseVouchersApi/5
        [ResponseType(typeof(WarehouseVoucher))]
        public IHttpActionResult DeleteWarehouseVoucher(Guid id)
        {
            WarehouseVoucher warehouseVoucher = db.WarehouseVouchers.Find(id);
            if (warehouseVoucher == null)
            {
                return NotFound();
            }

            db.WarehouseVouchers.Remove(warehouseVoucher);
            db.SaveChanges();

            return Ok(warehouseVoucher);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WarehouseVoucherExists(Guid id)
        {
            return db.WarehouseVouchers.Count(e => e.ID == id) > 0;
        }
    }
}