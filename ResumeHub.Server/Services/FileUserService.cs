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
        private string _usersListFilePath = "usersDB.json";
        private string _usersDataFilePath = "usersDataDB.json";
        private JsonIOService<UserDataModel> _dataJsonIOService = new JsonIOService<UserDataModel>();
        private JsonIOService<UserModel> _userJsonIOService = new JsonIOService<UserModel>();

        public async Task<bool> SaveUserAsync(UserModel user)
        {
            var users = await _userJsonIOService.ReadAsync(_usersListFilePath);
            if (users.Any(u => u.Username == user.Username))
                return false;

            users = users.Append(user);
            try { 
                await _userJsonIOService.WriteAsync(_usersListFilePath, users);
                return true;
            } catch { return false; }
        }

        public async Task<bool> DeleteUserAsync(string username)
        {
            var users = await _userJsonIOService.ReadAsync(_usersListFilePath);
            var user = users.FirstOrDefault(u => u.Username == username);
            if (user == null) return true;
            users = users.Where(u => u.Username != username);

            try
            {
                await _userJsonIOService.WriteAsync(_usersListFilePath, users);
                return true;
            }
            catch { return false; }
        }

        public async Task<UserModel?> GetUserAsync(string username)
        {
            var users = await GetAllUsersAsync();
            return users.FirstOrDefault(u => u.Username == username);
        }

        public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
        {
            if (!File.Exists(_usersListFilePath))
                return Enumerable.Empty<UserModel>();

            return await _userJsonIOService.ReadAsync(_usersListFilePath);
        }

        public Task<IEnumerable<UserDataModel>> GetUsersDataAsync()
        {
            return _dataJsonIOService.ReadAsync(_usersDataFilePath);
        }
        public async Task<bool> SaveUsersListAsync(List<UserModel> users)
        {
            return await _userJsonIOService.WriteAsync(_usersListFilePath, users);
        }
        public async Task<bool> SaveUsersDataAsync(IEnumerable<UserDataModel> data)
        {
            return await _dataJsonIOService.WriteAsync(_usersDataFilePath, data);
        }
        public async Task<bool> AddOrUpdateUserDataAsync(UserDataModel data)
        {
            var usersData = await GetUsersDataAsync();
            usersData = usersData.Where(ud => ud.Username != data.Username);
        
            usersData = usersData.Append(data);
            return await SaveUsersDataAsync(usersData);
        }
    }
}