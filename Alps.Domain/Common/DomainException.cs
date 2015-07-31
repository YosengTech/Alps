﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain
{
    public class DomainException:Exception
    {
        public DomainException()
            : base()
        {
        }
        public DomainException(string msg)
            : base(msg)
        {
        }
    }
}
