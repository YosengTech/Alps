using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Alps.Domain.AccountingMgr
{
    public class TradeAccount : EntityBase
    {
        [Display(Name = "账户名")]
        public String Name { get; set; }
        [Display(Name = "银行账号")]
        public string BankAccount { get; set; }
    }
}
