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
using Alps.Domain.Common;
using Alps.Web.Models;
using Alps.Domain;

namespace Alps.Web.Controllers
{
    public class DepartmentApiController : ApiController
    {
        private AlpsContext db = new AlpsContext();

        // GET: api/DepartmentApi
        public IQueryable<Department> GetDepartments()
        {
            return db.Departments;
        }

        // GET: api/DepartmentApi/5
        [ResponseType(typeof(Department))]
        public async Task<IHttpActionResult> GetDepartment(Guid id)
        {
            Department department = await db.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            return Ok(department);
        }

        // PUT: api/DepartmentApi/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDepartment(Guid id, Department department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != department.ID)
            {
                return BadRequest();
            }

            db.Entry(department).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
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

        // POST: api/DepartmentApi
        [ResponseType(typeof(Department))]
        public async Task<IHttpActionResult> PostDepartment(Department department)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Departments.Add(department);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DepartmentExists(department.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = department.ID }, department);
        }

        // DELETE: api/DepartmentApi/5
        [ResponseType(typeof(Department))]
        public async Task<IHttpActionResult> DeleteDepartment(Guid id)
        {
            Department department = await db.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            db.Departments.Remove(department);
            await db.SaveChangesAsync();

            return Ok(department);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DepartmentExists(Guid id)
        {
            return db.Departments.Count(e => e.ID == id) > 0;
        }
    }
}