using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Alps.Domain.ProductMgr;
using Alps.Web.Models;
using Alps.Domain;
using Alps.Web.Extensions;

namespace Alps.Web.Controllers
{
    public class SelectListController : Controller
    {
        private AlpsContext db = new AlpsContext();

        // GET: SelectList
        public JsonResult GetCatagory()
        {
            return Json(db.Catagories.Select(p => new { ID = p.ID, Name = p.FullName }), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetProduct()
        {
            return Json(db.Products.Select(p => new { ID = p.ID, Name = p.FullName, PricingMethod = p.PricingMethod }), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetProductSku()
        {
            return Json(db.ProductSkus.Select(p => new { SkuID = p.ID, Name = p.Name, PricingMethod = p.PricingMethod }), JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetProductSkuWithCatagory()
        {

            var skuQuery = from s in db.ProductSkus
                           from p in db.Products
                           where s.ProductID == p.ID
                           group new { p, s } by p into g
                           select new { ID = g.Key.ID,CatagoryID=g.Key.CatagoryID, Name = g.Key.Name, Items = g.Select(l => new { ID = l.s.ID, Name =/*g.Key.Name+"-"+*/ l.s.FullName }) };
            var catagoryQuery = from c in db.Catagories
                                //from cs in db.ProductCatagorySettings
                                from sku in skuQuery
                                where  c.ID == sku.CatagoryID
                                group new {  c, sku } by c into cp
                                select new { ID = cp.Key.ID, Name = cp.Key.Name, Items = cp.Select(l => new { ID = l.sku.ID, Name = l.sku.Name, Items = l.sku.Items }) };
            return Json(catagoryQuery, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPosition()
        {
            return Json(db.Positions.Select(p => new { ID = p.ID, Name = p.Name }), JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDepartment()
        {
            return Json(db.Departments.Select(p => new { ID = p.ID, Name = p.Name }), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCustomer()
        {
            return Json(db.Customers.Select(p => new { ID = p.ID, Name = p.Name }), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetTradeAccount()
        {
            return Json(db.TradeAccounts.Select(p => new { ID = p.ID, Name = p.Name }), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSupplier()
        {
            return Json(db.Suppliers.Select(p => new { ID = p.ID, Name = p.Name }), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUnit()
        {
            return Json(db.Units.Select(p => new { ID = p.ID, Name = p.Name }), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPricingMethod()
        {
            return Json(EnumHelper.GetEnumSelectList(typeof(PricingMethod)), JsonRequestBehavior.AllowGet);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
