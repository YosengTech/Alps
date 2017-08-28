using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Alps.Domain;
using Alps.Web.Admin.Model;
using Alps.Domain.AccountingMgr;

namespace Alps.Web.Admin.Controllers
{
  [Produces("application/json")]
  [Route("api/Query")]
  public class QueryController : Controller
  {
    private readonly AlpsContext _context;
    public QueryController(AlpsContext context)
    {
      _context = context;
    }
    [HttpGet("InitDatabase")]
    public IActionResult InitDatabase()
    {
      Alps.Domain.AlpsContext.Initial(AlpsContext.InitialMode.DropAlways);
      _context.Database.Initialize(true);
      return Ok();
    }
        [HttpGet("TestOptions")]
        public IActionResult TestOptions()
        {
            return Ok( new { ValueType=1,Name= "Winsan"});
        }
        [HttpGet("SupplierOptions")]
    public IActionResult SupplierOptions()
    {
      return Ok(_context.Suppliers.Select(p => new AlpsSelectorItemDto { Value = p.ID, DisplayValue = p.Name }));
    }
    [HttpGet("ProductOptions")]
    public IActionResult ProductOptions()
    {
      return Ok(_context.Products.Select(p => new AlpsSelectorItemDto { Value = p.ID, DisplayValue = p.Name }));
    }
    [HttpGet("ProductSkuOptions")]
    public IActionResult ProductSkuOptions()
    {
      var query = from p in _context.Products
                  select new {
                    Value = p.ID,
                    DisplayValue = p.Name,
                    Children = (from sku in _context.ProductSkus
                                where sku.ProductID == p.ID
                                select new { Value = sku.ID, DisplayValue = sku.FullName })
                  };
      return Ok(query);
    }
    [HttpGet("DepartmentOptions")]
    public IActionResult DepartmentOptions()
    {
      return Ok(_context.Departments.Select(p => new AlpsSelectorItemDto { Value = p.ID, DisplayValue = p.Name }));
    }
    [HttpGet("PositionOptions")]
    public IActionResult PositionOptions()
    {
      return Ok(_context.Positions.Select(p => new AlpsSelectorItemDto { Value = p.ID, DisplayValue = p.Name }));
    }
    [HttpGet("TradeAccountOptions")]
    public IActionResult TradeAccountOptions([FromBody]int id)
    {
      //Where(p=>p.Types.Contains(type))
      return Ok(_context.TradeAccounts.Select(p => new AlpsSelectorItemDto { Value = p.ID, DisplayValue = p.Name }));
    }

  }
}