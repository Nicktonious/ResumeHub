using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Linq;
using ResumeHub.Server;
using ResumeHub.Server.Services;

namespace ResumeHub.Server.Services
{
    public class FileUserService : IFileUserService
    {
        private readonly string _filePath;

        public FileUserService(string filePath)
        {
            _filePath = filePath;
        }

        public bool SaveUser(User user)
        {
            List<User> users = new List<User>();
            if (File.Exists(_filePath))
            {
                // Десериализация существующих пользователей, если файл уже существует
                string existingUsersJson = File.ReadAllText(_filePath);
                users = JsonSerializer.Deserialize<List<User>>(existingUsersJson) ?? new List<User>();
            }
            else return false;

            // Добавляем нового пользователя в список
            users.Add(user);

            // Сериализация обновленного списка пользователей в JSON
            string usersJson = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, usersJson);
            return true;
        }

        public User GetUser(string username)
        {
            if (!File.Exists(_filePath))
            {
                return null;
            }

            // Чтение и десериализация файла
            string usersJson = File.ReadAllText(_filePath);
            List<User> users = JsonSerializer.Deserialize<List<User>>(usersJson) ?? new List<User>();

            // Поиск пользователя по имени
            return users.FirstOrDefault(u => u.Username == username);
        }
    }
}