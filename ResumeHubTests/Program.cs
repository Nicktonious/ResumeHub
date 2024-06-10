using ResumeHub.Server.Models;
using System.Text.Json;

namespace ResumeHubTests
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var m1 = new ResumeModel("Я Аликсей");
            var list = new List<ResumeModel> { m1 };
            Console.WriteLine(JsonSerializer.Serialize<List<ResumeModel>>(
                list, 
                new JsonSerializerOptions 
                { 
                    Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
                }
            ));
        }
    }
}
