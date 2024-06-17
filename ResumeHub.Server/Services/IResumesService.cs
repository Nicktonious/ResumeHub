using ResumeHub.Server.Models;

namespace ResumeHub.Server.Services
{
    public interface IResumesService
    {
        Task<IEnumerable<ResumeModel>> GetResumesAsync(int startIndex, int count);
        Task<IEnumerable<ResumeModel>> GetAllResumesAsync();
        Task<ResumeModel?> GetResumeByUsernameAsync(string username);
        Task<bool> AddOrUpdateResumeAsync(ResumeModel resume);
        Task<bool> DeleteResumeAsync(string username);
    }
}
