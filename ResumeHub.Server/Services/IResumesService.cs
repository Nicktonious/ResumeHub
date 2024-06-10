using ResumeHub.Server.Models;

namespace ResumeHub.Server.Services
{
    public interface IResumesService
    {
        IEnumerable<ResumeModel> GetAllResumes();
        ResumeModel? GetResumeById(string id);
        void AddResume(ResumeModel resume);
    }
}
