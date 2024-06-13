import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ResumeList from './ResumeList.jsx';
import AccountPage from './AccountPage.jsx';
import PersonalCabinet from './PersonalCabinet.jsx';
import { AppContextProvider } from './AppContext.jsx';
import PersonalDataCabinet from './PersonalDataCabinet.jsx';
import MyResume from './MyResume.jsx';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'resumes',
                element: <ResumeList />
            },
            {
                path: 'vacancies',
                element: <div>VACANCIES</div>
            },
            {
                path: 'account',
                element: <AccountPage />
            },
            {
                path: 'cabinet/*',
                element: <PersonalCabinet />,
                children: [
                    {
                        path: 'mydata',
                        element: <PersonalDataCabinet/>
                    },
                    {
                        path: 'myresume',
                        element: <MyResume/>
                    }
                ]
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppContextProvider>
            <RouterProvider router={router} />
            {/* <App /> */}
        </AppContextProvider>
    </React.StrictMode>
)
