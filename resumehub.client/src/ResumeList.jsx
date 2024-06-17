import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import Resume from "./Resume";
import { getResumes } from "./getResume";
import ResumesFilter from "./ResumesFilter";
// import getUserData from "./getUserData";

let listStyle = {
    display: 'flex',
    gap: '25px',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px'
};

const defaultResumes = [
    {
        id: 1,
        name: 'Алексей',
        surname: 'Алексеев',
        email: 'aleksey@example.com',
        specialization: 'Backend Developer',
        qualification: 'senior',
        experience: 5,
        skills: ['Node.js', 'Express', 'MongoDB', 'Docker', 'React', 'Redux', 'TypeScript', 'Webpack'],
    },
    {
        id: 2,
        name: 'Мария',
        surname: 'Мариева',
        email: 'maria@example.com',
        specialization: 'Frontend Developer',
        experience: 3,
        skills: ['React', 'Redux', 'TypeScript', 'Webpack'],
    },
    {
        id: 3,
        name: 'Иван',
        surname: 'Иванов',
        email: 'ivan@example.com',
        specialization: 'Full Stack Developer',
        experience: 4,
        skills: ['React', 'Node.js', 'Express', 'MongoDB'],
    },
    {
        id: 4,
        name: 'Елена',
        surname: 'Еленова',
        email: 'elena@example.com',
        specialization: 'Data Scientist',
        experience: 2,
        skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow'],
    },
];

export default function ResumeList() {
    const [resumes, setResumes] = useState(null);
    const [allResumes, setAllResumes] = useState(null);

    const onFilter = (filters) => {
        const filteredResumes = allResumes.filter((resume) => {
            const positionMatch = filters.specialization
                                  ? resume.specialization.toLowerCase().includes(filters.specialization.toLowerCase()) : true;
            const skillsMatch  = !filters.skills.length 
                                  ? filters.skills.every(skill => resume.skills.includes(skill)): true;
            return positionMatch && skillsMatch;
        });
        setResumes(filteredResumes);
    }

    useEffect(() => {
        if (!resumes) 
            getResumes()
            .then(result => {
                setAllResumes(result.concat(defaultResumes));
                setResumes(result.concat(defaultResumes));
            })
            .catch(() => {
                setAllResumes(defaultResumes);
                setResumes(defaultResumes);
            });
    }, []);

    return !resumes ? <LoadingPage/> : (
        <div style={listStyle}>
            <ResumesFilter onFilter={onFilter}/>
            {resumes.map((resumeData, i) => (
                <Resume key={i} {...resumeData} />
            ))}
        </div>
    );
}