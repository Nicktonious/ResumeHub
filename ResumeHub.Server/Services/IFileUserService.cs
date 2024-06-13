using ResumeHub.Server.Models;

namespace ResumeHub.Server.Services
{
    public interface IFileUserService
    {
        string UsersListFilePath { get; set; }
        bool SaveUser(User user);
        User? GetUser(string username);
        bool UpdateUser(User user);
        bool DeleteUser(string username);
        public IEnumerable<UserDataModel> GetUsersData();
        bool WriteUsersToFile(List<User> users);
        IEnumerable<User> GetAllUsers();
        bool WriteUsersDataToFile(List<UserDataModel> data);
        bool UpdateUsersData(UserDataModel data);
    }
}