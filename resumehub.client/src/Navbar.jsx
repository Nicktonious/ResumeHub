// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from './AppContext';

let styles = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '60px',
    backgroundColor: '#333',
    color: 'white',
    padding: '0 10px'
};

let linkStyle = {
    color: 'white',
    textDecoration: 'none'
};

export default function Navbar() {
    const { isAuthenticated } = useAuth();
    return (
        <nav style={styles}>
            <Link to = '/' style={linkStyle}>Главная</Link>
            <Link to = '/resumes' style={linkStyle}>Резюме</Link>
            {isAuthenticated 
                ? <Link to = '/account' style={linkStyle}>Аккаунт</Link>
                : <Link to= '/login' style={linkStyle}>Войти</Link>}
            {isAuthenticated ? <Link to = '/logout' style={linkStyle}>Выйти</Link> : <></>}
            {/* <Link to = '/cabinet/mydata' style={linkStyle}>Личный кабинет</Link> */}
        </nav>
    );
}