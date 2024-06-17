using System.Text.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ResumeHub.Server.Models;
using ResumeHub.Server.Services;

public class ResumesService : IResumesService
{
    private readonly string _filePath = "resumesDB.json";
    private readonly JsonIOService<ResumeModel> _jsonIOService = new JsonIOService<ResumeModel>();
    //public ResumesService(IJsonIOService<ResumeModel> jsonIOService)
    //{
    //    _jsonIOService = jsonIOService;
    //}

    public async Task<IEnumerable<ResumeModel>> GetResumesAsync(int startIndex, int count)
    {
        var resumes = await _jsonIOService.ReadAsync(_filePath);
        return resumes.Skip(startIndex).Take(count);
    }
    public async Task<IEnumerable<ResumeModel>> GetAllResumesAsync()
    {
        var resumes = await _jsonIOService.ReadAsync(_filePath);
        return resumes;
    }

    public async Task<bool> AddOrUpdateResumeAsync(ResumeModel resume)
    {
        var resumes = await _jsonIOService.ReadAsync(_filePath);
        int ind = resumes.ToList().FindIndex(r => r.Username == resume.Username);
        
        if (ind != -1)
        {
            //resumes.ToList()[ind] = resume;
            resumes = resumes.Select((r, i) => i == ind ? resume :r);
        }
        else
        {
            resumes = resumes.Append(resume);
        }
        await _jsonIOService.WriteAsync(_filePath, resumes);
        return true;
    }

    public async Task<bool> DeleteResumeAsync(string username)
    {
        var resumes = await _jsonIOService.ReadAsync(_filePath);
        var resumeToDelete = resumes.FirstOrDefault(r => r.Username == username);
        if (resumeToDelete != null)
        {
            resumes = resumes.Where(r => r.Username != username);
            await _jsonIOService.WriteAsync(_filePath, resumes);
            return true;
        }
        return false;
    }

    public async Task<ResumeModel?> GetResumeByUsernameAsync(string username)
    {
        var resumes = await _jsonIOService.ReadAsync(_filePath);
        return resumes.FirstOrDefault(s => s.Username == username);
    }
}