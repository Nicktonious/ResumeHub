const sendResume = async (username, text) => {

    // Создаем объект резюме
    const resume = { username: username, text: text };

    try {
        const response = await fetch('https://localhost:7011/resumes/resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resume),
        });

        if (!response.ok) {
            throw new Error('Не удалось отправить данные');
        }

    } catch (error) {
        console.error('Ошибка при отправке резюме:', error);
    }
};

export default sendResume;