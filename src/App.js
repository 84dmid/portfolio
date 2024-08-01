import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';

import NavBar from './components/NavBar';
import AppRouter from './components/AppRouter';

function App() {
    return (
        <HashRouter>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
                className="vh-100"
            >
                <NavBar />
                <AppRouter />
            </div>
        </HashRouter>
    );
}

export default App;
