using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HowIdidIT.Data.DBConfiguration.ModelConfigurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(u => u.UserId).ValueGeneratedOnAdd();
        builder.Property(u => u.DateOfRegistration).HasDefaultValueSql("NOW()");
        builder.Property(u => u.TypeOfUserId).HasDefaultValue(1);
        builder.Property(u => u.Description).HasDefaultValue("");
        builder.HasIndex(u => u.Login).IsUnique(true);

        builder
            .HasMany<Discussion>(u => u.Discussions)
            .WithOne(d => d.User);
        
        builder
            .HasMany<Discussion>(u => u.SelectedDiscussions)
            .WithMany(d => d.SelectedUsers);
        
        builder
            .HasMany<Topic>(u => u.SelectedTopics)
            .WithMany(d => d.SelectedUsers);
    }
}