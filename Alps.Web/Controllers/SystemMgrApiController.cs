using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Alps.Domain;
namespace Alps.Web.Controllers
{
    public class SystemMgrApiController : ApiController
    {
        AlpsContext db = new AlpsContext();
        public IHttpActionResult InitialDatabase()
        {
            try
            {
                Alps.Domain.AlpsContext.Initial();
                db.Database.Initialize(true);
                return Ok();
            }
            catch(Exception e)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.InternalServerError) { Content =new StringContent( e.Message) });
            }
            

        }
    }
}
