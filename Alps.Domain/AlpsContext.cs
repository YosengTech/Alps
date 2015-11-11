using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.ComponentModel.DataAnnotations.Schema;
using Alps.Domain.ProductMgr;
using Alps.Domain.Common;
using Alps.Domain.SaleMgr;
using Alps.Domain.AccountingMgr;
using System.Data.Entity.ModelConfiguration;
using Alps.Domain.PurchaseMgr;
namespace Alps.Domain
{
    public class AlpsContext : DbContext
    {
        public AlpsContext()
            : base("name=AlpsContext")
        {
        }
        #region DbSet属性


        #region Common
        public DbSet<Unit> Units { get; set; }
        #endregion

        #region ProductMgr
        public DbSet<Catagory> Catagories { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<WarehouseVoucher> WarehouseVouchers { get; set; }
        public DbSet<WarehouseVoucherItem> WarehouseVoucherItems { get; set; }
        public DbSet<Commodity> Commodities { get; set; }
        #endregion

        #region SaleMgr
        public DbSet<Customer> Customer { get; set; }
        public DbSet<SaleOrder> SaleOrders { get; set; }
        public DbSet<SaleOrderItem> SaleOrderItems { get; set; }
        #endregion

        #region PurchaseMgr
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<PurchaseOrderItem> PurchaseOrderItems { get; set; }
        #endregion

        #region AccountingMgr

        public DbSet<TradeAccount> TradeAccounts { get; set; }
        #endregion
        #endregion

        #region 初始化相关
        public static void Initial()
        {
            Database.SetInitializer<AlpsContext>(new AlpsContextInitializer());
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            
            //modelBuilder.Entity<WarehouseVoucher>().Property(p => p.Destination).IsRequired();//.HasRequired(p => p.Destination).WithRequiredPrincipal();
            //modelBuilder.Entity<WarehouseVoucher>().HasRequired(p => p.Destination).WithOptional().WillCascadeOnDelete(false);
            //modelBuilder.Entity<WarehouseVoucher>().HasRequired(p => p.Source).WithOptional().WillCascadeOnDelete(false);
            base.OnModelCreating(modelBuilder);
            foreach (System.Reflection.PropertyInfo pi in typeof(AlpsContext).GetProperties())
            {
                if (pi.PropertyType.IsGenericType)
                {
                    Type t = typeof(AbstractEntityTypeConfiguration<>);
                    t = t.MakeGenericType(pi.PropertyType.GetGenericArguments()[0]);
                    dynamic o = Activator.CreateInstance(t);
                    modelBuilder.Configurations.Add(o);
                }
            }
            modelBuilder.Entity<WarehouseVoucher>().HasKey(p => p.ID);
            //modelBuilder.Entity<WarehouseVoucher>().Property(p => p.SourceID).IsRequired();
            modelBuilder.Entity<WarehouseVoucher>().HasRequired(p => p.Source).WithMany().WillCascadeOnDelete(false);
            //modelBuilder.Entity<WarehouseVoucher>().Property(p => p.DestinationID).IsRequired();
            modelBuilder.Entity<WarehouseVoucher>().HasRequired(p => p.Destination).WithMany().WillCascadeOnDelete(false);
          

        }
        public class AbstractEntityTypeConfiguration<T> : EntityTypeConfiguration<T> where T : EntityBase
        {
            public AbstractEntityTypeConfiguration()
            {
                Property(p => p.Timestamp).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Computed)
                    .HasColumnType("timestamp").IsConcurrencyToken();

            }
        }
        public class AlpsContextInitializer ://DropCreateDatabaseAlways<AlpsContext>
            DropCreateDatabaseIfModelChanges<AlpsContext>
        {
            Guid sourceID = Guid.Empty;
            Guid destinationID = Guid.Empty;
            Guid materialID = Guid.Empty;
            Guid positionID = Guid.Empty;
            protected override void Seed(AlpsContext context)
            {

                base.Seed(context);
                ProductMgrSeed(context);
                TradeAccount sourceTradeAccount = new TradeAccount() { Name = "李祥镇", BankAccount = "TT" };
                context.TradeAccounts.Add(sourceTradeAccount);
                TradeAccount destinationTradeAccount = new TradeAccount() { Name = "陈媚", BankAccount = "235654" };
                context.TradeAccounts.Add(destinationTradeAccount);
                context.SaveChanges();
                sourceID =sourceTradeAccount.ID;
                destinationID = destinationTradeAccount.ID;
            }
            void ProductMgrSeed(AlpsContext context)
            {
                Catagory newCatagory = new Catagory() { Name = "槽" };
                context.Catagories.Add(newCatagory);
                newCatagory = new Catagory() { Name = "角" };
                context.Catagories.Add(newCatagory);
                Material material = new Material() { Catagory = newCatagory, Name = "角4Kg", CatagoryID = newCatagory.ID };
                context.Materials.Add(material);
                context.SaveChanges();
                materialID = material.ID;
                context.Units.Add(new Unit() { Name = "吨" });
                context.SaveChanges();
                context.Positions.Add(new Position() { Name = "新建616", Number = "616", Warehouse = "新建仓库" });
                Position position=new Position() { Name = "小槽315", Number = "315", Warehouse = "小槽仓库" };
                context.Positions.Add(position);
                context.SaveChanges();
                positionID = position.ID;
           
                WarehouseVoucher voucher = WarehouseVoucher.Create(sourceID,destinationID,"系统测试");
                voucher.AddItem(materialID, 11, 12, "12345", positionID);
                voucher.AddItem(materialID, 15, 15, "151515", positionID);
                context.WarehouseVouchers.Add(voucher);
                context.SaveChanges();
                
                //PurchaseOrder order =new PurchaseOrder();
                //order.Creater = "Winsan";
                //order.
            }
        }
        #endregion

    }

}
