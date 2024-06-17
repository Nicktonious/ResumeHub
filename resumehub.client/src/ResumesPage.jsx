// import { useEffect, useState } from 'react';
// import { getResumes } from './getResume';
// import LoadingPage from './LoadingPage';
// import ResumeList from './ResumeList';

// function ResumesPage() {
//     const [resumes, setResumes] = useState(null);

//     useEffect(() => {
//         if (!resumes) 
//             getResumes()
//             .then(r => {
//                 setResumes(r);
//             })
//             .catch(() => {
//                 ResumeList
//             })
//     }, []);


//     return !resumes ? <LoadingPage/> : (
//         <div>
//             {resumes.map((resume) => {
//                 <div>{resume}</div>
//             })}
//         </div>
//     );
// }

// export default ResumesPage;