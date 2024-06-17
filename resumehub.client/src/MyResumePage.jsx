import { useEffect, useState } from 'react';
import Resume from './Resume'; 
import styles from './MyResumePage.module.css'; 
import getUserData from './getUserData';
import LoadingPage from './LoadingPage';
import sendResume from './sendResume';
import getResume from './getResume';
import Message from './Message';

function MyResumePage() {
    const [aboutMeText, setAboutMeText] = useState('');

    const [userData, setUserData] = useState(null);
    const [loadFinished, setLoadFinished] = useState(false);
    const [message, setMessage] = useState(<Message text='' type='normal'/>);
    const [message2, setMessage2] = useState(<Message text='' type='normal'/>);
    const [dataLoadedSuccessfully, setDataLoadedSuccessfully] = useState(false);
    let inputWas = false;

    useEffect(() => {
        if (!userData) getUserData(localStorage.getItem('username'))
        .then(data => {
            
            setUserData(data);
            setDataLoadedSuccessfully(true);
            setMessage(<Message text="Данные загружены" type='success'/>);
        })
        .catch(() => {
            setMessage(<Message text='Не удалось получить данные, проверьте что они заполнены в личном кабинете' type={'error'}/>);
        })
        .finally(() => setLoadFinished(true));

        if (!inputWas) {
            getResume(localStorage.getItem('username'))
            .then(resume => {
                setAboutMeText(resume.text);
                setMessage2(<Message text="Найдено загруженное ранее резюме" type='success'/>);
            })
            .catch(() => {
                setMessage2(<Message text="Не удалось найти ранее загруженные резюме" type='error'/>)
            });
        }

    }, [])

    return (!loadFinished ? <LoadingPage/> :
        <div className={styles.pageContainer}>
            <div className={styles.resumeContainer}>
                {!userData ? <></> : <Resume {...userData} aboutMe={aboutMeText} />}
                {message}
                <textarea
                    className={styles.textarea}
                    value={aboutMeText}
                    onChange={(e) => {
                        inputWas = true;
                        setAboutMeText(e.target.value)
                    }}
                    placeholder="Расскажите о себе..."
                />
                {message2}
                <div className={styles.btnContainer}>
                    <button className={styles.btn}
                    onClick={
                        async () => {
                            await sendResume(localStorage.getItem('username'), aboutMeText);
                            setMessage(<Message text="Данные обновлены" type='success'/>)
                        }
                    }>Разместить резюме</button>
                    {dataLoadedSuccessfully 
                        ? <button className={styles.btn}>Удалить ранее загруженное резюме</button>
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default MyResumePage;