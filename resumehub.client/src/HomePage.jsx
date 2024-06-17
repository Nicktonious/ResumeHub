import { Link } from 'react-router-dom'; // Импортируем Link из react-router-dom для навигации

const styles = {
    container: {
      textAlign: 'center',
      padding: '50px',
      maxWidth: '60%', 
      marginLeft: 'auto', 
      marginRight: 'auto',
    },
    header: {
      color: '#3498db',
      fontSize: '32px',
      marginBottom: '20px',
      fontWeight: 'bold', 
    },
    text: {
      color: '#333',
      fontSize: '18px',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    link: {
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    footer: {
      marginTop: '20px',
      paddingTop: '20px',
      paddingBottom: '20px',
      borderTop: '1px solid #ccc', 
      fontSize: '16px',
      color: '#777', 
      textAlign: 'center',
    },
  };
  const Footer = () => (
    <div style={styles.footer}>
      &copy; {new Date().getFullYear()} ResumeHub. Все права защищены.
    </div>
  );

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>Добро пожаловать в ResumeHub!</div>
      <div style={styles.text}>
        ResumeHub — это ваш надежный помощник в создании и размещении профессиональных резюме. Наш сервис поможет вам выделиться среди кандидатов и найти работу мечты.
      </div>
      <div style={styles.text}>
        Начните с создания вашего первого резюме прямо сейчас! Перейдите на страницу <Link to="/login" style={styles.link}>входа</Link>.
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;