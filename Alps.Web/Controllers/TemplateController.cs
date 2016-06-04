using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Alps.Web.Controllers
{
    public class TemplateController : Controller
    {

        public ActionResult GetTemplate(string catagory, string templateName)
        {
            if (catagory == "Home" && templateName == "Index")
                templateName = "Dashboard";
            string viewName = "/Views/" + catagory + "/" + templateName + ".cshtml";
            return PartialView(viewName);
        }
    }
}