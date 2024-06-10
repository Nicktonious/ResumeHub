// src/components/ResumeList.jsx
// import React from 'react';
import Resume from "./Resume";

let listStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px'
};

// let resumeStyle = {
//     width: '80%',
//     padding: '10px',
//     margin: '10px 0',
//     border: '1px solid #ddd',
//     borderRadius: '4px'
// };

export default function ResumeList() {
    const resumes = [
        {
            id: 1,
            fullName: 'Алексей Алексеев',
            email: 'aleksey@example.com',
            position: 'Backend Developer',
            experience: '5',
            skills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
        },
        {
            id: 2,
            fullName: 'Мария Мариева',
            email: 'maria@example.com',
            position: 'Frontend Developer',
            experience: '3',
            skills: ['React', 'Redux', 'TypeScript', 'Webpack'],
        },
        {
            id: 3,
            fullName: 'Иван Иванов',
            email: 'ivan@example.com',
            position: 'Full Stack Developer',
            experience: '4',
            skills: ['React', 'Node.js', 'Express', 'MongoDB'],
        },
        {
            id: 4,
            fullName: 'Елена Еленова',
            email: 'elena@example.com',
            position: 'Data Scientist',
            experience: '2',
            skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow'],
        },
    ];

    return (
        <div style={listStyle}>
            {resumes.map((resumeData, i) => (
                <Resume key={i} {...resumeData} />
            ))}
        </div>
    );
}