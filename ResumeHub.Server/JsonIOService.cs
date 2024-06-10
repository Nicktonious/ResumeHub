using Microsoft.AspNetCore.Identity;
using ResumeHub.Server.Models;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;

namespace ResumeHub.Server
{
    public class JsonIOService<T>
    {
        public readonly string FilePath;

        public JsonIOService(string filePath)
        {
            FilePath = filePath;
        }

        public string Read(string fileName)
        {
            if (!File.Exists(Path.Combine(FilePath, fileName)))
            {
                throw new Exception($"File {fileName} not found");
            }

            string json = File.ReadAllText(FilePath);
            return json;
        }

        public void Write(List<T> data)
        {
            string json = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
            });
            using (var writer = new StreamWriter(json, false))
            {
                writer.Write(json);
            }
        }
    }
}
