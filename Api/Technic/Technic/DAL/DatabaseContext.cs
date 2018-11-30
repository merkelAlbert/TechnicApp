using Microsoft.EntityFrameworkCore;
using Technic.DAL.Models;

namespace Technic.DAL
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
    }
}