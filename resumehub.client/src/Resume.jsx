import PropTypes from 'prop-types'

import styles from './Resume.module.css'

function Resume({ fullName, email, position, experience, aboutMe, skills }) {
    return (
        <div className={styles.container}>
            <div className={styles.text}>{fullName}</div>
            <div className={styles.text}>Почта: {email}</div>
            <div className={styles.text}>Должность/Профессия: {position}</div>
            <div className={styles.text}>Опыт работы: {experience} год(а)</div>
            {aboutMe && (
                <div className={styles.text}>
                    <h3>О себе:</h3>
                    <div className={styles.text}>{aboutMe}</div>
                </div>
            )}
            <div className={styles.text}>Навыки:</div>
            <ul className={styles.list}>
                {skills.map((skill, index) => (
                    <li key={index} className={styles.listItem}>{skill}</li>
                ))}
            </ul>
        </div>
    );
}

export default Resume;

Resume.propTypes = {
    fullName: PropTypes.string,
    email: PropTypes.string,
    position: PropTypes.string,
    experience: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    aboutMe: PropTypes.string
}