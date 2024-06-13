import styles from './LoadingPage.module.css'; // Импортируем стили

function LoadingPage() {
    return (
        <div className="loadingPage" style={styles}>
            <div className="loader"></div>
        </div>
    );
}

export default LoadingPage;