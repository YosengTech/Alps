using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Alps.Web.Canteen.Model;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Alps.Web.Canteen.Controllers
{
  [Route("api/[controller]")]
  public class CanteenController : Controller
  {
    private readonly CanteenDbContext _context;
    public CanteenController(CanteenDbContext context)
    {
      this._context = context;
    }

    [HttpGet("getdinners")]
    public IEnumerable<Dinner> GetDinners()
    {
      return this._context.Dinners;
    }
    [HttpGet("getdiners")]
    [Authorize("Bearer", Roles = "admin")]
    public JsonResult GetDiners()
    {
      var query = from p in _context.Diners
                  orderby p.Name
                  select new { CardNumber = p.CardNumber, Name = p.Name, ID = p.ID, IDNumber = p.IDNumber == null || p.IDNumber == string.Empty ? "" : p.IDNumber.Substring( 12) };
 
      return Json(query);
    }
    [HttpGet("getbinddiners")]
    [Authorize("Bearer", Roles = "user,admin")]
    public JsonResult GetBindDiners()
    {
      var query = from b in _context.BindRecords
                  from d in _context.Diners
                  where b.DinerID == d.ID && b.CanteenUserID == GetUserID()
                  select new { id = b.ID, bindName = b.BindName, bindIDNumber = b.BindIDNumber, dinerName = d.CardNumber.Substring(4) };
      return Json(query);
    }
    [HttpGet("getbookablediners")]
    [Authorize("Bearer", Roles = "user,admin")]
    public JsonResult GetBookableDiners()
    {
      IQueryable query;
      if (User.IsInRole("admin"))
      {
        query = from d in _context.Diners
                select new { ID = d.ID, Name = d.Name };
      }
      else
        query = from b in _context.BindRecords
                from d in _context.Diners
                where b.DinerID == d.ID && b.CanteenUserID == GetUserID()
                select new { ID = d.ID, Name = d.Name };
      return Json(query);
    }
    [HttpGet("getbinddiner/{id}")]
    [Authorize("Bearer", Roles = "user,admin")]
    public JsonResult GetBindDiner(Guid id)
    {
      var query = (from b in _context.BindRecords
                   from d in _context.Diners
                   where b.DinerID == d.ID && b.CanteenUserID == GetUserID() && b.ID == id
                   select new { bindName = b.BindName, bindIDNumber = b.BindIDNumber, dinerName = d.CardNumber }).FirstOrDefault();

      return Json(query);
    }

    public class BindDinerDto
    {
      public string BindName { get; set; }
      public string BindIDNumber { get; set; }
      //public Guid ID { get; set; }
      //public Guid DinerID { get; set; }
    }
    [HttpPost("unbinddiner/{id}")]
    [Authorize("Bearer", Roles = "user,admin")]
    public bool UnbindDiner(Guid id)
    {
      var existRecord = _context.BindRecords.FirstOrDefault(p => p.ID == id && p.CanteenUserID == GetUserID());
      if (existRecord == null)
        return false;
      _context.BindRecords.Remove(existRecord);
      if (_context.SaveChanges() == 1)
      {
        return true;

      }
      else
        return false;

    }
    [HttpPost("binddiner")]
    [Authorize("Bearer", Roles = "user,admin")]
    public bool BindDiner([FromBody]BindDinerDto dto)
    {
      var existDiner = _context.Diners.FirstOrDefault(p => p.Name == dto.BindName && p.IDNumber.Substring(p.IDNumber.Length - 6) == dto.BindIDNumber);
      if (existDiner == null)
        return false;
      else
      {
        var newRecord = new BindRecord() { BindIDNumber = dto.BindIDNumber, BindName = dto.BindName, CanteenUserID = GetUserID(), DinerID = existDiner.ID };
        _context.BindRecords.Add(newRecord);
        if (_context.SaveChanges() == 1)
          return true;
        else
          return false;

      }
      //var existRecord = this._context.BindRecords.Find(dto.ID);
      //if (existRecord == null)
      //{
      //  var newRecord = new BindRecord() { BindIDNumber = dto.BindIDNumber, BindName = dto.BindName, CanteenUserID = GetUserID() };
      //  if (User.IsInRole("admin"))
      //    newRecord.DinerID = dto.DinerID;
      //  _context.BindRecords.Add(newRecord);
      //}
      //else
      //{
      //  existRecord.BindIDNumber = dto.BindIDNumber;
      //  existRecord.BindName = dto.BindName;
      //  if (User.IsInRole("admin"))
      //    existRecord.DinerID = dto.DinerID;
      //}
      //if (_context.SaveChanges() == 1)
      //  return true;
      //else
      //  return false;
    }

    public class BookActionDto
    {
      public Guid DinerID { get; set; }
      public Guid DinnerID { get; set; }
      public DateTime DinnerDate { get; set; }
      public bool UnBook { get; set; }
    }
    [HttpPost("book")]
    [Authorize("Bearer", Roles = "admin,canteen,user")]
    public bool Book([FromBody]BookActionDto dto)
    {
      var dinner = _context.Dinners.Find(dto.DinnerID);
      if (dinner == null)
        return false;
      if (dto.DinnerDate.Add(dinner.DinnerTime).AddHours(7) < DateTime.Now)
        return false;
      var diner = _context.Diners.Find(dto.DinerID);
      if (diner == null)
        return false;
      if (dto.UnBook)
      {
        BookRecord existRecord = _context.BookRecords.FirstOrDefault(p => p.DinerID == dto.DinerID && p.DinnerID == dto.DinnerID &&p.DinnerDate==dto.DinnerDate.AddHours(8));
        if (existRecord != null)
        {
          _context.BookRecords.Remove(existRecord);
        }
        else
          return false;
      }
      else
      {

        BookRecord bookRecord = BookRecord.CreateNewBookRecord(dto.DinerID, dto.DinnerID, dto.DinnerDate.ToLocalTime().Date, GetUserID());
        this._context.BookRecords.Add(bookRecord);
      }
      if (this._context.SaveChanges() == 1)
        return true;
      else
        return false;
    }
    // GET api/values/5
    [HttpGet("getbookrecord/{id}")]
    [Authorize("Bearer", Roles = "admin,canteen,user")]
    public IEnumerable<BookRecord> GetBookRecordByDinerID(Guid id)
    {
      return this._context.BookRecords.Where(p => p.DinerID == id).OrderBy(p => p.DinnerDate);

    }
    [HttpGet("getbookinfo")]
    public JsonResult GetBookInfo()
    {
      var date = new DateTime[10];
      date[0] = DateTime.Today;
      for (int i = 1; i < 10; i++)
      {
        date[i] = date[0].AddDays(i);
      }

      var dinners = _context.Dinners.ToList();
      var bookInfoQuery = from t in date
                          from d in dinners
                          select new { Date = t.Date, Name = d.Name, ID = d.ID } into trix
                          join b in _context.BookRecords on new { trix.Date, trix.ID } equals new { Date = b.DinnerDate, ID = b.DinnerID } into jrst
                          from j in jrst.DefaultIfEmpty()
                          group j by new { trix.Date, trix.Name } into g
                          select new { d = g.Key.Date, b = new { n = g.Key.Name, q = g.Count(p => p != null) } } into k
                          group k by k.d into kg
                          select new { d = kg.Key, b = kg.Select(p => new { n = p.b.n, q = p.b.q }) };
      var takeInfoQuery = from d in _context.Dinners
                          join t in _context.TakeRecords.Where(p=>p.TakeDate==DateTime.Today.AddHours(-8)) on d.ID equals t.DinnerID into jrst
                          from j in jrst.DefaultIfEmpty()
                          group j by d.Name into g
                          select new { n = g.Key, q = g.Count(p => p != null) };
      //where b.DinnerID==d.ID
      //var bookInfoQuery = from t in date
      //            select new
      //            {
      //              Date = t,
      //              Dinner =
      //            (from d in dinners
      //             select new
      //             {
      //               Dinner = d.Name,
      //               Quantity = (
      //             from b in this._context.BookRecords
      //             where (b.DinnerID == d.ID && b.DinnerDate == t)

      //             group b by 1 into g
      //             select g.Count()).FirstOrDefault()
      //             })
      //            };
      return Json(new {BookInfo=bookInfoQuery.ToList(),TakeInfo=takeInfoQuery.ToList() });
    }
    [Authorize("Bearer", Roles = "admin")]
    [HttpGet("getdiner/{id}")]
    public JsonResult GetDiner(Guid id)
    {

      return Json(this._context.Diners.FirstOrDefault(p => p.ID == id));
    }
    private Guid GetUserID()
    {
      var idClaim = User.Claims.SingleOrDefault(p => p.Type == "ID");
      if (idClaim == null)
        throw new Exception("令牌有问题");
      var userID = Guid.Parse(idClaim.Value);
      return userID;
    }
    public class DinerDto
    {
      public string CardNumber { get; set; }
      public string IDNumber { get; set; }
      public string Name { get; set; }
      public Guid ID { get; set; }
    }

    [Authorize("bearer", Roles = "admin")]
    [HttpPost("updatediner")]
    public bool UpdateDiner([FromBody]DinerDto diner)
    {
      if (diner.IDNumber.Length != 18||diner.CardNumber.Length!= 10 || diner.Name == string.Empty)
        return false;
      
      if (diner.ID == Guid.Empty)
      {
        var newDiner = new Diner() { CardNumber = diner.CardNumber, Name = diner.Name, IDNumber = diner.IDNumber };
        this._context.Diners.Add(newDiner);
      }
      else
      {
        var existDiner = this._context.Diners.FirstOrDefault(p => p.ID == diner.ID);
        existDiner.Name = diner.Name;
        //existDiner.CardNumber = diner.CardNumber;
        existDiner.IDNumber = diner.IDNumber;
      }
      if (this._context.SaveChanges() == 1)
        return true;
      else
        return false;
    }
    [Authorize("bearer", Roles = "admin")]
    [HttpPost("blukupdatediner")]
    public bool BlukUpdateDiner([FromBody]IList<DinerDto> diners)
    {
      int updateCount = 0;
      foreach (var diner in diners)
      {
        var existDiner = this._context.Diners.FirstOrDefault(p => p.CardNumber == diner.CardNumber);
        if (existDiner == null)
        {
          var newDiner = new Diner() { CardNumber = diner.CardNumber, Name = diner.Name,IDNumber=diner.IDNumber };
          this._context.Diners.Add(newDiner);
          updateCount++;
        }
        else
        {
          if (existDiner.Name != diner.Name || existDiner.IDNumber!=diner.IDNumber)
          {
            existDiner.Name = diner.Name;
            existDiner.IDNumber = diner.IDNumber;
            updateCount++;
          }
        }
      }
      if (this._context.SaveChanges() == updateCount)
        return true;
      else
        return false;
      //if (diner.ID == Guid.Empty)
      //{
      //  var newDiner = new Diner() { CardNumber = diner.CardNumber, Name = diner.Name };
      //  this._context.Diners.Add(newDiner);
      //}
      //else
      //{
      //  var existDiner = this._context.Diners.FirstOrDefault(p => p.ID == diner.ID);
      //  existDiner.Name = diner.Name;
      //  existDiner.CardNumber = diner.CardNumber;
      //}
      //if (this._context.SaveChanges() == 1)
      //  return true;
      //else
      //  return false;
    }
    public class TakeDinnerDto
    {
      public Guid DinnerID { get; set; }
      public DateTime TakeDate { get; set; }
      public string CardNumber { get; set; }
    }

    [Authorize("bearer", Roles = "admin,canteen")]
    [HttpPost("takedinner")]
    public bool TakeDinner([FromBody]TakeDinnerDto dto)
    {
      var newTake = new TakeRecord { DinnerID = dto.DinnerID, TakeDate = dto.TakeDate, CardNumber = dto.CardNumber, TakeTime = DateTime.Now };
      this._context.TakeRecords.Add(newTake);
      if (this._context.SaveChanges() == 1)
        return true;
      else
        return false;
    }
    [Authorize("Bearer", Roles = "admin,canteen")]
    [HttpGet("gettakerecords")]
    public JsonResult GetTakeRecords()
    {
      var query = from t in this._context.TakeRecords
                  join d in _context.Diners on t.CardNumber equals d.CardNumber into joinrst
                  from d in joinrst.DefaultIfEmpty()
                  where t.TakeDate == DateTime.Today.AddHours(-8)
                  orderby t.TakeTime descending
                  select new
                  {
                    id = t.ID,
                    tt = t.TakeTime.ToString("HH:mm:ss"),
                    cn =
                  d == null ? t.CardNumber : d.Name
                  };

      return Json(query.Take(150));
    }
    [Authorize("Bearer", Roles = "admin,canteen")]
    [HttpPost("deletetakerecord/{id}")]
    public bool DeleteTakeRecords(Guid id)
    {
      var existRecord = this._context.TakeRecords.FirstOrDefault(p => p.ID == id);
      if (existRecord != null)
      {
        _context.TakeRecords.Remove(existRecord);
        if (_context.SaveChanges() == 1)
          return true;
        else
          return false;
      }
      else
        return false;
    }
   
    public class TakeInfoSearchDto
    {
      public string DinerName { get; set; }
      public string CardNumber { get; set; }
    }
    [Authorize("Bearer", Roles = "admin")]
    [HttpPost("gettakeinfo")]
    public JsonResult GetTakeInfo([FromBody]TakeInfoSearchDto dto)
    {
      if (dto.CardNumber == null )
        dto.CardNumber = "";
      if (dto.DinerName == null)
        dto.DinerName = "";
      var query = from t in _context.TakeRecords
                  from d in _context.Diners
                  from dd in _context.Dinners
                  where t.CardNumber == d.CardNumber && dd.ID==t.DinnerID && t.CardNumber.Contains(dto.CardNumber) && d.Name.Contains(dto.DinerName)
                  orderby d.Name,t.TakeTime descending
                  select new {Name=d.Name,TakeTime=t.TakeTime.ToString("MM-dd HH:mm:ss"),DinnerName=dd.Name,CardNumber=t.CardNumber };
      return Json(query);
    }
  }
}
