using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.AccountingMgr;
using System.ComponentModel.DataAnnotations;
namespace Alps.Domain.ProductMgr
{
   public  class WarehouseVoucher:EntityBase 
    {
       [Display(Name="制单人")]
       [MinLength(5,ErrorMessage="名字最少5个字母")]
       public string Creater { get; set; }
       [Display(Name = "制单时间")]
       [DisplayFormat(DataFormatString="yyyy/mm/dd")]
       [DataType(DataType.Date)]
       public DateTime CreateTime { get; set; }
       [Display(Name = "来源")]
       public Guid SourceID { get; set; }
       [Display(Name = "去处")]
       public Guid DestinationID { get; set; }
       [Display(Name = "来源")]
       public virtual TradeAccount Source { get; set; }
       [Display(Name = "去处")]
       public virtual TradeAccount Destination { get; set; }
       [Display(Name = "单据状态")]
       public virtual WarehouseVoucherState State { get; set; }
       [Display(Name = "提交人")]

       [MinLength(6)]
       public string SubmitUser { get; set; }
       [Display(Name = "明细")]
       public ICollection<WarehouseVoucherItem> Items { get; set; }

       public static WarehouseVoucher Create(TradeAccount source,TradeAccount destination,string creater)
       {
           WarehouseVoucher newWarehouseVoucher = new WarehouseVoucher();
           newWarehouseVoucher.State = WarehouseVoucherState.Unconfirmed;
           newWarehouseVoucher.Creater = creater;
           newWarehouseVoucher.CreateTime = DateTime.Now;
           newWarehouseVoucher.Source = source;
           newWarehouseVoucher.Destination = destination;
           return newWarehouseVoucher;
       }
       public void Submit(string user)
       {
           this.State = WarehouseVoucherState.Confirmed;
           SubmitUser = user;
       }
       public void AddItem(Material material,decimal count,decimal quantity,string productNumber,Position position)
       {
           if (this.Items.Count(p => p.ProductNumber == productNumber) > 0)
               throw new DomainException("已存在同样产品编号");
           WarehouseVoucherItem newWarehouseVoucherItem = new WarehouseVoucherItem();
           newWarehouseVoucherItem.Material = material;
           newWarehouseVoucherItem.MaterialID = material.ID;
           newWarehouseVoucherItem.Count = count;
           newWarehouseVoucherItem.Quantity = quantity;
           newWarehouseVoucherItem.ProductNumber = productNumber;
           newWarehouseVoucherItem.Position = position;
           newWarehouseVoucherItem.PositionID = position.ID;
           Items.Add(newWarehouseVoucherItem);
       }
       public void RemoveItem(Guid itemID)
       {
           WarehouseVoucherItem item= Items.FirstOrDefault(p => p.ID == itemID);
           if (item == null)
               throw new DomainException("无此ID");
           Items.Remove(item);
       }
       public void UpdateItem(Guid itemID, Material material, decimal count, decimal quantity, string productNumber, Position position)
       {
           WarehouseVoucherItem item = this.Items.FirstOrDefault(p => p.ID == itemID);
           if (item != null)
           {
               item.Material = material;
               item.MaterialID = material.ID;
               item.Count = count;
               item.Quantity = quantity;
               item.ProductNumber = productNumber;
               item.Position = position;
           }
           else
           {
               throw new DomainException("无此ID");
           }
       }
       public void UpdateItem(IList<WarehouseVoucherItem> items)
       {
           var existingItems=this.Items.ToList();
           var updatedItems=this.Items.Where(p=>items.Any(k=>k.ID==p.ID)).ToList();
           var addedItems=items.Where(p=>!this.Items.Any(k=>k.ID==p.ID)).ToList();
           var deletedItems=this.Items.Where(p=>items.Any(k=>k.ID==p.ID)).ToList();
           deletedItems.ForEach(p=>this.Items.Remove(p));

       }

    }
}
