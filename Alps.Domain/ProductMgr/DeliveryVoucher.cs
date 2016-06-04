using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alps.Domain.AccountingMgr;
using System.ComponentModel.DataAnnotations;
namespace Alps.Domain.ProductMgr
{
    public class DeliveryVoucher:EntityBase
    {
        [Display(Name = "制单人")]
        public string Creater { get; set; }
        [Display(Name = "制单时间")]
        [DisplayFormat(DataFormatString = "yyyy/mm/dd")]
        public DateTimeOffset CreateTime { get; set; }
        [Display(Name = "来源")]
        public Guid SourceID { get; set; }
        [Display(Name = "去处")]
        public Guid DestinationID { get; set; }
        [Display(Name = "来源")]
        public virtual TradeAccount Source { get; set; }
        [Display(Name = "去处")]
        public virtual TradeAccount Destination { get; set; }
        [Display(Name = "单据状态")]
        public virtual DeliveryVoucherState State { get; set; }
        [Display(Name = "提交人")]
        public string SubmitUser { get; set; }
        [Display(Name = "总数量")]
        public decimal TotalQuantity { get; set; }
        [Display(Name = "总重量")]
        public decimal TotalWeight { get; set; }
        [Display(Name = "总金额")]
        public decimal TotalAmount { get; set; }
        [Display(Name = "明细")]
        public virtual ICollection<DeliveryVoucherItem> Items { get; set; }
        public static DeliveryVoucher Create(Guid sourceID, Guid destinationID, string creater)
        {
            DeliveryVoucher newdeliveryVoucher = new DeliveryVoucher();
            newdeliveryVoucher.State = DeliveryVoucherState.Unconfirmed;
            newdeliveryVoucher.Creater = creater;
            newdeliveryVoucher.CreateTime = DateTime.Now;
            newdeliveryVoucher.SourceID = sourceID;
            newdeliveryVoucher.DestinationID = destinationID;
            newdeliveryVoucher.SubmitUser = "";
            return newdeliveryVoucher;
        }
    }
}
