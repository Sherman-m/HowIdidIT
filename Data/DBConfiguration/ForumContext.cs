using HowIdidIT.Data.DBConfiguration.ModelConfigurations;
using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace HowIdidIT.Data.DBConfiguration;

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
        modelBuilder.ApplyConfiguration(new DiscussionConfiguration());
        modelBuilder.ApplyConfiguration(new MessageConfiguration());
        modelBuilder.ApplyConfiguration(new PictureConfiguration());
        modelBuilder.ApplyConfiguration(new TopicConfiguration());
        modelBuilder.ApplyConfiguration(new TypeOfUserConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
    }

    public DbSet<Discussion> Discussions { get; set;}
    public DbSet<Message> Messages { get; set; }
    public DbSet<Picture> Pictures { get; set;}
    public DbSet<Topic> Topics { get; set; }
    public DbSet<TypeOfUser> TypesOfUsers { get; set;}
    public DbSet<User> Users { get; set; }
}