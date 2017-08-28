using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.StockMgr
{
    public enum StockInVoucherStatus
    {
        [Display(Name = "未提交")]
        Unsubmit,
        [Display(Name = "审核中")]
        UnderReview,
        [Display(Name = "已确认")]
        Confirm
    }
}
