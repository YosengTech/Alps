using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Alps.Domain.ProductMgr
{
    public partial class Catagory : EntityBase
    {
        [Display(Name="类别名")]
        public string Name { get; set; }
        [Display(Name="上级")]
        public virtual Catagory Parent { get; set; }
        [Display(Name = "上级ID")]
        public Guid? ParentID { get; set; }
        [ForeignKey("ParentID")]
        public virtual ICollection<Catagory> Children { get; set; }

        /*protected Catagory() { }
        public static Catagory Create(string name, Catagory parent)
        {
            return new Catagory { Name = name, Parent = parent };
        }*/
    }
}
