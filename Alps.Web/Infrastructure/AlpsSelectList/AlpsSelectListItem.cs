using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Alps.Web.Infrastructure
{
    public class AlpsSelectListItem<T> 
    {
        public T Value { get; set; }
        public string Text { get; set; }
    }
}