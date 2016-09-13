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
using Alps.Service.WarehouseMS;
namespace Alps.Web.Controllers
{
    public class WarehouseVoucherApiController : ApiController
    {
        private AlpsContext unitOfWork = null;
        private WarehouseVoucherAppService warehouseVoucherAS = null;
        public WarehouseVoucherApiController()
        {
            unitOfWork = new AlpsContext();
            warehouseVoucherAS = new WarehouseVoucherAppService(unitOfWork);
        }
        // GET: api/WarehouseVoucherApi
        public IQueryable<WarehouseVoucher> GetWarehouseVouchers()
        {
            return warehouseVoucherAS.GetWarehouseVouchers();
        }

        // GET: api/WarehouseVoucherApi/5
        [ResponseType(typeof(WarehouseVoucher))]
        public IHttpActionResult GetWarehouseVoucher(Guid id)
        {

            WarehouseVoucher warehouseVoucher = warehouseVoucherAS.GetWarehouseVoucher(id);
            if (warehouseVoucher == null)
            {
                return NotFound();
            }

            return Ok(warehouseVoucher);
        }

        // PUT: api/WarehouseVoucherApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutWarehouseVoucher(Guid id, WarehouseVoucher warehouseVoucher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != warehouseVoucher.ID)
            {
                return BadRequest();
            }
            SaveWarehouserVoucher(id, warehouseVoucher);

            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarehouseVoucherExists(id))
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
        [NonAction]
        public void SaveWarehouserVoucher(Guid id, WarehouseVoucher warehouseVoucher)
        {
            warehouseVoucherAS.UpdateWarehouseVoucher(id, warehouseVoucher);
        }
        [ResponseType(typeof(void))]
        public IHttpActionResult Submit(Guid id, WarehouseVoucher warehouseVoucher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (warehouseVoucher != null)
            {
                SaveWarehouserVoucher(id, warehouseVoucher);
            }
            
            warehouseVoucherAS.SubmitWarehouseVoucher(id,User.Identity.Name);

            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarehouseVoucherExists(id))
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
        // POST: api/WarehouseVoucherApi
        [ResponseType(typeof(WarehouseVoucher))]
        public IHttpActionResult PostWarehouseVoucher(WarehouseVoucher warehouseVoucher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            warehouseVoucher.Creater = this.User.Identity.Name;
            warehouseVoucher.CreateTime = DateTime.Now;
            warehouseVoucherAS.CreateWarehouseVoucher(warehouseVoucher);
            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (WarehouseVoucherExists(warehouseVoucher.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = warehouseVoucher.ID }, warehouseVoucher);
        }

        // DELETE: api/WarehouseVoucherApi/5
        [ResponseType(typeof(WarehouseVoucher))]
        public IHttpActionResult DeleteWarehouseVoucher(Guid id)
        {
            warehouseVoucherAS.DeleteWarehouseVoucher(id);
            unitOfWork.SaveChanges();

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

        private bool WarehouseVoucherExists(Guid id)
        {
            return unitOfWork.WarehouseVouchers.Count(e => e.ID == id) > 0;
        }
       
    }
}