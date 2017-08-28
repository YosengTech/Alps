using Alps.Domain;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Buffers;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Alps.Web.Admin.Models;

namespace Alps.Web.Admin
{
  public class Startup
  {
    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
          .AddEnvironmentVariables();
      
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // Add framework services.
      services.AddMvc().AddJsonOptions(option =>
      {
        option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        option.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
      });
      AlpsContext.Initial(AlpsContext.InitialMode.DropIfModelChanges);
      services.AddScoped<AlpsContext>(p => new AlpsContext(Configuration["ConnectionStrings:AlpsContext"]));

        services.AddDbContext<AlpsWebAdminContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("AlpsWebAdminContext")));

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
      loggerFactory.AddConsole(Configuration.GetSection("Logging"));
      loggerFactory.AddDebug();
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        
        app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
        {
          HotModuleReplacement = true
        });
      }
      else
      {
        
        app.UseExceptionHandler("/Home/Error");
      }
      
      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseMvc(routes =>
      {
        routes.MapRoute(
                        name: "default",
                        template: "api/{controller}/{action}/{id?}",
                        defaults: new { Controllers = "Home", action = "Index" });
        //routes.MapSpaFallbackRoute(
        //    name: "spa-fallback",
        //    defaults: new { controller = "Home", action = "Index" });
        
      });
      //app.UseStatusCodePagesWithRedirects("/");
      //app.MapWhen(context =>
      //!context.Request.Path.Value.Contains("/api/")
      //      !(context.Request.Path.Value.Length > 4 && context.Request.Path.Value.Substring(0, 5).ToLower() == "/api/") && !Path.HasExtension(context.Request.Path.Value),
      //            branch =>
      //            {
      //              branch.Use((context, next) =>
      //                    {
                            
      //                      //context.Response.Redirect("/index.html");
      //                      context.Request.Path = new PathString("/index.html");
      //                      return next();
      //                    });
      //              branch.UseStaticFiles();
      //            });
    }

  }
}
