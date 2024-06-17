import PropTypes from 'prop-types'

import styles from './Resume.module.css'

function Resume({ name, surname, email, specialization, qualification='', experience, text, skills }) {
    return (
        <div className={styles.container}>
            <div className={styles.text}>{`${name} ${surname}`}</div>
            <div className={styles.text}>{email}</div>
            <div className={styles.text}>{`${specialization} ${qualification.length? ': '+qualification:''}`}</div>
            <div className={styles.text}>Опыт работы: {experience} год(а)</div>
            <div className={styles.text}>Навыки:</div>
            <ul className={styles.list}>
                {skills.map((skill, index) => (
                    <li key={index} className={styles.listItem}>{skill}</li>
                ))}
            </ul>
            {text?.length && (
                <div className={styles.text}>
                    <div className={styles.text}>{text}</div>
                </div>
            )}
        </div>
    );
}

export default Resume;

Resume.propTypes = {
    name: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
    specialization: PropTypes.string,
    experience: PropTypes.number,
    skills: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    qualification: PropTypes.string
}