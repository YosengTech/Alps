using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Alps.Domain.ProductMgr;
using Alps.Domain;
namespace Alps.Service.WarehouseMS
{
    interface IMaterialRequisitionAppService
    {
        /// <summary>
        /// 根据ID返回出库单
        /// </summary>
        /// <param name="id">凭证ID</param>
        MaterialRequisition GetMaterialRequisition(Guid id);
        /// <summary>
        /// 返回所有出库单
        /// </summary>
        /// <returns></returns>
        IQueryable<MaterialRequisition> GetMaterialRequisitions();
        /// <summary>
        /// 更新出库单
        /// </summary>
        /// <param name="id">凭证ID</param>
        /// <param name="materialRequisition">更新目标</param>
        void UpdateMaterialRequisition(Guid id, MaterialRequisition materialRequisition);

        void CreateMaterialRequisition(MaterialRequisition materialRequisition);
        void DeleteMaterialRequisition(Guid id);
        void SubmitMaterialRequisition(Guid id,string submitter);
    }
    public class MaterialRequisitionAppService : IMaterialRequisitionAppService
    {
        private AlpsContext repository = null;
        public MaterialRequisitionAppService(AlpsContext repository)
        {
            this.repository = repository;
        }
        public MaterialRequisition GetMaterialRequisition(Guid id)
        {
            return repository.MaterialRequisitions.Find(id);
        }
        public Task<MaterialRequisition> GetMaterialRequisitionAsync(Guid id)
        {
            return repository.MaterialRequisitions.FindAsync(id);
        }
        public IQueryable<MaterialRequisition> GetMaterialRequisitions()
        {
            return repository.MaterialRequisitions.ToList().AsQueryable();
        }

        public void UpdateMaterialRequisition(Guid id, MaterialRequisition materialRequisition)
        {
            MaterialRequisition exitingMaterialRequisition = repository.MaterialRequisitions.Find(id);
            repository.Entry(exitingMaterialRequisition).CurrentValues.SetValues(materialRequisition);
            exitingMaterialRequisition.UpdateItem(materialRequisition.Items);
        }

        public void CreateMaterialRequisition(MaterialRequisition materialRequisition)
        {
            repository.MaterialRequisitions.Add(materialRequisition);
        }

        public void DeleteMaterialRequisition(Guid id)
        {
            MaterialRequisition existingMaterialRequisition = repository.MaterialRequisitions.Find(id);
            repository.MaterialRequisitions.Remove(existingMaterialRequisition);
        }

        public void SubmitMaterialRequisition(Guid id,string submitter)
        {
            MaterialRequisition existingMaterialRequisition = repository.MaterialRequisitions.Find(id);
            existingMaterialRequisition.Submit(submitter);
            new Alps.Domain.Service.StockService(repository).UpdateStock(existingMaterialRequisition);

        }
    }
}
