namespace ResumeHub.Server.Models
{
    public record UserDataModel(
        string Username,
        string FullName,
        string Gender,
        string BirthDate,
        string Specialization,
        string Qualification,
        List<string> Skills
    );
}
