import Resume from "./Resume";

let listStyle = {
    display: 'flex',
    gap: '25px',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px'
};

export default function ResumeList() {
    const resumes = [
        {
            id: 1,
            fullName: 'Алексей Алексеев',
            email: 'aleksey@example.com',
            position: 'Backend Developer',
            experience: '5',
            skills: ['Node.js', 'Express', 'MongoDB', 'Docker', 'React', 'Redux', 'TypeScript', 'Webpack'],
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