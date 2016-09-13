using System.Web;
using System.Web.Mvc;
using Alps.Web.Extensions;
namespace Alps.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            //filters.Add(new CustomHandleErrorAttribute());
            filters.Add(new HandleErrorAttribute());
        }
    }
}
