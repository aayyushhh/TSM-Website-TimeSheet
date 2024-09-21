using Microsoft.EntityFrameworkCore;
using TsmTask4.Model;

namespace TsmTask4.Data
{
    public class ActivityDbContext:DbContext
    {
        public DbSet<DateModel> DateModels { get; set; }
        public DbSet<Activity> Activities { get; set; }

        public ActivityDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
    }
}
