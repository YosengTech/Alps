using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Alps.Domain;
namespace Alps.Web.Controllers
{
    public class HomeController : Controller
    {
        Alps.Domain.AlpsContext db = new Domain.AlpsContext();
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult GetDashboard()
        {


            return Json(new
            {
                productCount = db.Products.Count(),
                skuCount = db.ProductSkus.Count(),
                catagoryCount = db.Catagories.Count(),
                tradeAccountCount = db.TradeAccounts.Count(),
                purchaseOrderCount = db.PurchaseOrders.Count(),
                warehouseVoucherCount = db.WarehouseVouchers.Count(),
                deliveryVoucherCount =  db.DeliveryVouchers.Count(),
                saleOrderCount = db.SaleOrders.Count()
            },JsonRequestBehavior.AllowGet);

        }

        //public ActionResult Dashboard()
        //{
        //    return View();
        //}
        //public ActionResult Catagories()
        //{
        //    return View();
        //}
        //public ActionResult Test()
        //{
        //    return View();
        //}
        //public ActionResult Catagory()
        //{
        //    return View();
        //}
    }
}
