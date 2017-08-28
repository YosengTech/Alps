using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.AccountingMgr
{
    public enum TradeAccountType
    {
        [Display(Name="供应商")]
        Supplier,
        [Display(Name = "客户")]
        Customer,
        [Display(Name = "供应商和客户")]
        SupplierAndCustomer
    }
}
