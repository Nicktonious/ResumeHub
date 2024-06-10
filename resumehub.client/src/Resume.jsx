import PropTypes from 'prop-types'

const styles = {
    container: {
        border: '1px solid #ddd',
        margin: '10px',
        padding: '20px',
        borderRadius: '5px',
        minWidth: '55%'
    },
    list: {
        listStyleType: 'none',
        paddingLeft: '0',
    },
    listItem: {
        marginBottom: '5px',
    },
};

function Resume({ fullName, email, position, experience, skills }) {
    return (
        <div style={styles.container}>
            <h2>{fullName}</h2>
            <p><strong>Почта:</strong> {email}</p>
            <p><strong>Должность/Профессия:</strong> {position}</p>
            <p><strong>Опыт работы:</strong> {experience} год(а)</p>
            <p><strong>Навыки:</strong></p>
            <ul style={styles.list}>
                {skills.map((skill, index) => (
                    <li key={index} style={styles.listItem}>{skill}</li>
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
    skills: PropTypes.arrayOf(PropTypes.string)
}