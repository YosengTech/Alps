using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
namespace Alps.Web.Infrastructure.AutoMapper
{
    public class ProductProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<Alps.Domain.ProductMgr.Product, Alps.Web.Models.ProductMgr.ProductEditModel>();
        }
    }
}