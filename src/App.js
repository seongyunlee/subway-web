import './css/App.css';
import './css/common.css'
import Router from "./router/Router";
import { clarity } from 'react-microsoft-clarity';
import { useEffect } from "react";

function App() {
    useEffect(() => {
        try {
            clarity.init('mt8dtb7v4p');
        } catch (e) {
            console.warn('Clarity init skipped', e);
        }
    }, []);

    return (
        <div className="container">
            <Router></Router>

        </div>
    );
}

export default App;
