// import PersonalDataCabinet from "./PersonalDataCabinet";
import Sidebar from "./Sidebar"
import { Outlet } from 'react-router-dom';

const styles = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%'
    },
    content: {
        padding: '20px',
    }
};

export default function PersonalCabinet() {

    return (
        <div className="app-container" style={styles.appContainer}>
            <Sidebar />
            <Outlet/>
        </div>
    )
}