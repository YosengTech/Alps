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
using Alps.Service.ProductMgr;
namespace Alps.Web.Controllers
{
    public class CatagoryApiController : ApiController
    {
        private CatagoryService catagoryService = null;
        private AlpsContext unitOfWork = null;
        public CatagoryApiController()
        {
            unitOfWork = new AlpsContext();
            catagoryService = new CatagoryService(unitOfWork);
        }
        // GET: api/CatagoriesApi
        public IList<Catagory> GetCatagories()
        {
            //IList<Catagory> list= db.Catagories.Include(p=>p.Parent).ToList();

            IList<Catagory> list = catagoryService.GetCatagories();
            return list;
        }

        // GET: api/CatagoriesApi/5
        [ResponseType(typeof(Catagory))]
        public IHttpActionResult GetCatagory(Guid id)
        {
            Catagory catagory = catagoryService.GetCatagory(id); //db.Catagories.Find(id);
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

            //db.Entry(catagory).State = EntityState.Modified;
            catagoryService.UpdateCatagory(catagory.ID, catagory.Name, catagory.ParentID.HasValue ? catagory.ParentID.Value : Guid.Empty);

            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;

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
            catagoryService.AddCatagory(catagory.Name, catagory.ParentID.HasValue ? catagory.ParentID.Value : Guid.Empty);
            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateException)
            {

                throw;

            }

            return CreatedAtRoute("DefaultApi", new { id = catagory.ID }, catagory);
        }

        // DELETE: api/CatagoriesApi/5
        [ResponseType(typeof(Catagory))]
        public IHttpActionResult DeleteCatagory(Guid id)
        {
            Catagory catagory = catagoryService.GetCatagory(id);
            if (catagory == null)
            {
                return NotFound();
            }

            //db.Catagories.Remove(catagory);
            catagoryService.DeleteCatagory(id);
            unitOfWork.SaveChanges();

            return Ok(catagory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }


    }
}