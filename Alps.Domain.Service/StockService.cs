using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.ProductMgr;
namespace Alps.Domain.Service
{
    public class StockService
    {
        private AlpsContext db;
        public StockService(AlpsContext db)
        {
            this.db = db;
        }
        public void UpdateStock(DeliveryVoucher voucher)
        {
            if (voucher.State == DeliveryVoucherState.Confirmed)
            {
                foreach (DeliveryVoucherItem item in voucher.Items)
                {
                    StockOut(voucher.DepartmentID, item.ProductSkuInfo.SkuID, item.Quantity, item.Weight, item.PositionID, item.ProductNumber);
                }
            }
        }
        public void UpdateStock(MaterialReceipt materialReceipt)
        {
            if (materialReceipt.State == MaterialReceiptState.Confirmed)
            {
                foreach (MaterialReceiptItem item in materialReceipt.Items)
                {
                    StockIn(materialReceipt.DepartmentID, item.ProductSkuInfo.SkuID, item.Quantity, item.Weight, item.PositionID, item.ProductNumber);
                }
            }
        }
        public void UpdateStock(MaterialRequisition materialRequisition)
        {
            if(materialRequisition.State==MaterialRequisitionState.Confirmed)
            {
                foreach (MaterialRequisitionItem item in materialRequisition.Items)
                {
                    StockOut(materialRequisition.DepartmentID, item.ProductSkuInfo.SkuID, item.Quantity, item.Weight, item.PositionID, item.ProductNumber);
                }
            }
        }
        public void UpdateStock(WarehouseVoucher voucher)
        {
            if (voucher.State == WarehouseVoucherState.Confirmed)
            {
                //var source = db.Suppliers.Find(voucher.SupplierID);
                //var destination = db.Departments.Find(voucher.DepartmentID);
                //if (source.InventoryManagement)
                //{
                //    foreach (WarehouseVoucherItem item in voucher.Items)
                //    {
                //        StockOut(voucher.SupplierID, item.ProductSkuInfo.SkuID, item.Quantity, item.Weight, item.PositionID, item.ProductNumber);
                //    }
                //}
                //if (destination.InventoryManagement)
                //{
                    foreach (WarehouseVoucherItem item in voucher.Items)
                    {
                        StockIn(voucher.DepartmentID, item.ProductSkuInfo.SkuID, item.Quantity, item.AuxiliaryQuantity, item.PositionID, item.ProductNumber);
                    }
                //}
            }
            else
                throw new DomainException("入库单未提交");
        }
        public void StockIn(Guid ownerID, Guid skuID, decimal quantity, decimal weight, Guid positionID, string productNumber = "")
        {

            ProductStock productStock = null;
            if (productNumber == string.Empty)
            {
                productStock = db.ProductStocks.Local.FirstOrDefault(p => p.DepartmentID == ownerID && p.SkuID == skuID && p.PositionID == positionID && p.ProductNumber == productNumber);
                if (productStock == null)
                    productStock = db.ProductStocks.FirstOrDefault(p => p.DepartmentID == ownerID && p.SkuID == skuID && p.PositionID == positionID && p.ProductNumber == productNumber);
            }
            else
            {
                productStock = db.ProductStocks.Local.FirstOrDefault(p => p.ProductNumber == productNumber);
                if (productStock == null)
                    productStock = db.ProductStocks.FirstOrDefault(p => p.ProductNumber == productNumber);
            }
            if (productStock == null)
            {
                ProductStock newProductStock = ProductStock.Create(skuID, quantity, weight, ownerID, positionID, productNumber);
                db.ProductStocks.Add(newProductStock);

            }
            else
            {
                if (productNumber != string.Empty)
                {
                    throw new DomainException("已存在此编码");
                }
                else
                {
                    productStock.Quantity += quantity;
                    productStock.Weight += weight;
                }
            }
        }
        public void StockOut(string productNumber)
        {
            ProductStock productStock = db.ProductStocks.FirstOrDefault(p => p.ProductNumber == productNumber);
            if (productStock == null)
            {
                throw new DomainException("无此编码");
            }
            db.ProductStocks.Remove(productStock);
        }
        public void StockOut(Guid ownerID, Guid skuID, decimal quantity, decimal weight, Guid positionID, string productNumber = "")
        {

            ProductStock productStock = db.ProductStocks.FirstOrDefault(p => p.DepartmentID == ownerID && p.SkuID == skuID && p.PositionID == positionID && p.ProductNumber == productNumber);

            if (productStock != null)
            {
                if (productNumber == string.Empty)
                {
                    if (productStock.Quantity >= quantity && productStock.Weight >= weight)
                    {
                        productStock.Weight -= weight;
                        productStock.Quantity -= quantity;
                    }
                    else
                        throw new DomainException("库存量不足");
                }
                else
                {
                    if (productStock.Weight == weight && productStock.Quantity == quantity)
                    {
                        db.ProductStocks.Remove(productStock);
                    }
                    else
                        throw new DomainException("库存量已发生改变");
                }
            }
            else
            {
                throw new DomainException("库存中无此商品");
            }

        }

    }
}
