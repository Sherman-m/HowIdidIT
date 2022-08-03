using Microsoft.EntityFrameworkCore;
using HowIdidIT.Data.Models;

namespace HowIdidIT.Data;

public class ForumContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.UseNpgsql(@"Host=localhost;Database=forum;Username=postgres;Password=education;")
            .UseSnakeCaseNamingConvention()
            .UseLoggerFactory(LoggerFactory.Create(builder =>
                builder.AddConsole())).EnableSensitiveDataLogging();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Discussion>().Property(d => d.DiscussionId).ValueGeneratedOnAdd();
        modelBuilder.Entity<Message>().Property(m => m.MessageId).ValueGeneratedOnAdd();
        modelBuilder.Entity<Picture>().Property(p => p.PictureId).ValueGeneratedOnAdd();
        modelBuilder.Entity<Topic>().Property(t => t.TopicId).ValueGeneratedOnAdd();
        modelBuilder.Entity<TypeOfUser>().Property(t => t.TypeOfUserId).ValueGeneratedOnAdd();
        modelBuilder.Entity<TypeOfUser>().HasIndex(t => t.Name).IsUnique(true);
        modelBuilder.Entity<User>().Property(u => u.UserId).ValueGeneratedOnAdd();
        modelBuilder.Entity<User>().HasIndex(u => u.Nickname).IsUnique(true);
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique(true);
    }

    public DbSet<Discussion> Discussions { get; set;}
    public DbSet<Message> Messages { get; set; }
    public DbSet<Picture> Pictures { get; set;}
    public DbSet<Topic> Topics { get; set; }
    public DbSet<TypeOfUser> TypesOfUsers { get; set;}
    public DbSet<User> Users { get; set; }
}