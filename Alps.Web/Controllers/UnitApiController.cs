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
using Alps.Domain.Common;
using Alps.Web.Models;

namespace Alps.Web.Controllers
{
    public class UnitApiController : ApiController
    {
        private Alps.Domain.AlpsContext db = new Alps.Domain.AlpsContext();

        // GET: api/UnitApi
        public IQueryable<Unit> GetUnits()
        {
            return db.Units;
        }

        // GET: api/UnitApi/5
        [ResponseType(typeof(Unit))]
        public IHttpActionResult GetUnit(Guid id)
        {
            Unit unit = db.Units.Find(id);
            if (unit == null)
            {
                return NotFound();
            }

            return Ok(unit);
        }

        // PUT: api/UnitApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUnit(Guid id, Unit unit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != unit.ID)
            {
                return BadRequest();
            }

            db.Entry(unit).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UnitExists(id))
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

        // POST: api/UnitApi
        [ResponseType(typeof(Unit))]
        public IHttpActionResult PostUnit(Unit unit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Units.Add(unit);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UnitExists(unit.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = unit.ID }, unit);
        }

        // DELETE: api/UnitApi/5
        [ResponseType(typeof(Unit))]
        public IHttpActionResult DeleteUnit(Guid id)
        {
            Unit unit = db.Units.Find(id);
            if (unit == null)
            {
                return NotFound();
            }

            db.Units.Remove(unit);
            db.SaveChanges();

            return Ok(unit);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UnitExists(Guid id)
        {
            return db.Units.Count(e => e.ID == id) > 0;
        }
    }
}