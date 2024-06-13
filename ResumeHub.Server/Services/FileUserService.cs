using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Linq;
using ResumeHub.Server.Models;

namespace ResumeHub.Server.Services
{
    public class FileUserService : IFileUserService
    {
        private string _usersListFilePath;
        private string _usersDataFilePath;

        public string UsersListFilePath
        {
            get => _usersListFilePath;
            set => _usersListFilePath = value;
        }
        public string UsersDataFilePath
        {
            get => _usersDataFilePath;
            set => _usersDataFilePath = value;
        }

        public FileUserService(string filePath1 = "usersDB.json", string filePath2 = "usersDataDB.json")
        {
            _usersListFilePath = filePath1;
            _usersDataFilePath = filePath2;
        }

        public bool SaveUser(User user)
        {
            var users = GetAllUsers().ToList();
            if (users.Any(u => u.Username == user.Username))
                return false;

            users.Add(user);
            return WriteUsersToFile(users);
        }

        public bool UpdateUser(User user)
        {
            var users = GetAllUsers().ToList();
            var existingUserIndex = users.FindIndex(u => u.Username == user.Username);
            if (existingUserIndex == -1)
                return false;

            users[existingUserIndex] = user;
            return WriteUsersToFile(users);
        }

        public bool DeleteUser(string username)
        {
            var users = GetAllUsers().ToList();
            var user = users.FirstOrDefault(u => u.Username == username);
            if (user == null)
                return false;

            users.Remove(user);
            return WriteUsersToFile(users);
        }

        public User? GetUser(string username)
        {
            return GetAllUsers().FirstOrDefault(u => u.Username == username);
        }

        public IEnumerable<User> GetAllUsers()
        {
            if (!File.Exists(UsersListFilePath))
                return Enumerable.Empty<User>();

            try
            {
                string usersJson = File.ReadAllText(UsersListFilePath);
                return JsonSerializer.Deserialize<List<User>>(usersJson) ?? new List<User>();
            }
            catch (Exception ex)
            {
                // Логирование ошибки ex
                return Enumerable.Empty<User>();
            }
        }

        public IEnumerable<UserDataModel> GetUsersData()
        {
            if (!File.Exists(UsersDataFilePath))
                return Enumerable.Empty<UserDataModel>();

            try
            {
                string usersJson = File.ReadAllText(UsersDataFilePath);
                return JsonSerializer.Deserialize<List<UserDataModel>>(usersJson) ?? new List<UserDataModel>();
            }
            catch (Exception ex)
            {
                // Логирование ошибки ex
                return Enumerable.Empty<UserDataModel>();
            }
        }
        public bool WriteUsersToFile(List<User> users)
        {
            try
            {
                string usersJson = JsonSerializer.Serialize(users, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(UsersListFilePath, usersJson);
                return true;
            }
            catch (Exception ex)
            {
                // Логирование ошибки ex
                return false;
            }
        }
        public bool WriteUsersDataToFile(List<UserDataModel> data)
        {
            try
            {
                string usersJson = JsonSerializer.Serialize(data, 
                    new JsonSerializerOptions { WriteIndented = true }
                );
                File.WriteAllText(UsersDataFilePath, usersJson);
                return true;
            }
            catch (Exception ex)
            {
                // Логирование ошибки ex
                return false;
            }
        }
        public bool UpdateUsersData(UserDataModel data)
        {
            var usersData = GetUsersData().ToList();
            UserDataModel? userData = usersData.FirstOrDefault(d => d.Username == data.Username);
            if (userData is null)
            {
                usersData.Add(data);
            }
            else
            {
                usersData.Remove(userData);
                UserDataModel updData = new UserDataModel(
                    data.Username,
                    !string.IsNullOrWhiteSpace(data.FullName) ? data.FullName : userData.FullName,
                    !string.IsNullOrWhiteSpace(data.Gender) ? data.Gender : userData.Gender,
                    data.BirthDate,
                    !string.IsNullOrWhiteSpace(data.Specialization) ? data.Specialization : userData.Specialization,
                    !string.IsNullOrWhiteSpace(data.Qualification) ? data.Qualification : userData.Qualification,
                    data.Skills.Count > 0 ? data.Skills : userData.Skills
                );
                usersData.Add(updData);
            }
            try
            {
                WriteUsersDataToFile(usersData);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}