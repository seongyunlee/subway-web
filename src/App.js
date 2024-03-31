import './css/App.css';
import Home from "./pages/Home";
import './css/common.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FillBlankGame from "./pages/fillBlank/Game";
import Result from "./pages/Result";
import Router from "./router/Router";

function App() {
  return (
    <Router></Router>
  );
}

export default App;
