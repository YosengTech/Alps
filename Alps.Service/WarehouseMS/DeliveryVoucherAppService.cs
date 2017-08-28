using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Alps.Domain.ProductMgr;
using Alps.Domain;
namespace Alps.Service.WarehouseMS
{
    interface IDeliveryVoucherAppService
    {
        /// <summary>
        /// 根据ID返回出库单
        /// </summary>
        /// <param name="id">凭证ID</param>
        DeliveryVoucher GetDeliveryVoucher(Guid id);
        /// <summary>
        /// 返回所有出库单
        /// </summary>
        /// <returns></returns>
        IQueryable<DeliveryVoucher> GetDeliveryVouchers();
        /// <summary>
        /// 更新出库单
        /// </summary>
        /// <param name="id">凭证ID</param>
        /// <param name="deliveryVoucher">更新目标</param>
        void UpdateDeliveryVoucher(Guid id, DeliveryVoucher deliveryVoucher);

        void CreateDeliveryVoucher(DeliveryVoucher deliveryVoucher);
        void DeleteDeliveryVoucher(Guid id);
        void SubmitDeliveryVoucher(Guid id, string submitter);
    }
    public class DeliveryVoucherAppService : IDeliveryVoucherAppService
    {
        private AlpsContext repository = null;
        public DeliveryVoucherAppService(AlpsContext repository)
        {
            this.repository = repository;
        }
        public DeliveryVoucher GetDeliveryVoucher(Guid id)
        {
            return repository.DeliveryVouchers.Find(id);
        }
        public Task<DeliveryVoucher> GetDeliveryVoucherAsync(Guid id)
        {
            return repository.DeliveryVouchers.FindAsync(id);
        }

        public IQueryable<DeliveryVoucher> GetDeliveryVouchers()
        {
            return repository.DeliveryVouchers.ToList().AsQueryable();
        }

        public void UpdateDeliveryVoucher(Guid id, DeliveryVoucher deliveryVoucher)
        {
            DeliveryVoucher exitingDeliveryVoucher = repository.DeliveryVouchers.Find(id);
            repository.Entry(exitingDeliveryVoucher).CurrentValues.SetValues(deliveryVoucher);
            exitingDeliveryVoucher.UpdateItem(deliveryVoucher.Items);
        }

        public void CreateDeliveryVoucher(DeliveryVoucher deliveryVoucher)
        {
            repository.DeliveryVouchers.Add(deliveryVoucher);
        }

        public void DeleteDeliveryVoucher(Guid id)
        {
            DeliveryVoucher existingDeliveryVoucher = repository.DeliveryVouchers.Find(id);
            repository.DeliveryVouchers.Remove(existingDeliveryVoucher);
        }

        public void SubmitDeliveryVoucher(Guid id, string submitter)
        {
            DeliveryVoucher existingDeliveryVoucher = repository.DeliveryVouchers.Find(id);
            existingDeliveryVoucher.Submit(submitter);
            new Alps.Domain.Service.StockService(repository).UpdateStock(existingDeliveryVoucher);

        }
    }
}
