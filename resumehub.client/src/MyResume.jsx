import { useEffect, useState } from 'react';
import Resume from './Resume'; // Предполагается, что компонент Resume импортируется
import styles from './MyResume.module.css'; // Импортируем стили
import getUserData from './getUserData';
import LoadingPage from './LoadingPage';

function MyResumePage() {
    const [aboutMeText, setAboutMeText] = useState('');

    let [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!userData) getUserData(localStorage.getItem('username'))
        .then(data => {
            setUserData(Object.assign(data))
        });

    }, [])

    return (userData == null ? <LoadingPage/> :
        <div className={styles.pageContainer}>
            <div className={styles.resumeContainer}>
                <Resume {...userData} aboutMe={aboutMeText} />
                <textarea
                    className={styles.textarea}
                    value={aboutMeText}
                    onChange={(e) => setAboutMeText(e.target.value)}
                    placeholder="Расскажите о себе..."
                />
                <div className={styles.btnContainer}>
                    <button className={styles.btn}>Разместить резюме</button>
                    <button className={styles.btn}>Обратиться к помощнику</button>
                </div>
            </div>
        </div>
    );
}

export default MyResumePage;