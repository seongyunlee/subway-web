import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import FillBlankGame from "../pages/FillBlankGame";
import Result from "../pages/Result";
import FillBankGuide from "../pages/FillBlankGuide";
import BestRouteGame from "../pages/BestRouteGame";
import BestRouteGuide from "../pages/BestRouteGuide";
import TravelGame from "../pages/TravelGame";
import TravelGuide from "../pages/TravelGuide";
import PickLine from "../pages/TravelPickLine";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/fillblank/game" element={<FillBlankGame/>}/>
                <Route path="/result" element={<Result/>}/>
                <Route path="/fillblank/guide" element={<FillBankGuide/>}/>
                <Route path="/bestroute/game" element={<BestRouteGame/>}/>
                <Route path="/bestroute/guide" element={<BestRouteGuide/>}/>
                <Route path="/travel/game" element={<TravelGame/>}/>
                <Route path="/travel/guide" element={<TravelGuide/>}/>
                <Route path="/travel/pick" element={<PickLine/>}/>
            </Routes>
        </BrowserRouter>
    )
}