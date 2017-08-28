using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain;
using Alps.Domain.ProductMgr;
namespace Alps.Service.ProductMgr
{
    public class CatagoryService
    {
        private AlpsContext db = null;
        public CatagoryService(AlpsContext db)
        {
            this.db = db;
        }
        public Catagory AddCatagory(string name)
        {
            return AddCatagory(name, Guid.Empty);
        }
        public Catagory AddCatagory(string name, Guid parentID)
        {
            Catagory newCatagory = Catagory.Create(name);
            if (parentID != Guid.Empty)
            {
                var parentCatagory = db.Catagories.Find(parentID);
                if (parentCatagory != null)
                    newCatagory.BelongTo(parentCatagory);
                else
                    throw new ServiceException("无此ID");
            }
            db.Catagories.Add(newCatagory);
            return newCatagory;
        }
        public Catagory UpdateCatagory(Guid id,string name ,Guid parentID)
        {
            var catagory = db.Catagories.Find(id);
            
            catagory.Name = name;
            var parentCatagory=db.Catagories.Find(parentID);
            catagory.BelongTo(parentCatagory);
            return catagory;
        }
        public void DeleteCatagory(Guid ID)
        {
            var catagory = db.Catagories.Find(ID);
            db.Catagories.Remove(catagory);

        }
        public IList<Catagory> GetCatagories()
        {
            return db.Catagories.ToList();
        }
        public IList<Catagory> GetCatagoriesByParentID(Guid? id)
        {
            if (id.HasValue)
                return db.Catagories.Where(p => p.ParentID == id).ToList();
            else
                return db.Catagories.Where(p => !p.ParentID.HasValue).ToList();
        }
        public Catagory GetCatagory(Guid id)
        {
            return db.Catagories.Find(id);
        }
    }
}
