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

namespace Alps.Web.Controllers
{
    public class GoodsApiController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/GoodsApi
        public IQueryable<Goods> GetGoods()
        {
            return db.Goods;
        }

        // GET: api/GoodsApi/5
        [ResponseType(typeof(Goods))]
        public IHttpActionResult GetGoods(Guid id)
        {
            Goods goods = db.Goods.Find(id);
            if (goods == null)
            {
                return NotFound();
            }

            return Ok(goods);
        }

        // PUT: api/GoodsApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGoods(Guid id, Goods goods)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != goods.ID)
            {
                return BadRequest();
            }

            db.Entry(goods).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GoodsExists(id))
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

        // POST: api/GoodsApi
        [ResponseType(typeof(Goods))]
        public IHttpActionResult PostGoods(Goods goods)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Goods.Add(goods);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (GoodsExists(goods.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = goods.ID }, goods);
        }

        // DELETE: api/GoodsApi/5
        [ResponseType(typeof(Goods))]
        public IHttpActionResult DeleteGoods(Guid id)
        {
            Goods goods = db.Goods.Find(id);
            if (goods == null)
            {
                return NotFound();
            }

            db.Goods.Remove(goods);
            db.SaveChanges();

            return Ok(goods);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GoodsExists(Guid id)
        {
            return db.Goods.Count(e => e.ID == id) > 0;
        }
    }
}