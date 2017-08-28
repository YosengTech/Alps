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
    interface IMaterialReceiptAppService
    {
        /// <summary>
        /// 根据ID返回入库单
        /// </summary>
        /// <param name="id">凭证ID</param>
        MaterialReceipt GetMaterialReceipt(Guid id);
        /// <summary>
        /// 返回所有入库单
        /// </summary>
        /// <returns></returns>
        IQueryable<MaterialReceipt> GetMaterialReceipts();
        /// <summary>
        /// 更新入库单
        /// </summary>
        /// <param name="id">凭证ID</param>
        /// <param name="materialReceipt">更新目标</param>
        void UpdateMaterialReceipt(Guid id, MaterialReceipt materialReceipt);

        void CreateMaterialReceipt(MaterialReceipt materialReceipt);
        void DeleteMaterialReceipt(Guid id);
        void SubmitMaterialReceipt(Guid id,string submitter);
    }
    public class MaterialReceiptAppService : IMaterialReceiptAppService
    {
        private AlpsContext repository = null;
        public MaterialReceiptAppService(AlpsContext repository)
        {
            this.repository = repository;
        }
        public MaterialReceipt GetMaterialReceipt(Guid id)
        {
            return repository.MaterialReceipts.Find(id);
        }
        public Task<MaterialReceipt> GetMaterialReceiptAsync(Guid id)
        {
            return repository.MaterialReceipts.FindAsync(id);
        }

        public IQueryable<MaterialReceipt> GetMaterialReceipts()
        {
            return repository.MaterialReceipts.ToList().AsQueryable();
        }


        public void UpdateMaterialReceipt(Guid id, MaterialReceipt materialReceipt)
        {
            MaterialReceipt exitingMaterialReceipt = repository.MaterialReceipts.Find(id);
            repository.Entry(exitingMaterialReceipt).CurrentValues.SetValues(materialReceipt);
            exitingMaterialReceipt.UpdateItem(materialReceipt.Items);
        }

        public void CreateMaterialReceipt(MaterialReceipt materialReceipt)
        {
            repository.MaterialReceipts.Add(materialReceipt);
        }

        public void DeleteMaterialReceipt(Guid id)
        {
            MaterialReceipt exitingMaterialReceipt = repository.MaterialReceipts.Find(id);
            repository.MaterialReceipts.Remove(exitingMaterialReceipt);
        }

        public void SubmitMaterialReceipt(Guid id,string submitter)
        {
            MaterialReceipt voucher = repository.MaterialReceipts.Find(id);
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
