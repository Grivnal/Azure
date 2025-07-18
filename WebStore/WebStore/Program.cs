using Microsoft.EntityFrameworkCore;
using WebStore.Data;
using WebStore.Extensions;
using WebStore.Interfaces;
using WebStore.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<MyStoreContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("MyConnectionSalo")));

builder.Services.AddControllers();

builder.Services.AddIdentityConfiguration();

builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();