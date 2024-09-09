using e_commerceProject.Data;
using e_commerceProject.Entities.Identity;
using e_commerceProject.Extensions;
using e_commerceProject.IRepositories;
using e_commerceProject.Middlewares;
using e_commerceProject.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseStatusCodePagesWithReExecute("/errors/{0}");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors("CorPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

//===================================================================================================
//Seed Data and log data
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<DataContext>();
var identityContext = services.GetRequiredService<AppIdentityDbContext>();
var userManager = services.GetRequiredService<UserManager<AppUser>>();
var logger = services.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    await identityContext.Database.MigrateAsync();
    await DataContextSeed.SeedAsync(context, logger);
    await AppIdentityDbContextSeed.SeedUsersAsync(userManager, logger);

}
catch (Exception ex)
{
    logger.LogError(ex, "An Error occured during migration");
}

app.Run();
