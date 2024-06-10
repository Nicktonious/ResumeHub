using ResumeHub.Server.Models;

namespace ResumeHub.Server.Data
{
    public class ResumesDataContext
    {
        private List<ResumeModel> _resumes;
        public ResumesDataContext() 
        {
            _resumes = new List<ResumeModel>();
        }
    }
}
