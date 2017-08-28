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
using System.Web.Http.OData;
using System.Web.Http.OData.Query;
using System.Web.Http.OData.Extensions;
namespace Alps.Web.Controllers
{
    public class ProductSkuApiController : ApiController
    {
        private AlpsContext db = new AlpsContext();

        public PageResult<ProductSku> GetProductSKUs(ODataQueryOptions<ProductSku> options)
        {
            
            IQueryable items=options.ApplyTo(db.ProductSkus.ToList().AsQueryable());
            Uri nextLink = Request.ODataProperties().NextLink;
            long? count=Request.ODataProperties().TotalCount;
            return new PageResult<ProductSku>(items as IEnumerable<ProductSku>,nextLink,count);
        }

        // GET: api/ProductSKUApi/5
        [ResponseType(typeof(ProductSku))]
        public async Task<IHttpActionResult> GetProductSKU(Guid id)
        {
            ProductSku productSKU = await db.ProductSkus.FindAsync(id);
            if (productSKU == null)
            {
                return NotFound();
            }

            return Ok(productSKU);
        }

        // PUT: api/ProductSKUApi/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProductSKU(Guid id, ProductSku productSKU)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productSKU.ID)
            {
                return BadRequest();
            }

            db.Entry(productSKU).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductSKUExists(id))
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

        // POST: api/ProductSKUApi
        [ResponseType(typeof(ProductSku))]
        public async Task<IHttpActionResult> PostProductSKU(ProductSku productSKU)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            productSKU.CreatedTime = DateTime.Now;
            productSKU.ModifiedTime = DateTime.Now;
            db.ProductSkus.Add(productSKU);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductSKUExists(productSKU.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = productSKU.ID }, productSKU);
        }

        // DELETE: api/ProductSKUApi/5
        [ResponseType(typeof(ProductSku))]
        public async Task<IHttpActionResult> DeleteProductSKU(Guid id)
        {
            ProductSku productSKU = await db.ProductSkus.FindAsync(id);
            if (productSKU == null)
            {
                return NotFound();
            }

            db.ProductSkus.Remove(productSKU);
            await db.SaveChangesAsync();

            return Ok(productSKU);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductSKUExists(Guid id)
        {
            return db.ProductSkus.Count(e => e.ID == id) > 0;
        }
    }
}