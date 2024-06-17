const getResume = async (username) => {

    const response = await fetch(`https://localhost:7011/resumes/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Не удалось получить данные');
    }
    let resume = await response.json();
    return resume;  
};

const getResumes = async () => {
    const response = await fetch(`https://localhost:7011/resumes/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Не удалось получить данные');
    }
    let result = await response.json();

    return result.usersData.map(data => {
        let aboutMe = result.resumes.find(r => r.username == data.username)?.text;
        data.text = aboutMe;
        return data;
    });
}

export { getResumes, getResume };
export default getResume;