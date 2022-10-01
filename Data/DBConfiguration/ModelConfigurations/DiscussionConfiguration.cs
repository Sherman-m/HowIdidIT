using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HowIdidIT.Data.DBConfiguration.ModelConfigurations;

public class DiscussionConfiguration : IEntityTypeConfiguration<Discussion>
{
    public void Configure(EntityTypeBuilder<Discussion> builder)
    {
        builder.Property(d => d.DiscussionId).ValueGeneratedOnAdd();
        builder.Property(d => d.DateOfCreating).HasDefaultValueSql("NOW()");
        builder.Property(d => d.LastModification).HasDefaultValueSql("NOW()");
        builder.Property(d => d.CountOfMessages).HasDefaultValue(0);

        builder
            .HasOne<User>(d => d.User)
            .WithMany(u => u.Discussions);
        
        builder
            .HasMany<User>(d => d.SelectedUsers)
            .WithMany(u => u.SelectedDiscussions);
    }
}