import { useState } from 'react';
// import styles from './ResumeFilter.module.css'; 
import PropTypes from 'prop-types'

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        width: '40%',
        margin: '20px auto',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: '15px',
    },
    input: {
        display: 'block',
        backgroundColor: '#F6F5F5',
        border: '1px solid #ddd',
        /* margin: 10px; */
        padding: '10px',
        borderRadius: '5px',
        width: 'auto',
        height: 'auto'
    },
    label: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '5px',
        fontWeight: '500',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.2s',
    }
  };

styles.button[':hover'] = {
    backgroundColor: '#red'
};

function ResumesFilter({ onFilter }) {
    const [specialization, setSpecialization] = useState('');
    const [skills, setSkills] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({
            specialization,
            skills: skills.split(',').map(skill => skill.trim()),
        });
    };

    return (
        <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.field}>
                <label htmlFor="position">Должность:</label>
                <input
                    id="position"
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    style={styles.input}
                />
            </div>
            <div style={styles.field}>
                <label htmlFor="skills">Навыки (через запятую):</label>
                <input
                    id="skills"
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    style={styles.input}
                />
            </div>
            <button type="submit" style={styles.button}>Фильтровать</button>
        </form>
    );
}

ResumesFilter.propTypes = {
    onFilter: PropTypes.func
}
export default ResumesFilter;