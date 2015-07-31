using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Alps.Domain.Repository.Pattern.Infrastructure
{
    public interface IEntity
    {
        Guid ID { get; set; }
        byte[] Timestamp { get; set; }
    }
}
