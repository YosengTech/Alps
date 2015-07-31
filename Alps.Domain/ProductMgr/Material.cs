using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace Alps.Domain.ProductMgr
{
    public class Material : EntityBase
    {
        [Display(Name="物料名")]
        public string Name { get; set; }
        [Display(Name="类别")]
        public Guid CatagoryID { get; set; }
        [Display(Name = "类别")]
        public virtual Catagory Catagory { get; set; }


    }
}
