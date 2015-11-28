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
using Alps.Domain.SaleMgr;
using Alps.Web.Models;
using Alps.Domain;
namespace Alps.Web.Controllers
{
    public class SaleOrderApiController : ApiController
    {
        private AlpsContext db = new AlpsContext();

        // GET: api/SaleOrderApi
        public IQueryable<SaleOrder> GetSaleOrders()
        {
            var q = from p in db.SaleOrders
                    from t in db.TradeAccounts
                    where p.CustomerID == t.ID
                    select p;
            return q;
        }

        // GET: api/SaleOrderApi/5
        [ResponseType(typeof(SaleOrder))]
        public IHttpActionResult GetSaleOrder(Guid id)
        {
            SaleOrder saleOrder = db.SaleOrders.Find(id);
            if (saleOrder == null)
            {
                return NotFound();
            }

            return Ok(saleOrder);
        }

        // PUT: api/SaleOrderApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSaleOrder(Guid id, SaleOrder saleOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != saleOrder.ID)
            {
                return BadRequest();
            }

            db.Entry(saleOrder).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleOrderExists(id))
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

        // POST: api/SaleOrderApi
        [ResponseType(typeof(SaleOrder))]
        public IHttpActionResult PostSaleOrder(SaleOrder saleOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SaleOrders.Add(saleOrder);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (SaleOrderExists(saleOrder.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = saleOrder.ID }, saleOrder);
        }

        // DELETE: api/SaleOrderApi/5
        [ResponseType(typeof(SaleOrder))]
        public IHttpActionResult DeleteSaleOrder(Guid id)
        {
            SaleOrder saleOrder = db.SaleOrders.Find(id);
            if (saleOrder == null)
            {
                return NotFound();
            }

            db.SaleOrders.Remove(saleOrder);
            db.SaveChanges();

            return Ok(saleOrder);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SaleOrderExists(Guid id)
        {
            return db.SaleOrders.Count(e => e.ID == id) > 0;
        }
    }
}