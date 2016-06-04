using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Alps.Web.Models.ProductMgr;
using Alps.Domain.ProductMgr;
using Alps.Domain;
using AutoMapper;
using Alps.Web.Extensions;
namespace Alps.Web.Controllers
{
    public class ProductController : BaseController
    {
        private AlpsContext db = new AlpsContext();

        public ActionResult GetProductEditModel(Guid id)
        {
            var productEditModel = new ProductEditModel();
            productEditModel.PricingMethodSelectList = EnumHelper.GetEnumSelectList(typeof(PricingMethod));
            db.Products.Select(p => new Alps.Web.Infrastructure.AlpsSelectListItem<string> { Value = p.ID.ToString(), Text = p.Name });
            Product product = db.Products.Find(id);
            if (product == null)
                throw new DomainException("无此ID");
            AutoMapper.Mapper.Map<Product, ProductEditModel>(product,productEditModel);
            
            return Json(productEditModel,JsonRequestBehavior.AllowGet);
            //throw new
        
        }
        public ActionResult GetPricingMethodSelectList()
        {
            return Json(EnumHelper.GetEnumSelectList(typeof(PricingMethod)), JsonRequestBehavior.AllowGet);
        }
    }
}