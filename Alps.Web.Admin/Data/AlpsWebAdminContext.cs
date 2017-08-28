using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Alps.Domain.Common;
using Alps.Domain.ProductMgr;

namespace Alps.Web.Admin.Models
{
    public class AlpsWebAdminContext : DbContext
    {
        public AlpsWebAdminContext (DbContextOptions<AlpsWebAdminContext> options)
            : base(options)
        {
        }

        public DbSet<Alps.Domain.Common.Supplier> Supplier { get; set; }

        public DbSet<Alps.Domain.ProductMgr.Product> Product { get; set; }

        public DbSet<Alps.Domain.Common.Unit> Unit { get; set; }

        public DbSet<Alps.Domain.ProductMgr.Catagory> Catagory { get; set; }

        public DbSet<Alps.Domain.ProductMgr.ProductSku> ProductSku { get; set; }

        public DbSet<Alps.Domain.ProductMgr.ProductStock> ProductStock { get; set; }
    }
}
