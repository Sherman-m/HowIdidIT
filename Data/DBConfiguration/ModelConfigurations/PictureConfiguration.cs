using HowIdidIT.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HowIdidIT.Data.DBConfiguration.ModelConfigurations;

public class PictureConfiguration : IEntityTypeConfiguration<Picture>
{
    public void Configure(EntityTypeBuilder<Picture> builder)
    {
        builder.Property(p => p.PictureId).ValueGeneratedOnAdd();
    }
}