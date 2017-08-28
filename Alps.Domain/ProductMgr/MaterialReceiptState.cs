using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.ProductMgr
{
    public enum MaterialReceiptState
    {
        [Display(Name = "未确认")]
        Unconfirmed,
        [Display(Name = "已确认")]
        Confirmed
    }
}
