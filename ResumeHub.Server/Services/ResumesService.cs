using ResumeHub.Server.Models;
using System.Text.Json;

namespace ResumeHub.Server.Services
{
    public class ResumesService : IResumesService
    {
        //private readonly List<ResumeModel> _resumes;
        private JsonIOService<ResumeModel> _jsonIOService;
        public ResumesService()
        {
            // Инициализируем список резюме
            //_resumes = new List<ResumeModel>();
            _jsonIOService = new JsonIOService<ResumeModel>("\\Data\\");
        }
        public string GetAllResumesSerialized()
        {
            return _jsonIOService.Read("resumes");
        }
        public IEnumerable<ResumeModel> GetAllResumes()
        {
            // Возвращаем все резюме
            string json = GetAllResumesSerialized();
            try
            {
                var result = JsonSerializer.Deserialize<List<ResumeModel>>(json);
                if (result is List<ResumeModel> && result.Count > 0) return result;
                else throw new Exception("Failed to decerialize");
            }
            catch (Exception ex) { throw new Exception("Failed to decerialize"); }
        }

        public ResumeModel? GetResumeById(string id)
        {
            // Находим резюме по идентификатору
            return GetAllResumes().FirstOrDefault(r => r.Id == id);
        }

        public void AddResume(ResumeModel resume)
        {
            // Добавляем новое резюме в список
            var resumes = GetAllResumes() as List<ResumeModel>;
            if (resumes is null) resumes = new List<ResumeModel>();
            resumes.ToList().Add(resume);
            _jsonIOService.Write(resumes);
        }
    }
}
