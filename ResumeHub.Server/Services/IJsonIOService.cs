namespace ResumeHub.Server.Services
{
    public interface IJsonIOService<T> where T : class
    {
        Task<IEnumerable<T>> ReadAsync(string fileName);
        Task<bool> WriteAsync(string fileName, IEnumerable<T> data);
    }
}
