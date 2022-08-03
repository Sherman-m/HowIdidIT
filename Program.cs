using HowIdidIT.Data;
using HowIdidIT.Data.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ForumContext>();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<MessageService>();
builder.Services.AddTransient<DiscussionService>();
builder.Services.AddTransient<TopicService>();
builder.Services.AddControllers().AddNewtonsoftJson(
    options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.MapControllers();
app.UseCors(policy => policy.
    AllowAnyOrigin().
    AllowAnyMethod().
    AllowAnyHeader());

app.Run();