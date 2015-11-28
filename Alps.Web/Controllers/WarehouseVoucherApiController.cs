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
    public class WarehouseVoucherApiController : ApiController
    {
        private AlpsContext db = new AlpsContext();

        // GET: api/WarehouseVoucherApi
        public IQueryable<WarehouseVoucher> GetWarehouseVouchers()
        {
            //IList<WarehouseVoucher> list = db.WarehouseVouchers.ToList();
            //return list.AsQueryable();
            return db.WarehouseVouchers.ToList().AsQueryable();
        }

        // GET: api/WarehouseVoucherApi/5
        [ResponseType(typeof(WarehouseVoucher))]
        public IHttpActionResult GetWarehouseVoucher(Guid id)
        {
            WarehouseVoucher warehouseVoucher = db.WarehouseVouchers.Find(id);
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

            new Alps.Domain.Service.ProductMgrService(db).UpdateWarehouseVoucher(id, warehouseVoucher);


            //exitingWarehouseVoucher.UpdateItem(warehouseVoucher.Items.ToList());
            
            try
            {
                db.SaveChanges();
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
        [ResponseType(typeof(void))]
        public IHttpActionResult Submit(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exitingWarehouseVoucher = db.WarehouseVouchers.Find(id);
            Alps.Domain.Service.ProductMgrService pms = new Alps.Domain.Service.ProductMgrService(this.db);
            pms.SubmitVoucher(exitingWarehouseVoucher, "WinsanLee");
            //exitingWarehouseVoucher.Submit("LeeLee");
            //Alps.Domain.Service.StockService stockService = new Domain.Service.StockService(db);
            //stockService.UpdateStock(exitingWarehouseVoucher);
            try
            {
                db.SaveChanges();
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
            db.WarehouseVouchers.Add(warehouseVoucher);

            try
            {
                db.SaveChanges();
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
            WarehouseVoucher warehouseVoucher = db.WarehouseVouchers.Find(id);
            if (warehouseVoucher == null)
            {
                return NotFound();
            }

            db.WarehouseVouchers.Remove(warehouseVoucher);
            db.SaveChanges();

            return Ok(warehouseVoucher);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WarehouseVoucherExists(Guid id)
        {
            return db.WarehouseVouchers.Count(e => e.ID == id) > 0;
        }
        private void UpdateList(IList<EntityBase> orgList, IList<EntityBase> destList)
        {
            //var addedItem=destList.Where(p=>orgList.Any())
            //foreach(EntityBase item in destList)
            //{
            //    var orgItem=orgList.FirstOrDefault(p=>p.ID==item.ID);
            //    if(orgItem==null)
            //        orgList.Add(item);
            //    else
            //        orgItem=item;
            //}
        }
    }
}