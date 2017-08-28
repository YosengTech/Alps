using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Alps.Domain.ProductMgr;
using Alps.Domain;
using Alps.Domain.Service;
namespace Alps.Service.WarehouseMS
{
    interface IWarehouseVoucherAppService
    {
        /// <summary>
        /// 根据ID返回入库单
        /// </summary>
        /// <param name="id">凭证ID</param>
        WarehouseVoucher GetWarehouseVoucher(Guid id);
        /// <summary>
        /// 返回所有入库单
        /// </summary>
        /// <returns></returns>
        IQueryable<WarehouseVoucher> GetWarehouseVouchers();
        /// <summary>
        /// 更新入库单
        /// </summary>
        /// <param name="id">凭证ID</param>
        /// <param name="warehouseVoucher">更新目标</param>
        void UpdateWarehouseVoucher(Guid id, WarehouseVoucher warehouseVoucher);

        void CreateWarehouseVoucher(WarehouseVoucher warehouseVoucher);
        void DeleteWarehouseVoucher(Guid id);
        void SubmitWarehouseVoucher(Guid id,string submitter);
    }
    public class WarehouseVoucherAppService : IWarehouseVoucherAppService
    {
        private AlpsContext repository = null;
        public WarehouseVoucherAppService(AlpsContext repository)
        {
            this.repository = repository;
        }
        public WarehouseVoucher GetWarehouseVoucher(Guid id)
        {
            return repository.WarehouseVouchers.Find(id);
        }
        public Task<WarehouseVoucher> GetWarehouseVoucherAsync(Guid id)
        {
            return repository.WarehouseVouchers.FindAsync(id);
        }
        public IQueryable<WarehouseVoucher> GetWarehouseVouchers()
        {
            return repository.WarehouseVouchers.ToList().AsQueryable();
        }

        public void UpdateWarehouseVoucher(Guid id, WarehouseVoucher warehouseVoucher)
        {
            WarehouseVoucher exitingWarehouseVoucher = repository.WarehouseVouchers.Find(id);
            repository.Entry(exitingWarehouseVoucher).CurrentValues.SetValues(warehouseVoucher);
            exitingWarehouseVoucher.UpdateItem(warehouseVoucher.Items);
        }

        public void CreateWarehouseVoucher(WarehouseVoucher warehouseVoucher)
        {
            repository.WarehouseVouchers.Add(warehouseVoucher);
        }

        public void DeleteWarehouseVoucher(Guid id)
        {
            WarehouseVoucher exitingWarehouseVoucher = repository.WarehouseVouchers.Find(id);
            repository.WarehouseVouchers.Remove(exitingWarehouseVoucher);
        }

        public void SubmitWarehouseVoucher(Guid id,string submitter)
        {
            WarehouseVoucher voucher = repository.WarehouseVouchers.Find(id);
            if (voucher != null)
            {
                voucher.Submit(submitter);
                new StockService(repository).UpdateStock(voucher);
            }
            else
                throw new DomainException("入库单不存在");
        }
    }
}
