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
using Alps.Domain;
namespace Alps.Web.Controllers
{
    public class CatagoriesApiController : ApiController
    {
        private AlpsContext db = new AlpsContext();

        // GET: api/CatagoriesApi
        public IQueryable<Catagory> GetCatagories()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.Catagories;
        }

        // GET: api/CatagoriesApi/5
        [ResponseType(typeof(Catagory))]
        public IHttpActionResult GetCatagory(Guid id)
        {
            Catagory catagory = db.Catagories.Find(id);
            if (catagory == null)
            {
                return NotFound();
            }

            return Ok(catagory);
        }

        // PUT: api/CatagoriesApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCatagory(Guid id, Catagory catagory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != catagory.ID)
            {
                return BadRequest();
            }

            db.Entry(catagory).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CatagoryExists(id))
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

        // POST: api/CatagoriesApi
        [ResponseType(typeof(Catagory))]
        public IHttpActionResult PostCatagory(Catagory catagory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Catagories.Add(catagory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CatagoryExists(catagory.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = catagory.ID }, catagory);
        }

        // DELETE: api/CatagoriesApi/5
        [ResponseType(typeof(Catagory))]
        public IHttpActionResult DeleteCatagory(Guid id)
        {
            Catagory catagory = db.Catagories.Find(id);
            if (catagory == null)
            {
                return NotFound();
            }

            db.Catagories.Remove(catagory);
            db.SaveChanges();

            return Ok(catagory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CatagoryExists(Guid id)
        {
            return db.Catagories.Count(e => e.ID == id) > 0;
        }
    }
}