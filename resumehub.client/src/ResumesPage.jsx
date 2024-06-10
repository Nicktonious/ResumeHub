import { useEffect, useState } from 'react';

// import AppRoutes from './AppRoutes';
// import { Route } from 'react-router-dom'



function ResumesPage() {
    const [resumes, setResumes] = useState([]);
    const [text, setText] = useState();

    useEffect(() => {
        getResumes();
    }, []);
    async function getResumes() {
        const response = await fetch(`${window.location.href}resumes`);
        const data = await response.json();
        setResumes(data);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://localhost:7011/resumes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: text })
            });
            console.log(response);
            const responseData = await response.json();
            setResumes(JSON.stringify(responseData));
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                </label>
                <textarea onChange={(event) => setText(event.target.value)}>

                </textarea>
                <button type="submit" value="Submit" />
            </form>
            {resumes.map((resume) => {
                <div>{resume}</div>
            })}
        </div>
    );
}

export default ResumesPage;