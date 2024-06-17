const deleteResume = async (username) => {
    const response = await fetch(`https://localhost:7011/resumes/${username}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Не удалось удалить резюме');
    }
    return true; 
}

export default deleteResume;