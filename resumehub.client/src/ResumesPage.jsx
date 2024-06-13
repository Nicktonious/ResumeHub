import { useEffect, useState } from 'react';

function ResumesPage() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        getResumes();
    }, []);

    const getResumes = async function () {
        try {
            const response = await fetch('https:localhost:7011/resumes');
            const data = await response.json();
            setResumes(data);
        
        } catch (error) {
            console.error('������ ��� �������� �������:', error);
        }
    }

    return (
        <div>
            {resumes.map((resume) => {
                <div>{resume}</div>
            })}
        </div>
    );
}

export default ResumesPage;