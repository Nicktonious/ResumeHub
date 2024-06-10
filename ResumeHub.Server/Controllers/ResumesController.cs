using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResumeHub.Server.Models;
using ResumeHub.Server.Services;
using System.Text.Json;

namespace ResumeHub.Server.Controllers
{
    [Route("/resumes")]
    [ApiController]
    public class ResumesController : ControllerBase
    {
        private readonly string _resumesFolder = "AppData/Resumes";
        private const int NumberOfResumesPerPage = 10;
        private ResumesService _resumesService;

        public ResumesController(ResumesService resumesService)
        {
            _resumesService = resumesService;   
        }

        // Действие для получения последних резюме
        //[HttpGet("last")]
        [HttpGet]
        public IActionResult GetLastResumes()
        {
            try
            {
                return Ok(_resumesService.GetAllResumesSerialized());
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Ошибка при получении последних резюме", details = ex.Message });
            }
        }

        // Метод для отправки резюме
        [HttpPost]
        public IActionResult PostResume(ResumeModel resume)
        {
            _resumesService.AddResume(resume);
            return Ok(resume);
        }
    }
}
