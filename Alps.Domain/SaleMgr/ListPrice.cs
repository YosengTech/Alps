using Alps.Domain.ProductMgr;
namespace Alps.Domain.SaleMgr
{
    public class ListPrice : EntityBase
    {
        public Goods Goods { get; set; }
        public decimal Price { get; set; }

    }
}
