using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Alps.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                name: "Template",
                url: "template/{catagory}/{templateName}",
                defaults: new { controller = "Template", action = "GetTemplate", catagory = "Home", templateName = "Index" }

);
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        //    routes.MapRoute(
        //name: "404-PageNotFound",
        //        // This will handle any non-existing urls
        //url: "{*url}",
        //        // "Shared" is the name of your error controller, and "Error" is the action/page
        //        // that handles all your custom errors
        //defaults: new { controller = "Home", action = "Index" }
    //);

            //routes.Add(new NotFoundRoute());

        }
        public class NotFoundRoute : RouteBase
        {

            public override RouteData GetRouteData(HttpContextBase httpContext)
            {
                RouteData rd = new RouteData(this, new MvcRouteHandler());
                rd.Values.Add("controller", "Home");
                rd.Values.Add("action", "Index");
                return rd;
            }
            public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
            {
                return null;
            }

        }
    }
}
