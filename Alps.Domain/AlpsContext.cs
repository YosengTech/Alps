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

            modelBuilder.Entity<WarehouseVoucherItem>().HasKey(p => new { p.ID, p.WarehouseVoucherID });

            

        }
        public class AbstractEntityTypeConfiguration<T> : EntityTypeConfiguration<T> where T : EntityBase
        {
            public AbstractEntityTypeConfiguration()
            {
                Property(p => p.Timestamp).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Computed)
                    .HasColumnType("timestamp").IsConcurrencyToken();

            }
        }
        public class AlpsContextInitializer : DropCreateDatabaseAlways<AlpsContext>
        //DropCreateDatabaseIfModelChanges<AlpsContext>
        {
            Guid sourceID = Guid.Empty;
            Guid destinationID = Guid.Empty;
            Guid materialID = Guid.Empty;
            Guid positionID = Guid.Empty;
            protected override void Seed(AlpsContext context)
            {

                base.Seed(context);

                TradeAccount sourceTradeAccount = new TradeAccount() { Name = "供应商", BankAccount = "TT" };
                context.TradeAccounts.Add(sourceTradeAccount);
                TradeAccount destinationTradeAccount = new TradeAccount() { Name = "公司", BankAccount = "235654", InventoryManagement = true };
                context.TradeAccounts.Add(destinationTradeAccount);
                context.SaveChanges();
                sourceID = sourceTradeAccount.ID;
                destinationID = destinationTradeAccount.ID;
                destinationTradeAccount = new TradeAccount() { Name = "客户", BankAccount = "5555555" };
                context.TradeAccounts.Add(destinationTradeAccount);
                context.SaveChanges();

                ProductMgrSeed(context);
                SaleMgrSeed(context);
            }
            void ProductMgrSeed(AlpsContext context)
            {
                Catagory newCatagory = new Catagory() { Name = "槽" };
                context.Catagories.Add(newCatagory);
                newCatagory = new Catagory() { Name = "角" };
                context.Catagories.Add(newCatagory);
                var childCatagory = new Catagory() { Name = "4#" };
                newCatagory.Children.Add(childCatagory);
                newCatagory.Children.Add(new Catagory() { Name = "5#" });

                Material material = new Material() { Catagory = childCatagory, Name = "10Kg", CatagoryID = childCatagory.ID };
                context.Materials.Add(material);
                material = new Material() { Catagory = childCatagory, Name = "12Kg", CatagoryID = childCatagory.ID };
                context.Materials.Add(material);
                context.SaveChanges();
                materialID = material.ID;
                context.Units.Add(new Unit() { Name = "吨" });
                context.SaveChanges();
                context.Positions.Add(new Position() { Name = "新建616", Number = "616", Warehouse = "新建仓库" });
                Position position = new Position() { Name = "小槽315", Number = "315", Warehouse = "小槽仓库" };
                context.Positions.Add(position);
                context.SaveChanges();
                positionID = position.ID;

                WarehouseVoucher voucher = WarehouseVoucher.Create(sourceID, destinationID, "系统初始化");
                voucher.AddItem(materialID, 11, 12, "12345", positionID);
                voucher.AddItem(materialID, 15, 15, "151515", positionID);
                context.WarehouseVouchers.Add(voucher);
                context.SaveChanges();


                context.Commodities.Add(Commodity.Create(materialID,1,2.4m,destinationID,positionID,"556677"));
                context.Commodities.Add(Commodity.Create(materialID, 2, 3.5m, destinationID, positionID, "889900"));

                context.SaveChanges();
                //PurchaseOrder order =new PurchaseOrder();
                //order.Creater = "Winsan";
                //order.
            }
            void SaleMgrSeed(AlpsContext context)
            {
                var saleOrder = SaleOrder.Create(sourceID);
                context.SaleOrders.Add(saleOrder);
                saleOrder = SaleOrder.Create(destinationID,saleOrder);
                context.SaleOrders.Add(saleOrder);
                context.SaveChanges();
            }
        }
        #endregion

    }

}
