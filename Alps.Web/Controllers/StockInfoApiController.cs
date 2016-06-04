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
using Alps.Web.Models;
using Alps.Domain;

namespace Alps.Web.Controllers
{
    public class StockInfoApiController : ApiController
    {
        private AlpsContext db = new AlpsContext();

        // GET: api/StockInfoApi
        public IQueryable<StockInfoViewModel> GetStockInfos()
        {
            
            var q=from c in db.ProductStocks
                  from m in db.Products
                  from p in db.Positions
                  from t in db.TradeAccounts
                  where c.SkuID==m.ID && c.PositionID==p.ID && c.OwnerID==t.ID
                  select new StockInfoViewModel{ID=c.ID,MaterialName=m.FullName,PositionName=p.Name,Weight=c.Weight,Quantity=c.Quantity,Owner=t.Name,ProductNumber=c.ProductNumber};
            return q;
        }

        // GET: api/StockInfoApi/5
        //[ResponseType(typeof(Alps.Domain.ProductMgr.Product))]
        public IQueryable<StockInfoViewModel> GetStockInfoViewModel(Guid id)
        {
            var q = from c in db.ProductStocks
                    from m in db.Products
                    from p in db.Positions
                    from t in db.TradeAccounts
                    from s in db.ProductCatagorySettings
                    where c.SkuID == m.ID && c.PositionID == p.ID && c.OwnerID == t.ID && m.ProductCatagorySettings.Contains(s) && s.CatagoryID==id
                    select new StockInfoViewModel { ID = c.ID, MaterialName = m.FullName, PositionName = p.Name, Weight = c.Weight, Quantity = c.Quantity, Owner = t.Name, ProductNumber = c.ProductNumber };
            return q;
            //Alps.Domain.ProductMgr.Product stockInfoViewModel = db.Products.FirstOrDefault(p=>p.ProductNumber==id);
            //if (stockInfoViewModel == null)
            //{
            //    return NotFound();
            //}

            //return Ok(stockInfoViewModel);
        }

        //// PUT: api/StockInfoApi/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutStockInfoViewModel(Guid id, StockInfoViewModel stockInfoViewModel)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != stockInfoViewModel.ID)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(stockInfoViewModel).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!StockInfoViewModelExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //// POST: api/StockInfoApi
        //[ResponseType(typeof(StockInfoViewModel))]
        //public IHttpActionResult PostStockInfoViewModel(StockInfoViewModel stockInfoViewModel)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.StockInfoViewModels.Add(stockInfoViewModel);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (StockInfoViewModelExists(stockInfoViewModel.ID))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtRoute("DefaultApi", new { id = stockInfoViewModel.ID }, stockInfoViewModel);
        //}

        //// DELETE: api/StockInfoApi/5
        //[ResponseType(typeof(StockInfoViewModel))]
        //public IHttpActionResult DeleteStockInfoViewModel(Guid id)
        //{
        //    StockInfoViewModel stockInfoViewModel = db.StockInfoViewModels.Find(id);
        //    if (stockInfoViewModel == null)
        //    {
        //        return NotFound();
        //    }

        //    db.StockInfoViewModels.Remove(stockInfoViewModel);
        //    db.SaveChanges();

        //    return Ok(stockInfoViewModel);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        //private bool StockInfoViewModelExists(Guid id)
        //{
        //    return db.StockInfoViewModels.Count(e => e.ID == id) > 0;
        //}
    }
}