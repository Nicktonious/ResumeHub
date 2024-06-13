import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAuth } from './AppContext';
import PersonalDataCabinet from './PersonalDataCabinet';

const styles = {
    container: {
        maxWidth: '300px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: 'white',
        cursor: 'pointer',
    },
    toggleButton: {
        marginTop: '15px',
        background: 'none',
        border: 'none',
        color: '#007bff',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    centerText: {
        textAlign: 'center',
    },
};

const serverUrl = 'https://localhost:7011';

const AccountPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    let { isAuthenticated, setIsAuthenticated } = useAuth();
    // const navigate = useNavigate();

    const handleAuth = async (username, password) => {
        try {
            console.log({username, password});
            const url = isLoginView ? `${serverUrl}/api/login` : `${serverUrl}/api/register`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error('Ошибка аутентификации');
            }
            const data = await response.json();
            localStorage.setItem('authToken', data.token); // Сохраняем токен
            localStorage.setItem('username', username); // Сохраняем токен
            setIsAuthenticated(true)
            
            // navigate('/dashboard'); // Перенаправляем на страницу личного кабинета
        } catch (error) {
            console.error('Ошибка', error);
        }
    }

    const logRegForm = (
        <div style={styles.container}>
            {/* <h2>{isLoginView ? 'Вход в аккаунт' : 'Создание аккаунта'}</h2> */}
            <div>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />

                {!isLoginView ? (<input
                    type="password"
                    placeholder="Повторите пароль"
                    style={styles.input}
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                />) : (<div></div>) }

                <button onClick={()=>handleAuth(username, password)} style={styles.button}>
                    {isLoginView ? 'Войти' : 'Зарегистрироваться'}
                </button>
                <div style={styles.centerText}>
                    {isLoginView ? (
                        <button onClick={() => setIsLoginView(false)} style={styles.toggleButton}>Создать аккаунт</button>
                    ) : (
                        <button onClick={() => setIsLoginView(true)} style={styles.toggleButton}>Войти в аккаунт</button>
                    )}
                </div>
            </div>
        </div>
    );

    return isAuthenticated ? <PersonalDataCabinet/> : logRegForm;
};


export default AccountPage;