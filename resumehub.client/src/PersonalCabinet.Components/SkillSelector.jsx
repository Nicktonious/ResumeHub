// SkillSelector.js
import styles from './PersonalCabinet.module.css';
import PropTypes from 'prop-types'

const SkillSelector = ({ skillsOptions, addSkill, customSkill, setCustomSkill, addCustomSkill }) => {
    return (
        <div>
            <div className={styles.skillsOptions}>
                {skillsOptions.map((skill, index) => (
                    <div key={index} className={styles.skillOption} onClick={() => addSkill(skill)}>
                        {skill}
                    </div>
                ))}
            </div>
            <input
                className={styles.input}
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Предотвращаем отправку формы
                        addCustomSkill(); // Вызываем функцию добавления навыка
                    }
                }}
                placeholder="Введите ваш навык"
            />
            <button type="button" onClick={addCustomSkill} className={styles.addButton}>Добавить</button>
        </div>
    );
};

export default SkillSelector;

SkillSelector.propTypes = {
    skillsOptions: PropTypes.arrayOf(String),
    addSkill: PropTypes.func,
    customSkill: PropTypes.string,
    setCustomSkill: PropTypes.func,
    addCustomSkill: PropTypes.arrayOf(PropTypes.func)
}