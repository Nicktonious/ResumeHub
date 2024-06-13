// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

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
    return (
        <nav style={styles}>
            <Link to = "/" style={linkStyle}>Главная</Link>
            <Link to = "/resumes" style={linkStyle}>Резюме</Link>
            <Link to = "/vacancies" style={linkStyle}>Вакансии</Link>
            <Link to = "/account" style={linkStyle}>Аккаунт</Link>
            <Link to = "/cabinet/mydata" style={linkStyle}>Личный кабинет</Link>
        </nav>
    );
}