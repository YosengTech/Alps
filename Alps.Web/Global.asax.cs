using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Alps.Web
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //Alps.Domain.AlpsContext.Initial();

            GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);
            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;
            json.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.IsoDateTimeConverter() { DateTimeStyles = System.Globalization.DateTimeStyles.AdjustToUniversal });
            json.SerializerSettings.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat;
            json.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Local;
        }
        protected void Application_EndRequest()
        {
            if (Context.Response.StatusCode == 404)
            {
                if ((!Request.RawUrl.Contains("style")) && (!Request.RawUrl.Contains("images")))
                {
                    
                    if (Response.StatusCode == 404)
                    {
                       // if (Context.Request.Headers["X-Requested-With"] != "XMLHttpRequest")

//                        throw new HttpResponseException(new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.NotFound) {Content=new System.Net.Http.StringContent("找不到资源")}); 
                          //Response.Redirect("/");
                    }
                }
            }
        }
    }
}
