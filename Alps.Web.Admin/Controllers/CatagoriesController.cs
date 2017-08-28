using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Alps.Domain;
using Alps.Web.Admin.Model;

namespace Alps.Web.Admin.Controllers
{
  [Produces("application/json")]
  [Route("api/Catagories")]
  public class CatagoriesController : Controller
  {
    private readonly AlpsContext _context;
    public CatagoriesController(AlpsContext context)
    {
      this._context = context;
    }
    // GET: api/Catagories
    [HttpGet]
    public IEnumerable<string> Get()
    {
      return new string[] { "value1", "value2" };
    }
    public class CatagoryPathDto
    {
      public Guid ID { get; set; }
      public string Name { get; set; }
      public Guid? ParentID { get; set; }
    }
    private IEnumerable<CatagoryPathDto> GetCatagoryPathByID(Guid? id)
    {
      var query = from c in this._context.Catagories
                  where c.ID == id
                  select new CatagoryPathDto { ID = c.ID, Name = c.Name, ParentID = c.ParentID };
      return
         query.ToList().SelectMany(p => GetCatagoryPathByID(p.ParentID)).Concat(query.ToList());

      //return query.ToList().Concat(query.ToList().SelectMany(t => GetCatagoryPathByID(t.ParentID)));

      // return this._context.Catagories.
    }
    [Route("getListByParentID/{id:guid?}")]
    [HttpGet]
    public ActionResult GetListByParentID(Guid? id)
    {
      return Ok(
        new
        {
          Path = GetCatagoryPathByID(id),
          data = this._context.Catagories.Where(p => p.ParentID == id).Select(p => new CatagoryListDto { Name = p.Name, ID = p.ID }
          )
        });
    }
    // GET: api/Catagories/5
    [HttpGet("{id}", Name = "GetCatagory")]
    public string Get(int id)
    {
      return "value";
    }

    // POST: api/Catagories
    [HttpPost]
    public void Post([FromBody]string value)
    {
    }

    // PUT: api/Catagories/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE: api/ApiWithActions/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
