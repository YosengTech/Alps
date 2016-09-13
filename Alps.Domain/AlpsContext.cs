using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using Alps.Domain.ProductMgr;
using Alps.Domain.Common;
using Alps.Domain.SaleMgr;
using Alps.Domain.AccountingMgr;
using System.Data.Entity.ModelConfiguration;
using Alps.Domain.PurchaseMgr;
using Microsoft.AspNet.Identity.EntityFramework;
namespace Alps.Domain
{
    public class AlpsContext : IdentityDbContext<AlpsUser>//DbContext
    {
        public AlpsContext()
            : base("name=AlpsContext")
        {
        }
        #region DbSet属性


        #region Common
        public DbSet<Unit> Units { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        #endregion

        #region ProductMgr
        public DbSet<Catagory> Catagories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductSku> ProductSkus { get; set; }
        public DbSet<ProductStock> ProductStocks { get; set; }
        //public DbSet<Product_back_2> Products { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<ProductCatagorySetting> ProductCatagorySettings { get; set; }
        public DbSet<WarehouseVoucher> WarehouseVouchers { get; set; }
        public DbSet<WarehouseVoucherItem> WarehouseVoucherItems { get; set; }
        public DbSet<DeliveryVoucher> DeliveryVouchers { get; set; }

        public DbSet<MaterialReceipt> MaterialReceipts { get; set; }
        public DbSet<MaterialReceiptItem> MaterialReceiptItems { get; set; }
        public DbSet<MaterialRequisition> MaterialRequisitions { get; set; }
        public DbSet<MaterialRequisitionItem> MaterialRequisitionItems { get; set; }
        #endregion

        #region SaleMgr
        public DbSet<SaleOrder> SaleOrders { get; set; }
        public DbSet<SaleOrderItem> SaleOrderItems { get; set; }
        public DbSet<Commodity> Commodities { get; set; }
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
            foreach (System.Reflection.PropertyInfo pi in typeof(AlpsContext).GetProperties().Where(p=>p.Module.Name=="Alps.Domain.dll"))
            {
                
                if (pi.PropertyType.IsGenericType)
                {
                    Type t = typeof(AbstractEntityTypeConfiguration<>);
                    t = t.MakeGenericType(pi.PropertyType.GetGenericArguments()[0]);
                    dynamic o = Activator.CreateInstance(t);
                    modelBuilder.Configurations.Add(o);
                }
            }
            modelBuilder.Entity<AlpsUser>().HasKey(p => p.Id);

            modelBuilder.Entity<WarehouseVoucher>().HasKey(p => p.ID);
            //modelBuilder.Entity<WarehouseVoucher>().Property(p => p.SourceID).IsRequired();
            modelBuilder.Entity<WarehouseVoucher>().HasRequired(p => p.Supplier).WithMany().WillCascadeOnDelete(false);
            //modelBuilder.Entity<WarehouseVoucher>().Property(p => p.DestinationID).IsRequired();
            modelBuilder.Entity<WarehouseVoucher>().HasRequired(p => p.Department).WithMany().WillCascadeOnDelete(false);

            modelBuilder.Entity<WarehouseVoucherItem>().HasKey(p => new { p.ID, p.WarehouseVoucherID });

            modelBuilder.Entity<DeliveryVoucher>().HasRequired(p => p.Department).WithMany().WillCascadeOnDelete(false);
            modelBuilder.Entity<DeliveryVoucher>().HasRequired(p => p.Customer).WithMany().WillCascadeOnDelete(false);
            modelBuilder.Entity<DeliveryVoucherItem>().HasKey(p => new { p.ID, p.DeliveryVoucherID });

            modelBuilder.Entity<MaterialReceipt>().HasRequired(p => p.Department).WithMany().WillCascadeOnDelete(false);
            modelBuilder.Entity<MaterialReceipt>().HasRequired(p => p.SourceDepartment).WithMany().WillCascadeOnDelete(false);
            modelBuilder.Entity<MaterialReceiptItem>().HasKey(p => new { p.ID, p.MaterialReceiptID });

            modelBuilder.Entity<MaterialRequisition>().HasRequired(p => p.Department).WithMany().WillCascadeOnDelete(false);
            modelBuilder.Entity<MaterialRequisition>().HasRequired(p => p.RequisitionDepartment).WithMany().WillCascadeOnDelete(false);
            modelBuilder.Entity<MaterialRequisitionItem>().HasKey(p => new { p.ID, p.MaterialRequisitionID });
            //modelBuilder.Entity<PurchaseOrderItem>().HasRequired(p => p.Unit).WithMany().WillCascadeOnDelete(false);
            //modelBuilder.Entity<WarehouseVoucherItem>().HasRequired(p => p.Unit).WithMany().WillCascadeOnDelete(false);

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
            Guid supplierID = Guid.Empty;
            Guid customerID = Guid.Empty;
            Guid departmentID = Guid.Empty;
            Guid productDepartmentID = Guid.Empty;
            Guid productID = Guid.Empty;
            Guid positionID = Guid.Empty;
            Guid unitID = Guid.Empty;
            Guid gpID = Guid.Empty;
            Guid gcSkuID = Guid.Empty;
            Guid gpSkuID = Guid.Empty;
            Guid caoCatagoryID = Guid.Empty;
            Guid jiaoCatagoryID = Guid.Empty;
            protected override void Seed(AlpsContext context)
            {

                base.Seed(context);
                CommonMgrSeed(context);
                ProductMgrSeed(context);
                PurchaseMgrSeed(context);
                SaleMgrSeed(context);
            }
            void CommonMgrSeed(AlpsContext context)
            {
                #region 初始化部门
                Department d = Department.Create("供销科");
                context.Departments.Add(d);
                d = Department.Create("大槽车间");
                productDepartmentID = d.ID;
                context.Departments.Add(d);
                d = Department.Create("焊管车间");
                context.Departments.Add(d);
                d = Department.Create("采购部");
                context.Departments.Add(d);
                context.SaveChanges();
                departmentID = d.ID;
                #endregion

                #region 初始化客户
                Customer c = Customer.Create("江水金");
                context.Customers.Add(c);
                c = Customer.Create("陈依寿");
                context.Customers.Add(c);
                c = Customer.Create("林光江");
                context.Customers.Add(c);
                context.SaveChanges();
                customerID = c.ID;
                #endregion

                #region 初始化供应商
                Supplier s = Supplier.Create("宏建");
                context.Suppliers.Add(s);
                s = Supplier.Create("恒辉");
                context.Suppliers.Add(s);
                s = Supplier.Create("富鑫");
                context.Suppliers.Add(s);
                context.SaveChanges();
                supplierID = s.ID;
                #endregion

                #region 初始化交易账户

                TradeAccount ta = TradeAccount.Create("宏建", TradeAccountType.SupplierAndCustomer, "13900000000", "");
                context.TradeAccounts.Add(ta);
                ta = TradeAccount.Create("富鑫", TradeAccountType.SupplierAndCustomer, "13900000001", "");
                context.TradeAccounts.Add(ta);
                ta = TradeAccount.Create("江水金", TradeAccountType.Customer, "13900000003", "");
                context.TradeAccounts.Add(ta);
                ta = TradeAccount.Create("陈依寿", TradeAccountType.Customer, "13900000005", "");
                context.TradeAccounts.Add(ta);
                context.SaveChanges();
                #endregion

                #region 初始化单位
                Unit unit = Unit.Create("吨", 1, false, 1000);
                context.Units.Add(unit);
                unitID = unit.ID;
                context.Units.Add(Unit.Create("公斤", 1, true));
                context.Units.Add(Unit.Create("件", 2, true));
                context.SaveChanges();
                #endregion

                #region 初始化仓位
                context.Positions.Add(new Position() { Name = "新建616", Number = "616", Warehouse = "新建仓库" });
                Position position = new Position() { Name = "小槽315", Number = "315", Warehouse = "小槽仓库" };
                context.Positions.Add(position);
                context.SaveChanges();
                positionID = position.ID;
                #endregion

                #region 初始化类别
                Catagory newCatagory = Catagory.Create("槽");
                context.Catagories.Add(newCatagory);
                caoCatagoryID = newCatagory.ID;
                newCatagory = Catagory.Create("角");
                context.Catagories.Add(newCatagory);
                jiaoCatagoryID = newCatagory.ID;
                newCatagory = Catagory.Create("连铸坯");
                context.Catagories.Add(newCatagory);
                newCatagory = Catagory.Create("电机");
                context.Catagories.Add(newCatagory);
                newCatagory = Catagory.Create("轧辊");
                context.Catagories.Add(newCatagory);
                context.SaveChanges();
                #endregion

                #region 初始化产品
                Product product = null;
                Catagory associatedCatagory=context.Catagories.Find(caoCatagoryID);
                product = Product.Create("5#槽钢", "5#槽钢", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                product.SetCatagory(associatedCatagory);
                context.Products.Add(product);
                productID = product.ID;
                product = Product.Create("6#槽钢", "6#槽钢", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                product.SetCatagory(associatedCatagory);
                context.Products.Add(product);
                product = Product.Create("8#槽钢", "8#槽钢", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                product.SetCatagory(associatedCatagory);
                context.Products.Add(product);
                product = Product.Create("10#槽钢", "10#槽钢", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                product.SetCatagory(associatedCatagory);
                context.Products.Add(product);
                product = Product.Create("12#槽钢", "12#槽钢", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                product.SetCatagory(associatedCatagory);
                context.Products.Add(product);
                product = Product.Create("14#槽钢", "14#槽钢", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                product.SetCatagory(associatedCatagory);
                context.Products.Add(product);
                associatedCatagory = context.Catagories.Find(jiaoCatagoryID);
                product = Product.Create("3#角钢", "3#角钢", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                product.SetCatagory(associatedCatagory);
                context.Products.Add(product);
                product = Product.Create("4#角钢", "4#角钢", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                product.SetCatagory(associatedCatagory);
                context.Products.Add(product);
                product = Product.Create("5#角钢", "5#角钢", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                product.SetCatagory(associatedCatagory);
                context.Products.Add(product);
                product = Product.Create("6#角钢", "6#角钢", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                product.SetCatagory(associatedCatagory);
                context.Products.Add(product);
                //product = Product.Create("连铸坯", "连铸坯", "不想多说", PricingMethod.PricingByWeight, 2000, unitID);
                //context.Products.Add(product);
                //gpID = product.ID;
                //product = Product.Create("2极电机", "2极电机", "傻瓜都看的懂", PricingMethod.PricingByQuantity, 4000, unitID);
                //context.Products.Add(product);
                //product = Product.Create("4极电机", "4极电机", "傻瓜都看的懂", PricingMethod.PricingByQuantity, 4000, unitID);
                //context.Products.Add(product);
                //product = Product.Create("750轧辊", "750轧辊", "傻瓜都看的懂", PricingMethod.PricingByQuantity, 9000, unitID);
                //context.Products.Add(product);
                //product = Product.Create("700轧辊", "700轧辊", "傻瓜都看的懂", PricingMethod.PricingByQuantity, 9000, unitID);
                //context.Products.Add(product);
                context.SaveChanges();
                #endregion

                #region 初始化SKU
                ProductSku sku = null;
                foreach (Product p in context.Products.Where(p => p.Name.Contains("槽钢")))
                {
                    sku = ProductSku.Create(p.ID, p.FullName + "100条包装", 0, PricingMethod.PricingByQuantity, 2000);
                    context.ProductSkus.Add(sku);
                    sku = ProductSku.Create(p.ID, p.FullName + "200条包装", 0, PricingMethod.PricingByWeight, 2000);
                    context.ProductSkus.Add(sku);
                }
                gcSkuID = sku.ID;
                foreach (Product p in context.Products.Where(p => p.Name.Contains("角钢")))
                {
                    sku = ProductSku.Create(p.ID, p.FullName + "100条包装", 0, PricingMethod.PricingByQuantity, 2000);
                    context.ProductSkus.Add(sku);
                    sku = ProductSku.Create(p.ID, p.FullName + "200条包装", 0, PricingMethod.PricingByWeight, 2000);
                    context.ProductSkus.Add(sku);
                }
                foreach (Product p in context.Products.Where(p => p.Name.Contains("连铸坯")))
                {
                    sku = ProductSku.Create(p.ID, p.FullName + "150方", 0, PricingMethod.PricingByWeight, 2000);
                    context.ProductSkus.Add(sku);
                    sku = ProductSku.Create(p.ID, p.FullName + "120方", 0, PricingMethod.PricingByQuantity, 2000);
                    context.ProductSkus.Add(sku);
                }
                gpSkuID = sku.ID;
                context.SaveChanges();

                #endregion
            }
            void ProductMgrSeed(AlpsContext context)
            {
                #region 无用


                //Catagory newCatagory = Catagory.Create("槽");
                //var childCatagory = Catagory.Create("8#");
                //newCatagory.AddChildCatagory(childCatagory);
                //newCatagory.AddChildCatagory(Catagory.Create("10#"));
                //newCatagory.AddChildCatagory(Catagory.Create("12#"));
                //context.Catagories.Add(newCatagory);
                //newCatagory = Catagory.Create("角");
                //context.Catagories.Add(newCatagory);
                //newCatagory.AddChildCatagory(Catagory.Create("3#"));
                //newCatagory.AddChildCatagory(Catagory.Create("4#"));
                //newCatagory.AddChildCatagory(Catagory.Create("5#"));
                //childCatagory = Catagory.Create("6#");
                //newCatagory.AddChildCatagory(childCatagory);
                //Product product = null;
                //childCatagory = context.Catagories.Local.FirstOrDefault(p => p.Name == "8#");
                //newCatagory = context.Catagories.Local.FirstOrDefault(p => p.Name == "5#");
                //for (int i = 0; i < 10; i++)
                //{
                //    product = Product.Create((i + 20).ToString() + "Kg", "8#槽钢" + (i + 20).ToString() + "Kg", "不想多说", PricingMethod.PricingByQuantity, 2000, unitID);
                //    context.Products.Add(product);
                //    product.AddAssociatedCatagory(childCatagory, 0);
                //    product = Product.Create((i + 5).ToString() + "Kg", "5#角钢" + (i + 5).ToString() + "Kg", "不想多说", PricingMethod.PricingByWeight, 1000, unitID);
                //    product.AddAssociatedCatagory(newCatagory, 0);
                //    context.Products.Add(product);
                //}

                //context.SaveChanges();
                //productID = product.ID;
                //product = Product.Create("连铸坯*120*6", "连铸坯*120*6", "连铸坯*120*6", PricingMethod.PricingByWeight, 2000, unitID);
                //context.Products.Add(product);
                //context.SaveChanges();
                //gpID = product.ID;
                #endregion

                #region 初始化入库单
                ProductSku sku = context.ProductSkus.Find(gcSkuID);
                WarehouseVoucher voucher = WarehouseVoucher.Create(supplierID, departmentID, "系统初始化");
                ProductSkuInfo psi = sku.GetProductSkuInfo();
                voucher.AddItem(psi, 1, 2.3m, 2100, "12345", positionID);
                voucher.AddItem(psi, 1, 2.5m, 2100, "151515", positionID);
                context.WarehouseVouchers.Add(voucher);
                context.SaveChanges();
                voucher = WarehouseVoucher.Create(supplierID, departmentID, "系统初始化2");
                voucher.AddItem(psi, 1, 2.4m, 2000, "600001", positionID);
                voucher.AddItem(psi, 1, 2.6m, 2000, "600002", positionID);
                context.WarehouseVouchers.Add(voucher);
                psi = context.ProductSkus.Find(gpSkuID).GetProductSkuInfo();
                voucher = WarehouseVoucher.Create(supplierID, departmentID, "系统初始化3");
                voucher.AddItem(psi, 1500, 1000m, 1800, "", positionID);
                voucher.AddItem(psi, 3000, 2000m, 1700, "", positionID);
                context.WarehouseVouchers.Add(voucher);
                voucher = WarehouseVoucher.Create(supplierID, departmentID, "系统初始化3");
                voucher.AddItem(psi, 750, 500m, 1700, "", positionID);
                context.WarehouseVouchers.Add(voucher);
                context.SaveChanges();
                #endregion

                #region 初始化库存
                context.ProductStocks.Add(ProductStock.Create(gcSkuID, 1, 2.5m, departmentID, positionID, "900001"));
                context.ProductStocks.Add(ProductStock.Create(gpSkuID, 1, 2.52m, departmentID, positionID, "900002"));
                context.SaveChanges();
                #endregion

                #region 初始化领料单
                MaterialRequisition r = MaterialRequisition.Create(departmentID, productDepartmentID, "系统");
                psi=context.ProductSkus.Find(gpSkuID).GetProductSkuInfo();
                r.AddItem(psi, 1500, 1000, 1800, "", positionID);
                context.MaterialRequisitions.Add(r);
                context.SaveChanges();
                #endregion

                #region 初始化收料单
                MaterialReceipt s = MaterialReceipt.Create(departmentID, productDepartmentID, "系统");
                psi = context.ProductSkus.Find(gcSkuID).GetProductSkuInfo();
                s.AddItem(psi,1, 2.33m, 1800, "556699", positionID);
                context.MaterialReceipts.Add(s);
                context.SaveChanges();
                #endregion

                #region 初始化出库单
                psi=context.ProductSkus.Find(gcSkuID).GetProductSkuInfo();
                DeliveryVoucher dv = DeliveryVoucher.Create(departmentID, customerID, "系统初始化");
                dv.AddItem(psi, 1, 2.5m, 2000, "900001", positionID, "");
                context.DeliveryVouchers.Add(dv);
                psi = context.ProductSkus.Find(gpSkuID).GetProductSkuInfo();
                dv = DeliveryVoucher.Create(departmentID, customerID, "系统初始化");
                dv.AddItem(psi, 2, 2.5m, 2000, "900003", positionID, "");
                context.DeliveryVouchers.Add(dv);
                context.SaveChanges();
                #endregion
            }
            void SaleMgrSeed(AlpsContext context)
            {
                var goods = Commodity.Create(productID, "5#4Kg", "槽钢", 1700, 100);
                context.Commodities.Add(goods);
                var saleOrder = SaleOrder.Create(customerID);
                context.SaleOrders.Add(saleOrder);
                saleOrder = SaleOrder.Create(customerID, saleOrder);
                context.SaleOrders.Add(saleOrder);

                context.SaveChanges();
            }

            void PurchaseMgrSeed(AlpsContext context)
            {
                #region 采购订单初始化
                PurchaseOrder purchaseOrder = PurchaseOrder.Create(supplierID, "系统初始化");
                ProductSkuInfo gcpsi = context.ProductSkus.Find(gcSkuID).GetProductSkuInfo();
                purchaseOrder.AddItem(gcpsi, 10, 3.2m, 2000);
                purchaseOrder.AddItem(gcpsi, 20, 0, 2000);
                context.PurchaseOrders.Add(purchaseOrder);

                purchaseOrder = PurchaseOrder.Create(supplierID, "系统初始化");
                ProductSkuInfo gppsi = context.ProductSkus.Find(gpSkuID).GetProductSkuInfo();
                purchaseOrder.AddItem(gppsi, 1333, 1000m, 1800);
                context.PurchaseOrders.Add(purchaseOrder);
                context.SaveChanges();
                #endregion
            }
        }
        #endregion

    }

}
