using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Alps.Web.Models;
using Alps.Domain.AccountingMgr;
using Alps.Domain;
namespace Alps.Web
{
    // 配置此应用程序中使用的应用程序用户管理器。UserManager 在 ASP.NET Identity 中定义，并由此应用程序使用。

    public class AlpsUserManager : UserManager<AlpsUser>
    {
        public AlpsUserManager(IUserStore<AlpsUser> store)
            : base(store)
        {
        }

        public static AlpsUserManager Create(IdentityFactoryOptions<AlpsUserManager> options, IOwinContext context)
        {
            var manager = new AlpsUserManager(new UserStore<AlpsUser>(context.Get<AlpsContext>()));
            // 配置用户名的验证逻辑
            manager.UserValidator = new UserValidator<AlpsUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // 配置密码的验证逻辑
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<AlpsUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}
