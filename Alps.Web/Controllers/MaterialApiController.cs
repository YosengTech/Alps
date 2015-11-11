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
    public class MaterialApiController : ApiController
    {
        private Alps.Domain.AlpsContext db = new Alps.Domain.AlpsContext();

        // GET: api/MaterialApi
        public IQueryable<Material> GetMaterials()
        {
            return db.Materials.ToList().AsQueryable();
        }

        // GET: api/MaterialApi/5
        [ResponseType(typeof(Material))]
        public IHttpActionResult GetMaterial(Guid id)
        {
            Material material = db.Materials.Find(id);
            if (material == null)
            {
                return NotFound();
            }

            return Ok(material);
        }

        // PUT: api/MaterialApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMaterial(Guid id, Material material)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != material.ID)
            {
                return BadRequest();
            }

            db.Entry(material).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialExists(id))
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

        // POST: api/MaterialApi
        [ResponseType(typeof(Material))]
        public IHttpActionResult PostMaterial(Material material)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Materials.Add(material);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MaterialExists(material.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = material.ID }, material);
        }

        // DELETE: api/MaterialApi/5
        [ResponseType(typeof(Material))]
        public IHttpActionResult DeleteMaterial(Guid id)
        {
            Material material = db.Materials.Find(id);
            if (material == null)
            {
                return NotFound();
            }

            db.Materials.Remove(material);
            db.SaveChanges();

            return Ok(material);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MaterialExists(Guid id)
        {
            return db.Materials.Count(e => e.ID == id) > 0;
        }
    }
}