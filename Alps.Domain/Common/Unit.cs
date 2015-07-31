using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.Common
{
    public class Unit:EntityBase
    {
        public string Name { get; set; }
        public int Group { get; set; }
    }
}
