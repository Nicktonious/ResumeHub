//import styles from './Message.module.css';
import PropTypes  from 'prop-types';

const color = {
    normal: '#000',  
    error: '#f00',
    success: '#0f0'
}
const getStyles = (type) => ({
    padding: '10px',
    // margin: '10px 0',
    // border: '1px solid #ccc',
    // borderRadius: '5px',
    color: color[type]
})

const Message = ({ text, type }) => {
    return (
        <div className={`message`} style={getStyles(type)}>
            {text}
        </div>
    );
};

export default Message;

Message.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string
}