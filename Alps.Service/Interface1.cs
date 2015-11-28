using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Alps.Domain.ProductMgr;
namespace Alps.Service
{
    interface IProductMgrAppService
    {
        /// <summary>
        /// 根据ID返回物品
        /// </summary>
        /// <param name="id">物品ID</param>
        void GetProduct(Guid id);
        IQueryable<Product> GetProducts();
        void SaveProduct();
        /// <summary>
        /// 根据ID删除物品
        /// </summary>
        /// <param name="id">物品ID</param>
        void RemoveProduct(Guid id);
        

    }
}
