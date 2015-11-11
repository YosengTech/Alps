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
    public class PositionApiController : ApiController
    {
        private Alps.Domain.AlpsContext db = new Alps.Domain.AlpsContext();

        // GET: api/PositionApi
        public IQueryable<Position> GetPositions()
        {
            return db.Positions;
        }

        // GET: api/PositionApi/5
        [ResponseType(typeof(Position))]
        public IHttpActionResult GetPosition(Guid id)
        {
            Position position = db.Positions.Find(id);
            if (position == null)
            {
                return NotFound();
            }

            return Ok(position);
        }

        // PUT: api/PositionApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPosition(Guid id, Position position)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != position.ID)
            {
                return BadRequest();
            }

            db.Entry(position).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PositionExists(id))
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

        // POST: api/PositionApi
        [ResponseType(typeof(Position))]
        public IHttpActionResult PostPosition(Position position)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Positions.Add(position);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (PositionExists(position.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = position.ID }, position);
        }

        // DELETE: api/PositionApi/5
        [ResponseType(typeof(Position))]
        public IHttpActionResult DeletePosition(Guid id)
        {
            Position position = db.Positions.Find(id);
            if (position == null)
            {
                return NotFound();
            }

            db.Positions.Remove(position);
            db.SaveChanges();

            return Ok(position);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PositionExists(Guid id)
        {
            return db.Positions.Count(e => e.ID == id) > 0;
        }
    }
}