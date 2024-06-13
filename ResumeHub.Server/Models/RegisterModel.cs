namespace ResumeHub.Server.Models
{
    public record RegisterModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public RegisterModel(string username, string password)
        {
            Username = username;
            Password = password;
        }
    }
    public record UsernameModel(string Username);
}
