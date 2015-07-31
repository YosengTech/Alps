using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.PurchaseMgr
{
    public enum PurchaseOrderState
    {
        [Display(Name="未确认")]
        Unconfirmed,
        [Display(Name="确认中")]
        Confirming,
        [Display(Name="已确认")]
        Confirmed
    }
}
