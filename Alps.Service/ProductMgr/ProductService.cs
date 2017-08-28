using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain;
using Alps.Domain.ProductMgr;
namespace Alps.Service.ProductMgr
{
    public class ProductService
    {
        private AlpsContext db = null;
        public ProductService(AlpsContext db)
        {
            this.db = db;
        }
        public Product CreateProduct(Product product)
        {
            db.Products.Add(product);
            return product;
        }
        public Product UpdateProduct(Guid id)
        {
            var product=db.Products.Find(id);
            
            return product;

        }
        public void DeleteProduct(Guid id)
        {
            var product=db.Products.Find(id);
            if (product == null)
                throw new DomainException("无此id");
            product.SetDeleted();

        }

         
    }
}
