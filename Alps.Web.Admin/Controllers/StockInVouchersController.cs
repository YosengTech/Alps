using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Alps.Domain;
using Alps.Web.Admin.Model;
using Alps.Web.Admin.Extensions;
using Alps.Domain.StockMgr;

namespace Alps.Web.Admin.Controllers
{
  [Produces("application/json")]
  [Route("api/StockInVouchers")]
  public class StockInVouchersController : Controller
  {
    private readonly AlpsContext _context;
    public StockInVouchersController(AlpsContext context)
    {
      this._context = context;
      this._context.Database.Log = (s) => Console.WriteLine(s);
    }
    // GET: api/StockInVouchers
    [HttpGet]
    public IEnumerable<StockInVoucherListDto> GetStockInVoucherListDto()
    {
      var result = _context.StockInVouchers.Select(p =>
       new StockInVoucherListDto
       {
         ID = p.ID,
         CreateTime = p.CreateTime,
         Source = p.Source.Name,
         Department = p.Department.Name,
         TotalAuxiliaryQuantity = p.TotalAuxiliaryQuantity,
         TotalQuantity = p.TotalQuantity,
         Confirmer = p.Confirmer,
         ConfirmTime = p.CreateTime,
         TotalAmount=p.TotalAmount,
         Status = p.Status.ToString()
       }).ToList();

      foreach (var d in result)
      {
        d.Status = EnumHelper.GetDisplayValue(typeof(StockInVoucherStatus), d.Status);
      }
      return result;
    }
    private StockInVoucherEditDto GetStockInVoucherEditDto(Guid id)
    {
      return (from k in _context.StockInVouchers
              where k.ID == id
              select new StockInVoucherEditDto
              {
                DepartmentID = k.DepartmentID,
                ID = k.ID,
                SourceID = k.SourceID,
                Status = (int)k.Status,
                Items = from i in _context.StockInVoucherItems
                        where i.StockInVoucherID == k.ID
                        select new StockInVoucherItemDto
                        {
                          ID = i.ID,
                          ProductSkuID = i.ProductSkuID,
                          SerialNumber = i.SerialNumber,
                          PositionID = i.PositionID,
                          AuxiliaryQuantity = i.AuxiliaryQuantity,
                          Quantity = i.Quantity,
                          Price = i.Price
                        }
              }).FirstOrDefault();
    }
    // GET: api/StockInVouchers/5
    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      return Ok(GetStockInVoucherEditDto(id));
    }

    // POST: api/StockInVouchers
    [HttpPost]
    public IActionResult Post([FromBody]StockInVoucherEditDto dto)
    {
      if (!ModelState.IsValid)
        return BadRequest();
      var voucher = StockInVoucher.Create(dto.SourceID, dto.DepartmentID, this.User.Identity.Name);
      voucher.UpdateItems(dto.Items);
      _context.StockInVouchers.Add(voucher);
      _context.SaveChanges();
      return Ok(GetStockInVoucherEditDto(voucher.ID));
    }

    // PUT: api/StockInVouchers/5
    [HttpPut("{id}")]
    public IActionResult Put(Guid id, [FromBody]StockInVoucherEditDto dto)
    {
      _context.Database.Log = (s) => Console.WriteLine(s);
      if (!ModelState.IsValid || id != dto.ID)
      {
        return BadRequest();
      }

      var voucher = _context.StockInVouchers.Find(id);
      voucher.DepartmentID = dto.DepartmentID;
      voucher.SourceID = dto.SourceID;
      voucher.UpdateItems(dto.Items);
      _context.SaveChanges();
      return Ok(GetStockInVoucherEditDto(id));
    }

    // DELETE: api/ApiWithActions/5
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
      if (!ModelState.IsValid)
        return BadRequest();
      var voucher = _context.StockInVouchers.Find(id);
      if (voucher == null)
        return BadRequest();
      _context.StockInVouchers.Remove(voucher);
      return Ok(new { ActionDone = true });
    }
    [HttpPost("Submit/{id}")]
    public IActionResult Submit(Guid id)
    {
      return Ok(new { ActionDone = true });
    }
  }
}
