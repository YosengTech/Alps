using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Alps.Web.Infrastructure
{
    public static class PagedList
    {

        public static List<T> GetListPaged<T, Tkey>(this IQueryable<T> data, int pageIndex, int pageSize, Expression<Func<T, bool>> seleWhere,
            Expression<Func<T, Tkey>> orderWhere, bool isDesc, out int totalcount) where T : class
        {

            totalcount = data.Where(seleWhere).Count();//获取总数
            IQueryable<T> rst = CommonSort(data.Where(seleWhere), orderWhere, isDesc).Skip((pageIndex - 1) * pageSize).Take(pageSize);          
            return rst.ToList();

        }
        public static IQueryable<T> CommonSort<T, Tkey>(IQueryable<T> data, Expression<Func<T, Tkey>> orderWhere, bool isDesc) where T : class
        {
            if (isDesc)
            {
                return data.OrderByDescending(orderWhere);
            }
            else
            {
                return data.OrderBy(orderWhere);
            }
        }

    }
}