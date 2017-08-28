using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Alps.Web.Extensions
{
    public class AlpsErrorHandleHelper
    {
        public static HttpResponseException AlpsErrorResponse(string msg)
        {
            var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent(msg)
            };
            
            return new HttpResponseException(resp);
        }
        
    }
}