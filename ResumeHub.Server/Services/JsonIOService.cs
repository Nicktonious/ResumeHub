using Microsoft.AspNetCore.Identity;
using ResumeHub.Server.Models;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;

namespace ResumeHub.Server.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Text.Json;
    using System.Threading.Tasks;

    public class JsonIOService<T> : IJsonIOService<T> where T : class
    {
        public async Task<IEnumerable<T>> ReadAsync(string fileName)
        {
            if (!File.Exists(fileName))
            {
                throw new FileNotFoundException($"File {fileName} not found");
            }

            using (var stream = File.OpenRead(fileName))
            {
                return await JsonSerializer.DeserializeAsync<IEnumerable<T>>(stream) ?? new List<T>();
            }
        }

        public async Task WriteAsync<T>(string fileName, List<T> data)
        {
            string json = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
            });

            using (var stream = File.Create(fileName))
            {
                using (var writer = new StreamWriter(stream))
                {
                    await writer.WriteAsync(json);
                }
            }
        }

        public Task WriteAsync(string fileName, IEnumerable<T> data)
        {
            throw new NotImplementedException();
        }
    }
}