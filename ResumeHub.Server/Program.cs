using ResumeHub.Server.Data;
using ResumeHub.Server.Services;
using System.Reflection.PortableExecutable;

namespace ResumeHub.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddTransient<IResumesService, ResumesService>();
            var filePath = "usersDB.json"; // Укажите путь к файлу напрямую
            builder.Services.AddSingleton<IFileUserService>(_ => new FileUserService(filePath));
            //builder.Services.AddSingleton<ResumesDataContext>();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
                options.AddPolicy("WebAppCorsPolicy", builder =>
                {
                    builder.WithOrigins("https://localhost:7012") 
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                    // .AllowCredentials() // Если нужно отправлять учетные данные (куки, заголовки авторизации)
                });
            });
            

            var app = builder.Build();

            app.UseCors("WebAppCorsPolicy");

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            //app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
