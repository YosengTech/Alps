using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Properties;
using Alps.Web.Infrastructure;
namespace Alps.Web.Extensions
{
    public class EnumHelper
    {
        public static IList<AlpsSelectListItem<int>> GetEnumSelectList(Type type)
        {
            if (type == null)
            {
                throw new Exception("type参数无效");
            }
            if (!EnumHelper.IsValidForEnumHelper(type))
            {
                throw new Exception("type参数类型不符合");
            }
            IList<AlpsSelectListItem<int>> list = new List<AlpsSelectListItem<int>>();
            Type type2 = Nullable.GetUnderlyingType(type) ?? type;
            if (type2 != type)
            {
                list.Add(new AlpsSelectListItem<int>
                {
                    Text = string.Empty,
                    Value = 0
                });
            }
            FieldInfo[] fields = type2.GetFields(BindingFlags.DeclaredOnly | BindingFlags.Static | BindingFlags.Public | BindingFlags.GetField);
            for (int i = 0; i < fields.Length; i++)
            {
                FieldInfo fieldInfo = fields[i];
                object rawConstantValue = fieldInfo.GetRawConstantValue();
                list.Add(new AlpsSelectListItem<int>
                {
                    Text = EnumHelper.GetDisplayName(fieldInfo),
                    Value = (int)rawConstantValue
                });
            }
            return list;
        }
        private static string GetDisplayName(FieldInfo field)
        {
            DisplayAttribute customAttribute = Attribute.GetCustomAttribute(field, typeof(DisplayAttribute), false) as DisplayAttribute;
            if (customAttribute != null)
            {
                string name = customAttribute.GetName();
                if (!string.IsNullOrEmpty(name))
                {
                    return name;
                }
            }
            return field.Name;
        }
        public static bool IsValidForEnumHelper(Type type)
        {
            bool result = false;
            if (type != null)
            {
                Type type2 = Nullable.GetUnderlyingType(type) ?? type;
                if (type2.IsEnum)
                {
                    result = true;
                }
            }
            return result;
        }

    }

}