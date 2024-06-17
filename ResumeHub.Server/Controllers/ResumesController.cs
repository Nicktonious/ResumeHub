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
        private readonly IFileUserService _fileUserService;
        public ResumesController(IResumesService resumesService, IFileUserService fileUserService)
        {
            _resumesService = resumesService;
            _fileUserService = fileUserService;
        }

        // GET: api/Resumes/user1
        [HttpGet("{username}")]
        public async Task<ActionResult<ResumeModel>> GetResume(string username)
        {
            var resume = await _resumesService.GetResumeByUsernameAsync(username);
            if (resume == null)
            {
                return NotFound();
            }
            return Ok(resume);
        }
        [HttpDelete("username")]
        public async Task<ActionResult> DeleteDesume(string username)
        {
            bool res = await _resumesService.DeleteResumeAsync(username);
            if (res)
                return Ok();
            return BadRequest();
        }

        // POST: api/Resumes/user1
        [HttpPost("resume")]
        public async Task<ActionResult<ResumeModel>> AddOrUpdateResume([FromBody] ResumeModel resume)
        {
            var result = await _resumesService.AddOrUpdateResumeAsync(resume);
            if (result)
                return Ok();
            
            return NoContent();
        }
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<ResumeModel>>> GetAllResumesAsync()
        {
            var resumes = await _resumesService.GetAllResumesAsync();
            var usersData = await _fileUserService.GetUsersDataAsync();
            if (resumes != null)
                return Ok(new { resumes, usersData });
            else
                return NotFound();
        }
        [HttpGet("page/{pageNumber}/{pageSize}")]
        public async Task<ActionResult<IEnumerable<ResumeModel>>> GetResumesByPage(int pageNumber, int pageSize)
        {
            if (pageNumber < 1 || pageSize < 1)
            {
                return BadRequest("PageNumber and PageSize should be greater than 0");
            }
            var resumes = await _resumesService.GetResumesAsync(pageNumber, pageSize);
            if (resumes.Count() == 0)
            {
                return NotFound("No resumes found for the given page");
            }
            return Ok(resumes);
        }
    }
}
