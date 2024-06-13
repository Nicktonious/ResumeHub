namespace ResumeHub.Server
{
    public record User(Guid Id, string Username, string PasswordHash);
    //public class User
    //{
    //    public Guid Id { get; set; }
    //    public string Username { get; set; }
    //    public string PasswordHash { get; set; }
    //    public User(Guid id, string username, string passwordHash)
    //    {
    //        Id = id;
    //        Username = username;
    //        PasswordHash = passwordHash;
    //    }
    //}
}
