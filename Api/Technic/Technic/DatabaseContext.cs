using System;
using Microsoft.EntityFrameworkCore;

namespace Technic
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }
    }
}