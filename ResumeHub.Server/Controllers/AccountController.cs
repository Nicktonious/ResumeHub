using Microsoft.AspNetCore.Mvc;
using ResumeHub.Server;
using ResumeHub.Server.Models;
using ResumeHub.Server.Services;
using System.Security.Cryptography;
using System.Text;

[Route("api")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IFileUserService _fileUserService;
    private readonly IJwtTokenService _jwtTokenService;

    public AccountController(IFileUserService fileUserService,
                             IJwtTokenService jwtTokenService)
    {
        _fileUserService = fileUserService;
        _jwtTokenService = jwtTokenService;
    }

    [Route("get")]
    [HttpGet]
    public IEnumerable<int> Gett()
    {
        return Enumerable.Range(1, 5).ToArray();
    }

    [Route("register")]
    [HttpPost]
    public IActionResult Register([FromBody] RegisterModel data)
    {
        string username = data.Username;
        string password = data.Password;
        User? existingUser = _fileUserService.GetUser(username);
        if (existingUser is User)
        {
            return BadRequest("Пользователь уже существует.");
        }

        // Хеширование пароля перед сохранением
        var passwordHash = HashPassword(password);

        var newUser = new User(Guid.NewGuid(), username, passwordHash);
        _fileUserService.SaveUser(newUser);

        var tokenString = _jwtTokenService.GenerateToken(newUser.Id.ToString());
        return Ok(new { Token = tokenString });
    }

    [Route("login")]
    [HttpPost]
    public IActionResult Login([FromBody] RegisterModel data)
    {
        string username = data.Username;
        string password = data.Password;
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

        var tokenString = _jwtTokenService.GenerateToken(user.Id.ToString());
        return Ok(new { Token = tokenString });
    }

    [Route("updateUserData")]
    [HttpPatch]
    public IActionResult UpdateUserData([FromBody] UserDataModel data)
    {
        if (_fileUserService.UpdateUsersData(data))
            return Ok(data);
        return BadRequest();

    }

    [Route("userdata")]
    [HttpPost]
    public IActionResult GetUserData([FromBody] UsernameModel data)
    {
        var foundData = _fileUserService.GetUsersData().FirstOrDefault(d => d.Username == data.Username);
        if (foundData != null)
        {
            return Ok(foundData);
        }
        return NotFound();
    }
    [Route("resume")]
    [HttpPost]
    public IActionResult AddResume([FromBody] UsernameModel data)
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