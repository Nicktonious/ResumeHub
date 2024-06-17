import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ResumeList from './ResumeList.jsx';
import LoginPage from './LoginPage.jsx';
import PersonalCabinet from './PersonalCabinet.jsx';
import { AppContextProvider } from './AppContext.jsx';
import PersonalDataCabinet from './PersonalDataCabinet.jsx';
import MyResume from './MyResumePage.jsx';
import LogoutPage from './LogoutPage.jsx';
// import { Navigate } from 'react-router-dom';
import HomePage from './HomePage.jsx';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: 'resumes',
                element: <ResumeList />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'logout',
                element: <LogoutPage/>
            },
            {
                path: 'account/*',
                element: <PersonalCabinet />,
                children: [
                    {
                        path: 'data',
                        element: <PersonalDataCabinet/>
                    },
                    {
                        path: 'resume',
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
        </AppContextProvider>
    </React.StrictMode>
)
