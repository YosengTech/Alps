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
    public class CommodityApiController : ApiController
    {
        private AlpsContext db = new AlpsContext();

        // GET: api/CommodityApi
        public IQueryable<Commodity> GetCommodity()
        {
            return db.Commodities;
        }

        // GET: api/CommodityApi/5
        [ResponseType(typeof(Commodity))]
        public IHttpActionResult GetCommodity(Guid id)
        {
            Commodity commodity = db.Commodities.Find(id);
            if (commodity == null)
            {
                return NotFound();
            }

            return Ok(commodity);
        }

        // PUT: api/CommodityApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCommodity(Guid id, Commodity commodity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != commodity.ID)
            {
                return BadRequest();
            }

            db.Entry(commodity).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommodityExists(id))
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

        // POST: api/CommodityApi
        [ResponseType(typeof(Commodity))]
        public IHttpActionResult PostCommodity(Commodity commodity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Commodities.Add(commodity);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CommodityExists(commodity.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = commodity.ID }, commodity);
        }

        // DELETE: api/CommodityApi/5
        [ResponseType(typeof(Commodity))]
        public IHttpActionResult DeleteCommodity(Guid id)
        {
            Commodity commodity = db.Commodities.Find(id);
            if (commodity == null)
            {
                return NotFound();
            }

            db.Commodities.Remove(commodity);
            db.SaveChanges();

            return Ok(commodity);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommodityExists(Guid id)
        {
            return db.Commodities.Count(e => e.ID == id) > 0;
        }
    }
}