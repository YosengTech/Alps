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
    public class MaterialReceiptApiController : ApiController
    {
        private AlpsContext unitOfWork =null;
        private MaterialReceiptAppService materialReceiptAS = null;
        public MaterialReceiptApiController()
        {
            unitOfWork = new AlpsContext();
            materialReceiptAS = new MaterialReceiptAppService(unitOfWork);
        }
        // GET: api/MaterialReceiptApi
        public IQueryable<MaterialReceipt> GetMaterialReceipts()
        {
            return materialReceiptAS.GetMaterialReceipts();
        }

        // GET: api/MaterialReceiptApi/5
        [ResponseType(typeof(MaterialReceipt))]
        public async Task<IHttpActionResult> GetMaterialReceipt(Guid id)
        {
            MaterialReceipt materialReceipt = await materialReceiptAS.GetMaterialReceiptAsync(id);
            if (materialReceipt == null)
            {
                return NotFound();
            }

            return Ok(materialReceipt);
        }

        // PUT: api/MaterialReceiptApi/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMaterialReceipt(Guid id, MaterialReceipt materialReceipt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != materialReceipt.ID)
            {
                return BadRequest();
            }

            materialReceiptAS.UpdateMaterialReceipt(id, materialReceipt);

            try
            {
                await unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialReceiptExists(id))
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

        // POST: api/MaterialReceiptApi
        [ResponseType(typeof(MaterialReceipt))]
        public async Task<IHttpActionResult> PostMaterialReceipt(MaterialReceipt materialReceipt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            materialReceipt.Creater = User.Identity.Name;
            materialReceipt.CreateTime = DateTime.Now;
            materialReceiptAS.CreateMaterialReceipt(materialReceipt);

            try
            {
                await unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MaterialReceiptExists(materialReceipt.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = materialReceipt.ID }, materialReceipt);
        }

        // DELETE: api/MaterialReceiptApi/5
        [ResponseType(typeof(MaterialReceipt))]
        public async Task<IHttpActionResult> DeleteMaterialReceipt(Guid id)
        {
            //MaterialReceipt materialReceipt = await materialReceiptAS.GetMaterialReceiptAsync(id);
            //if (materialReceipt == null)
            //{
            //    return NotFound();
            //}
            materialReceiptAS.DeleteMaterialReceipt(id);
            //db.MaterialReceipts.Remove(materialReceipt);
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

        private bool MaterialReceiptExists(Guid id)
        {
            return unitOfWork.MaterialReceipts.Count(e => e.ID == id) > 0;
        }
    }
}