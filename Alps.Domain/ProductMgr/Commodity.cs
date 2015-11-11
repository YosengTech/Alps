using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.AccountingMgr;
namespace Alps.Domain.ProductMgr
{
    public class Commodity : EntityBase
    {

        public Guid MaterialID { get; set; }
        public Decimal Count { get; set; }
        public Decimal Quantity { get; set; }

        public bool IsIndividualPacking { get; set; }

        public int PackingQuantity { get; set; }
        public string ProductNumber { get; set; }
        public Guid PositionID { get; set; }
        public Guid OwnerID { get; set; }
        //public virtual Material Material { get; set; }
        //public virtual Position Position { get; set; }
        //public virtual TradeAccount Owner { get; set; }
        //protected Product() { }
        public static Commodity Create(Guid materialID, decimal count, decimal quantity, Guid ownerID, Guid positionID, string productNumber = "")
        {
            return new Commodity() { Quantity = quantity, MaterialID = materialID, Count = count, PositionID = positionID, OwnerID = ownerID, ProductNumber = productNumber };
        }
        public void MoveTo(Guid positionID)
        {
            this.PositionID = positionID;
        }
        
    }
}
