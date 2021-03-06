﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using Alps.Domain.ProductMgr;
using Alps.Web.Admin.Models;
using Alps.Domain;
using System.Data.Entity.Infrastructure;
using Alps.Web.Admin.Model;
namespace Alps.Web.Admin.Controllers
{
  [Produces("application/json")]
  [Route("api/ProductSkus")]
  public class ProductSkusController : Controller
  {
    private readonly AlpsContext _context;

    public ProductSkusController(AlpsContext context)
    {
      _context = context;
    }

    [HttpGet("GetListByProduct/{id}")]
    public ActionResult GetProductSkuByProduct(Guid id)
    {
      return Ok(_context.ProductSkus.Where(p => p.ProductID == id));
    }

    // GET: api/ProductSkus
    [HttpGet]
    public IEnumerable<ProductSku> GetProductSku()
    {
      return _context.ProductSkus;
    }

    // GET: api/ProductSkus/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductSku([FromRoute] Guid id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var productSku = await _context.ProductSkus.SingleOrDefaultAsync(m => m.ID == id);

      if (productSku == null)
      {
        return NotFound();
      }

      return Ok(new ProductskuEditDto
      {
        Name = productSku.Name,
        ID = productSku.ID,
        ProductID = productSku.ProductID,
        Price = productSku.Price,
        AuxiliaryQuantity = productSku.StockQuantity,
        Quantity = productSku.StockQuantity,
        Description = productSku.Description
      });
    }

    // PUT: api/ProductSkus/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProductSku([FromRoute] Guid id, [FromBody] ProductskuEditDto dto)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != dto.ID)
      {
        return BadRequest();
      }
      var productsku = _context.ProductSkus.Find(id);
      if (productsku==null)
        return BadRequest();
      productsku.Name = dto.Name;
      productsku.Price = dto.Price;
      productsku.StockQuantity = dto.Quantity;
      productsku.Description = dto.Description;
      productsku.ProductID = dto.ProductID;
      

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ProductSkuExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/ProductSkus
    [HttpPost]
    public async Task<IActionResult> PostProductSku([FromBody]ProductskuEditDto dto)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var productSku = ProductSku.Create(dto.ProductID, dto.Name,Convert.ToInt16(dto.Quantity),  PricingMethod.PricingByWeight, dto.Price);
      _context.ProductSkus.Add(productSku);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetProductSku", new { id = productSku.ID }, productSku);
    }

    // DELETE: api/ProductSkus/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductSku([FromRoute] Guid id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var productSku = await _context.ProductSkus.SingleOrDefaultAsync(m => m.ID == id);
      if (productSku == null)
      {
        return NotFound();
      }

      _context.ProductSkus.Remove(productSku);
      await _context.SaveChangesAsync();

      return Ok(productSku);
    }

    private bool ProductSkuExists(Guid id)
    {
      return _context.ProductSkus.Any(e => e.ID == id);
    }
  }
}