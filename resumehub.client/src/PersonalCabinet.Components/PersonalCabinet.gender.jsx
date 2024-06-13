import { useState } from 'react';
import styles from './PersonalCabinet.module.css';

export default function Gender() {
    const [gender, setGender] = useState();

    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        setGender(e.target.value);
    };
    return (<div>
    <label className={styles.label}>Пол:</label>
    <select className={styles.select} name="gender" value={gender} onChange={handleInputChange()}>
        <option value="">Выберите пол</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
    </select>
    </div>)
}