using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.Common
{
    public class Unit : EntityBase
    {
        [Display(Name = "名称")]
        public string Name { get; set; }
        [Display(Name = "级别")]
        public int Group { get; set; }
        [Display(Name = "基本单位")]
        public bool IsBaseUnit { get; set; }
        [Display(Name = "换算率")]
        public decimal RateOfExchange { get; set; }

        public static Unit Create(string name, int group,bool isBaseUnit,decimal rateOfExchange=1)
        {
            if (isBaseUnit)
                rateOfExchange = 1;
            return new Unit { Name = name, Group = group,IsBaseUnit=isBaseUnit,RateOfExchange=rateOfExchange };
        }
    }

}
