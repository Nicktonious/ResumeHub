using Microsoft.AspNetCore.Mvc;
using ResumeHub.Server;
using ResumeHub.Server.Services;
using System.Security.Cryptography;
using System.Text;

[Route("auth")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly FileUserService _fileUserService;

    public AccountController(FileUserService fileUserService)
    {
        _fileUserService = fileUserService;
    }

    [HttpPost("register")]
    public IActionResult Register(string username, string password)
    {
        var existingUser = _fileUserService.GetUser(username);
        if (existingUser != null)
        {
            return BadRequest("Пользователь уже существует.");
        }

        // Хеширование пароля перед сохранением
        var passwordHash = HashPassword(password);

        var newUser = new User(Guid.NewGuid(), username, passwordHash);
        _fileUserService.SaveUser(newUser);

        return Ok("Пользователь успешно зарегистрирован.");
    }

    [HttpPost("login")]
    public IActionResult Login(string username, string password)
    {
        var user = _fileUserService.GetUser(username);
        if (user == null)
        {
            return NotFound("Пользователь не найден.");
        }

        // Проверка хеша пароля
        var passwordHash = HashPassword(password);
        if (user.PasswordHash != passwordHash)
        {
            return Unauthorized("Неверный пароль.");
        }

        // Здесь должна быть логика создания и отправки токена аутентификации,
        // но для простоты мы просто вернем ОК.
        return Ok("Успешный вход в систему.");
    }

    private string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            return hash;
        }
    }
}