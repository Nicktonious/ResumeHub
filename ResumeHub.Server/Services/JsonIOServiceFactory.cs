namespace ResumeHub.Server.Services
{
    public interface IJsonIOServiceFactory
    {
        IJsonIOService<T> Create<T>() where T : class;
    }

    public class JsonIOServiceFactory : IJsonIOServiceFactory
    {
        public IJsonIOService<T> Create<T>() where T : class
        {
            return new JsonIOService<T>();
        }
    }
}
