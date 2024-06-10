using System.Text.Json.Serialization;

namespace ResumeHub.Server.Models
{
    public class ResumeModel
    {
        //[JsonPropertyName("id")]
        public string Id { get; set; } // Уникальный идентификатор резюме
        //public string FirstName { get; set; } // Имя
        //public string LastName { get; set; } // Фамилия
        //public string Email { get; set; } // Email
        //public string PhoneNumber { get; set; } // Номер телефона
        //[JsonPropertyName ("text")]
        public string Text { get; set; } // Текст резюме
        //public string Skills { get; set; } // Навыки соискателя работы
        //public string Education { get; set; } // Образование
        //public int WorkExperience { get; set; } // Опыт работы
        public ResumeModel(string firstName, string lastName, string email, string phoneNumber, string text, string skills, string education, int workExperience)
        {
            Id = Guid.NewGuid().ToString(); // Генерируем уникальный идентификатор резюме
            //FirstName = firstName;
            //LastName = lastName;
            //Email = email;
            //PhoneNumber = phoneNumber;
            Text = text;
            //Skills = skills;
            //Education = education;
            //WorkExperience = workExperience;
        }
        public ResumeModel(string text)
        {
            Id = Guid.NewGuid().ToString(); // Генерируем уникальный идентификатор резюме
            Text = text;            
        }
    }

}
