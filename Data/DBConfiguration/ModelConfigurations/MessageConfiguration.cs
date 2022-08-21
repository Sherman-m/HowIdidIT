using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HowIdidIT.Data.DBConfiguration.ModelConfigurations;

public class MessageConfiguration : IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> builder)
    {
        builder.Property(m => m.MessageId).ValueGeneratedOnAdd();
        builder.Property(m => m.DateOfPublication).HasDefaultValueSql("NOW()");
        builder.Property(m => m.LastModification).HasDefaultValueSql("NOW()");
    }
}