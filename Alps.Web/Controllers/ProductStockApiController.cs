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
using Alps.Web.Models.ProductMgr;
using Alps.Domain;
using Alps.Web.Infrastructure;
namespace Alps.Web.Controllers
{
    public class ProductStockApiController : ApiController
    {
        private AlpsContext db = new AlpsContext();

        // GET: api/ProductStockApi
        public IHttpActionResult GetProductStocks(int pageIndex = 1,int pageSize=10)
        {
            
            var q = from p in db.ProductSkus
                    from ps in db.ProductStocks
                    from po in db.Positions
                    from t in db.Departments
                    where p.ID==ps.SkuID && ps.DepartmentID==t.ID && ps.PositionID==po.ID
                    orderby p.Name
                    select new ProductStockListModel { ProductName = p.Name, ID = ps.ID, OwnerName = t.Name, PositionName = po.Name, ProductNumber = ps.ProductNumber, Quantity = ps.Quantity, Weight = ps.Weight };
            var totalCount = q.Count();
            var result = q.Skip((pageIndex - 1) * pageSize).Take(pageSize);
            return Ok(new {data=result,totalcount=totalCount});
        }

        // GET: api/ProductStockApi/5
        [ResponseType(typeof(ProductStock))]
        public IHttpActionResult GetProductStock(Guid id)
        {
            ProductStock productStock = db.ProductStocks.Find(id);
            if (productStock == null)
            {
                return NotFound();
            }

            return Ok(productStock);
        }

        // PUT: api/ProductStockApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProductStock(Guid id, ProductStock productStock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productStock.ID)
            {
                return BadRequest();
            }

            db.Entry(productStock).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductStockExists(id))
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

        // POST: api/ProductStockApi
        [ResponseType(typeof(ProductStock))]
        public IHttpActionResult PostProductStock(ProductStock productStock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductStocks.Add(productStock);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ProductStockExists(productStock.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = productStock.ID }, productStock);
        }

        // DELETE: api/ProductStockApi/5
        [ResponseType(typeof(ProductStock))]
        public IHttpActionResult DeleteProductStock(Guid id)
        {
            ProductStock productStock = db.ProductStocks.Find(id);
            if (productStock == null)
            {
                return NotFound();
            }

            db.ProductStocks.Remove(productStock);
            db.SaveChanges();

            return Ok(productStock);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductStockExists(Guid id)
        {
            return db.ProductStocks.Count(e => e.ID == id) > 0;
        }
    }
}