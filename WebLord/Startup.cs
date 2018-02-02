using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebLord.Startup))]
namespace WebLord
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
