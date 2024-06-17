export default function validateCredentials(username, password, password2=password) {
    // Проверка username: только латинские буквы и цифры
    const usernameRegex = /^[A-Za-z0-9]{4,}$/;
    
    // Проверка password: минимум 8 символов, может содержать латинские буквы и цифры, но цифра не обязательна
    const passwordRegex = /^[A-Za-z\d]{4,}$/;
  
    const isUsernameValid = usernameRegex.test(username);
    const isPasswordValid = passwordRegex.test(password);
  
    if (!isUsernameValid) {
      return { isValid: false, msg: "Некорректное имя пользователя" };
    }
  
    if (!isPasswordValid) {
        return { isValid: false, msg: "Некорректный пароль" };
    }
    if (password != password2) 
        return  { isValid: false, msg: "Разные пароли" }
  
    return { isValid: true, msg: '' }
  }
