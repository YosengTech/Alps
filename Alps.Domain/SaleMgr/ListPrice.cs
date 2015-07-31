using Alps.Domain.ProductMgr;
namespace Alps.Domain.SaleMgr
{
    public class ListPrice : EntityBase
    {
        public Material Material { get; set; }
        public decimal Price { get; set; }

    }
}
