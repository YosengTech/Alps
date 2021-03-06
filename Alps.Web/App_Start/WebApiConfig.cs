﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Dispatcher;
using System.Reflection;
using System.Web.Http.OData.Extensions;

namespace Alps.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API 配置和服务
            // 将 Web API 配置为仅使用不记名令牌身份验证。
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));


            var suffix = typeof(DefaultHttpControllerSelector).GetField("ControllerSuffix", BindingFlags.Static | BindingFlags.Public);
            if (suffix != null) suffix.SetValue(null, "ApiController");
            // Web API 路由
            config.MapHttpAttributeRoutes();
            //config.Routes.MapHttpRoute(
            //    name:"TemplateApi",
            //    routeTemplate:"tapi/{controller}/{templateName}",
            //    defaults: new {templateName="Index",action="Template" }
            //    );
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
                name: "DefaultApiAction_Obsolete",
                routeTemplate: "api/{controller}/{id}/{action}"
            );
            config.Routes.MapHttpRoute(
                name: "DefaultApiAction",
                routeTemplate: "action/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.AddODataQueryFilter();
            //config.EnableQuerySupport();

        }
    }
}
