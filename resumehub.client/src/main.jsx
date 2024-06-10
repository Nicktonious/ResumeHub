import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ResumeList from './ResumeList.jsx';
import AccountPage from '../AccountPage.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
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
                element: <AccountPage/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
