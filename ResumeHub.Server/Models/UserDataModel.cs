namespace ResumeHub.Server.Models
{
    public record UserDataModel(
        string Username,
        string Name,
        string Surname,
        string Gender,
        string Email,
        int Age,
        int Experience,
        string Specialization,
        string Qualification,
        List<string> Skills
    );
}
