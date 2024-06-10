namespace ResumeHub.Server.Services
{
    public interface IFileUserService
    {
        public interface IUserService
        {
            public bool SaveUser(User user);
            public User GetUser(string username);
        }
    }
}