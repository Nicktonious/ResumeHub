export default function validateUserData(userData) {
    // Проверка email
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        return { isValid: false, msg: "Некорректно указан email" };
    }

    // Проверка возраста
    if (typeof +userData.age != 'number' || +userData.age < 16 || +userData.age > 99) {
        return { isValid: false, msg: "Некорректно указан возраст" };
    }

    if (typeof +userData.experience != 'number' || +userData.experience < 0 || +userData.experience > 80) {
        return { isValid: false, msg: "Некорректно указан опыт работы" };
    }

    // Проверка пола
    if (typeof userData.gender !== 'string' || (userData.gender !== 'male' && userData.gender !== 'female')) {
        return { isValid: false, msg: "Некорректно указан пол" };
    }

    // Проверка имени и фамилии (без цифр и спецсимволов)
    const nameSurnameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    if (!nameSurnameRegex.test(userData.name) || !nameSurnameRegex.test(userData.surname)) {
        return { isValid: false, msg: "Имя или фамилия содержат недопустимые символы" };
    }

    // Проверка квалификации, специализации (без спецсимволов, которые могут повредить JSON)
    const textRegex = /^[A-Za-zА-Яа-яЁё0-9\s-]+$/;
    if (!textRegex.test(userData.qualification) || !textRegex.test(userData.specialization)) {
        return { isValid: false, msg: "Квалификация или специализация содержат недопустимые символы" };
    }

    // Проверка навыков (массив строк без спецсимволов)
    if (!Array.isArray(userData.skills) || !userData.skills.every(skill => typeof skill === 'string' && textRegex.test(skill)) || userData.skills.length < 3) {
        if (userData.skills.length < 3) 
            return { isValid: false, msg: "Введите хотя бы 3 навыка" };
        return { isValid: false, msg: "Навыки содержат недопустимые символы" };
    }

    return { isValid: true, msg: '' };
}
