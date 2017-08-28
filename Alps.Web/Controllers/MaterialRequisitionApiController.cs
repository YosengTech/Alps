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
using Alps.Domain.ProductMgr;
using Alps.Web.Models;
using Alps.Domain;
using Alps.Service.WarehouseMS;

namespace Alps.Web.Controllers
{
    public class MaterialRequisitionApiController : ApiController
    {
        private AlpsContext unitOfWork = null;
        private MaterialRequisitionAppService materialRequisitionAS = null;
        public MaterialRequisitionApiController()
        {
            unitOfWork = new AlpsContext();
            materialRequisitionAS = new MaterialRequisitionAppService(unitOfWork);
        }
        // GET: api/MaterialRequisitionApi
        public IQueryable<MaterialRequisition> GetMaterialRequisitions()
        {
            return materialRequisitionAS.GetMaterialRequisitions();
        }

        // GET: api/MaterialRequisitionApi/5
        [ResponseType(typeof(MaterialRequisition))]
        public async Task<IHttpActionResult> GetMaterialRequisition(Guid id)
        {
            MaterialRequisition materialRequisition = await materialRequisitionAS.GetMaterialRequisitionAsync(id);
            if (materialRequisition == null)
            {
                return NotFound();
            }

            return Ok(materialRequisition);
        }

        // PUT: api/MaterialRequisitionApi/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMaterialRequisition(Guid id, MaterialRequisition materialRequisition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != materialRequisition.ID)
            {
                return BadRequest();
            }

            materialRequisitionAS.UpdateMaterialRequisition(id, materialRequisition);

            try
            {
                await unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialRequisitionExists(id))
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

        // POST: api/MaterialRequisitionApi
        [ResponseType(typeof(MaterialRequisition))]
        public async Task<IHttpActionResult> PostMaterialRequisition(MaterialRequisition materialRequisition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            materialRequisition.Creater = User.Identity.Name;
            materialRequisition.CreateTime = DateTime.Now;
            materialRequisitionAS.CreateMaterialRequisition(materialRequisition);

            try
            {
                await unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MaterialRequisitionExists(materialRequisition.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = materialRequisition.ID }, materialRequisition);
        }

        // DELETE: api/MaterialRequisitionApi/5
        [ResponseType(typeof(MaterialRequisition))]
        public async Task<IHttpActionResult> DeleteMaterialRequisition(Guid id)
        {
            //MaterialRequisition materialRequisition = await materialRequisitionAS.GetMaterialRequisitionAsync(id);
            //if (materialRequisition == null)
            //{
            //    return NotFound();
            //}
            materialRequisitionAS.DeleteMaterialRequisition(id);
            //db.MaterialRequisitions.Remove(materialRequisition);
            await unitOfWork.SaveChangesAsync();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MaterialRequisitionExists(Guid id)
        {
            return unitOfWork.MaterialRequisitions.Count(e => e.ID == id) > 0;
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult Submit(Guid id, MaterialRequisition materialRequisition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (materialRequisition != null)
            {
                materialRequisitionAS.UpdateMaterialRequisition(materialRequisition.ID, materialRequisition);
            }

            materialRequisitionAS.SubmitMaterialRequisition(id, User.Identity.Name);

            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialRequisitionExists(id))
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
    }
}