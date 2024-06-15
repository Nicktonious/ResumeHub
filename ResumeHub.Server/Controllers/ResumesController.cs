using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResumeHub.Server.Models;
using ResumeHub.Server.Services;
using System.Text.Json;

namespace ResumeHub.Server.Controllers
{
    [Route("resumes")]
    [ApiController]
    public class ResumesController : ControllerBase
    {
        private readonly IResumesService _resumesService;
        public ResumesController(IResumesService resumesService)
        {
            _resumesService = resumesService;
        }

        // GET: api/Resumes/user1
        [HttpGet("{username}")]
        public ActionResult<ResumeModel> GetResumeByUsername(string username)
        {
            var resume = _resumes.FirstOrDefault(r => r.Username == username);
            if (resume == null)
            {
                return NotFound();
            }
            return resume;
        }

        [HttpGet("page/{pageNumber}/{pageSize}")]
        public ActionResult<IEnumerable<ResumeModel>> GetResumesByPage(int pageNumber, int pageSize)
        {
            if (pageNumber < 1 || pageSize < 1)
            {
                return BadRequest("PageNumber and PageSize should be greater than 0");
            }

            // Вычисляем пропуск количества элементов в зависимости от номера страницы
            int skip = (pageNumber - 1) * pageSize;

            // Получаем резюме для указанной страницы
            var pageResumes = _resumes.Skip(skip).Take(pageSize).ToList();

            if (pageResumes.Count == 0)
            {
                return NotFound("No resumes found for the given page");
            }

            return pageResumes;
        }
    }
}
