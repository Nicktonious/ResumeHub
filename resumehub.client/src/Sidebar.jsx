import { Link } from 'react-router-dom';

// Обновленный объект стилей
const styles = {
    sidebar: {
        display: 'flex', // Используем flex для горизонтального расположения
        justifyContent: 'space-around', // Распределяем пространство между блоками
        width: '100%', // Задаем ширину
        // padding: '20px',
        backgroundColor: '#58CADC' 
        // '#1e3a45'

    },
    block: {
        display: 'block', // Устанавливаем display: block для ссылок
        // minHeight: '60px',
        // maxWidth: '90px',
        // border: '1px solid #ccc',
        padding: '15px',
        textAlign: 'center',
        textDecoration: 'none', // Убираем подчеркивание у ссылок
        color: 'white', // Цвет текста ссылок
    },
};

function Sidebar() {
    return (
        <div style={styles.sidebar}>
            <Link to="mydata" style={styles.block}>Личные данные</Link>
            <Link to="myresume" style={styles.block}>Мое резюме</Link>
            {/* Добавьте дополнительные блоки-ссылки при необходимости */}
        </div>
    );
}

export default Sidebar;