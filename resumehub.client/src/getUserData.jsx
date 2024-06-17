import PropTypes from 'prop-types'

export default async function getUserData(username) {
    try {
        const response = await fetch('https://localhost:7011/api/userdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
                // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({ username: username })
        })

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        return await response.json();

    } catch (e) {
        throw new Error(`Ошибка при получении данных: ${e.message}`);
    }
}

getUserData.propTypes = {
    username: PropTypes.string
}