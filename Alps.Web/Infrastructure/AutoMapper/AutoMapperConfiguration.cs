using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
namespace Alps.Web.Infrastructure.AutoMapper
{
    public class AutoMapperConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(p => p.AddProfile<ProductProfile>());
        }
    }
}