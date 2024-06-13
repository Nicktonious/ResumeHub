import { useState, useEffect } from 'react';
import styles from './PersonalDataCabinet.module.css';
import updateUserProfile from './updateUserProfile';
import LoadingPage from './LoadingPage';
import getUserData from './getUserData.jsx';

const specializations = [
    'Разработка', 'Тестирование', 'Аналитика', 'Дизайн', 'Менеджмент',
    'Информационная безопасность', 'ИИ', 'Поддержка', 'Маркетинг', 'HR',
];
const defaultData = {
    fullName: '',
    gender: '',
    birthDate: '',
    specialization: '',
    qualification: '',
    skills: [],
};

const qualifications = ['junior', 'middle', 'senior', 'lead'];
const skillsOptions = [
    "Git",
    "SQL",
    "JavaScript",
    "HTML",
    "Python",
    "CSS",
    "PostgreSQL",
    "Linux",
    "ООП (Объектно-ориентированное программирование)",
    "Управление проектами",
    "Docker",
    "React",
    "Английский язык",
    "MySQL",
    "Java",
    "PHP",
    "TypeScript",
    "Управление людьми",
    "Адаптивная верстка",
    "C#",
    "Базы данных",
    "Node.js",
    "Adobe Photoshop",
    "Подбор специалистов",
    "Веб-разработка",
    "Angular",
    "Vue.js",
    "Cloud Computing (Облачные вычисления)",
    "Machine Learning (Машинное обучение)",
    "Data Science (Наука о данных)",
    "UI/UX дизайн",
    "Kubernetes",
    "Swift (разработка под iOS)",
    "Kotlin (разработка под Android)",
    "MongoDB",
    "Redis",
    "Elasticsearch",
    "GraphQL",
    "DevOps",
    "Безопасность приложений"
];

function PersonalDataCabinet() {
    const [userData, setUserData] = useState(null);

    const [customSkill, setCustomSkill] = useState('');

    useEffect(() => {
        if (localStorage.getItem('userData'))
            setUserData(localStorage('userData'))
        else {
            getUserData(localStorage.getItem('username'))
            .then(data => {
                data.skills = data.skills || [];
                setUserData(data);
                localStorage.setItem('userData', data)
            }).catch(() => {
                console.log('err');
                setUserData(defaultData);
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value || "",
        }));
    };

    const handleCustomSkillChange = (e) => {
        setCustomSkill(e.target.value);
    };

    const addSkill = (skill) => {
        if (skill && !userData.skills.includes(skill)) {
            setUserData(prevState => ({
                ...prevState,
                skills: [...prevState.skills, skill],
            }));
        }
    };

    const addCustomSkill = () => {
        if (customSkill && !userData.skills.includes(customSkill)) {
            setUserData(prevState => ({
                ...prevState,
                skills: [...prevState.skills, customSkill],
            }));
            setCustomSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setUserData(prevState => ({
            ...prevState,
            skills: prevState.skills.filter(skill => skill !== skillToRemove),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно отправить обновленные данные на сервер
    };

    return !(Object.values(userData||{}).filter(v => typeof v === 'string').length) ? <LoadingPage/> : (
        <form onSubmit={handleSubmit} className={styles.container}>
            <label className={styles.label}>ФИО:</label>
            {console.log('userData')}
            {console.log(userData)}
            <input className={styles.input} type="text" name="fullName" value={userData.fullName} onChange={handleInputChange} />

            <label className={styles.label}>Пол:</label>
            <select className={styles.select} name="gender" value={userData.gender} onChange={handleInputChange}>
                <option value="">Выберите пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
            </select>

            <label className={styles.label}>Дата рождения:</label>
            <input className={styles.input} type="date" name="birthDate" value={userData.birthDate} onChange={handleInputChange} />

            <label className={styles.label}>Специализация:</label>
            <select
                className={styles.select}
                name="specialization"
                value={userData.specialization}
                onChange={handleInputChange}
            >
                <option value="">Выберите специализацию</option>
                {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                ))}
                <option value="other">Другое</option>
            </select>
            {userData.specialization === 'other' && (
                <input
                    className={styles.input}
                    type="text"
                    name="customSpecialization"
                    value={userData.customSpecialization}
                    placeholder="Укажите специализацию"
                    onChange={handleInputChange}
                />
            )}

            <label className={styles.label}>Квалификация:</label>
            <select
                className={styles.select}
                name="qualification"
                value={userData.qualification}
                onChange={handleInputChange}
            >
                <option value="">Выберите квалификацию</option>
                {qualifications.map(qual => (
                    <option key={qual} value={qual}>{qual}</option>
                ))}
            </select>

            <div>
                <div>
                    <label className={styles.label}>Навыки:</label>
                    <div className={styles.skillsOptions}>
                        {skillsOptions.map((skill, index) => (
                            <div key={index} className={styles.skillOption} onClick={() => addSkill(skill)}>
                                {skill}
                            </div>
                        ))}
                    </div>
                    <input
                        className={styles.input}
                        type="text"
                        value={customSkill}
                        onChange={handleCustomSkillChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault(); // Предотвращаем отправку формы
                              addCustomSkill(); // Вызываем функцию добавления навыка
                            }}}
                        placeholder="Введите ваш навык"
                    />
                    <button type="button" onClick={addCustomSkill} className={styles.addButton}>Добавить</button>
                </div>

                <ul className={styles.skillList}>
                    {userData.skills.map((skill, index) => (
                        <li key={index} className={styles.skillItem}>
                            {skill}
                            <button className={styles.skillRemoveButton} onClick={() => removeSkill(skill)}>❌</button>
                        </li>
                    ))}
                </ul>

            </div>
            <button type="submit" className={styles.submitButton} onClick={
                () => {
                    updateUserProfile(Object.assign(userData, {
                        username: localStorage.getItem('username')
                    }))
                    .then(data => setUserData(data))
                }
            }>Сохранить изменения</button>
        </form>
    );
}

export default PersonalDataCabinet;