using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HowIdidIT.Data.DBConfiguration.ModelConfigurations;

public class TopicConfiguration : IEntityTypeConfiguration<Topic>
{
    public void Configure(EntityTypeBuilder<Topic> builder)
    {
        builder.Property(t => t.TopicId).ValueGeneratedOnAdd();
        builder.Property(t => t.CountOfDiscussing).HasDefaultValue(0);
        builder.Property(t => t.Description).HasDefaultValue("");
        builder.Property(t => t.DateOfCreating).HasDefaultValueSql("NOW()");
        builder.Property(t => t.LastModification).HasDefaultValueSql("NOW()");
        builder.HasIndex(t => t.Name).IsUnique(true);

        builder
            .HasMany<User>(t => t.SelectedUsers)
            .WithMany(u => u.SelectedTopics);
    }
}