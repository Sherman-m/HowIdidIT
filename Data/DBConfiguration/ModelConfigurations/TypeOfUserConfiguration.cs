using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HowIdidIT.Data.DBConfiguration.ModelConfigurations;

public class TypeOfUserConfiguration : IEntityTypeConfiguration<TypeOfUser>
{
    public void Configure(EntityTypeBuilder<TypeOfUser> builder)
    {
        builder.Property(t => t.TypeOfUserId).ValueGeneratedOnAdd();
        builder.HasIndex(t => t.Name).IsUnique(true);
    }
}