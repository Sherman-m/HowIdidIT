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
        builder.HasIndex(u => u.Nickname).IsUnique(true);
        builder.HasIndex(u => u.Email).IsUnique(true);
    }
}