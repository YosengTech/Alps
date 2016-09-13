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
        [Display(Name = "手机")]
        public string CellPhoneNumber { get; set; }
        [Display(Name="库存维护")]
        public bool InventoryManagement { get; set; }
        [Display(Name = "帐户类型")]
        public TradeAccountType Type { get; set; }


        public static TradeAccount Create(string name, TradeAccountType type,string cellPhoneNumber, string bankAccount)
        {
            return new TradeAccount() { Name = name, Type = type, BankAccount = bankAccount ,CellPhoneNumber=cellPhoneNumber};
        }
    }
    
}
