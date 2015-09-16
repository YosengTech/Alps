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
using Alps.Domain.AccountingMgr;
using Alps.Web.Models;
using Alps.Domain;
namespace Alps.Web.Controllers
{
    public class TradeAccountApiController : ApiController
    {
        private AlpsContext db = new AlpsContext();

        // GET: api/TradeAccountApi
        public IQueryable<TradeAccount> GetTradeAccounts()
        {
            return db.TradeAccounts;
        }

        // GET: api/TradeAccountApi/5
        [ResponseType(typeof(TradeAccount))]
        public IHttpActionResult GetTradeAccount(Guid id)
        {
            TradeAccount tradeAccount = db.TradeAccounts.Find(id);
            if (tradeAccount == null)
            {
                return NotFound();
            }

            return Ok(tradeAccount);
        }

        // PUT: api/TradeAccountApi/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTradeAccount(Guid id, TradeAccount tradeAccount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tradeAccount.ID)
            {
                return BadRequest();
            }

            db.Entry(tradeAccount).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TradeAccountExists(id))
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

        // POST: api/TradeAccountApi
        [ResponseType(typeof(TradeAccount))]
        public IHttpActionResult PostTradeAccount(TradeAccount tradeAccount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TradeAccounts.Add(tradeAccount);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TradeAccountExists(tradeAccount.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tradeAccount.ID }, tradeAccount);
        }

        // DELETE: api/TradeAccountApi/5
        [ResponseType(typeof(TradeAccount))]
        public IHttpActionResult DeleteTradeAccount(Guid id)
        {
            TradeAccount tradeAccount = db.TradeAccounts.Find(id);
            if (tradeAccount == null)
            {
                return NotFound();
            }

            db.TradeAccounts.Remove(tradeAccount);
            db.SaveChanges();

            return Ok(tradeAccount);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TradeAccountExists(Guid id)
        {
            return db.TradeAccounts.Count(e => e.ID == id) > 0;
        }
    }
}