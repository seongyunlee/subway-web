import {BrowserRouter, Route, Routes, useRoutes} from "react-router-dom";
import Home from "../pages/Home";
import FillBlankGame from "../pages/fillBlank/Game";
import Result from "../pages/Result";
import FillBankGuide from "../pages/fillBlank/Guide";
import BestRouteGame from "../pages/bestRoute/Game";
import BestRouteGuide from "../pages/bestRoute/Guide";
import TravelGame from "../pages/travel/Game";
import TravelGuide from "../pages/travel/Guide";
import PickLine from "../pages/travel/PickLine";

export default function Router() {
return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/fill-blank/game" element={<FillBlankGame/>}/>
            <Route path="/result" element={<Result/>}/>
            <Route path="/fill-blank/guide" element={<FillBankGuide/>}/>
            <Route path="/best-route/game" element={<BestRouteGame/>}/>
            <Route path="/best-route/guide" element={<BestRouteGuide/>}/>
            <Route path="/travel/game" element={<TravelGame/>}/>
            <Route path="/travel/guide" element={<TravelGuide/>}/>
            <Route path="/travel/pick" element={<PickLine/>}/>
        </Routes>
    </BrowserRouter>
)
}