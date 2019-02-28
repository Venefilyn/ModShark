using Microsoft.EntityFrameworkCore;

namespace ModShark.Models
{
    public class ModSharkContext : DbContext
    {
        public ModSharkContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RedditUser>()
                .HasAlternateKey(u => u.Username)
                .HasName("AlternateKey_Username");
        }

        public DbSet<RedditUser> RedditUsers { get; set; }
        public DbSet<UserSetting> UserSettings { get; set; }
    }
}