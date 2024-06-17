using ResumeHub.Server.Models;

namespace ResumeHub.Server.Services
{
    public interface IFileUserService
    {
        Task<bool> SaveUserAsync(UserModel user);
        Task<UserModel?> GetUserAsync(string username);
        Task<bool> DeleteUserAsync(string username);
        Task<IEnumerable<UserDataModel>> GetUsersDataAsync();
        //Task<bool> WriteUsersToFile(List<UserModel> users);
        Task<IEnumerable<UserModel>> GetAllUsersAsync();
        Task<bool> SaveUsersDataAsync(IEnumerable<UserDataModel> data);
        Task<bool> AddOrUpdateUserDataAsync(UserDataModel data);
    }
}