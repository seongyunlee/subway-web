import './css/App.css';
import './css/common.css'
import Router from "./router/Router";
import {clarity} from 'react-microsoft-clarity';


function App() {

    clarity.init('mt8dtb7v4p')
    
    return (
        <div className="container">
            <Router></Router>

        </div>
    );
}

export default App;
