import Badge from "../components/Badge";
import {LineID} from "../utill/LineID";
import LinePicker from "./TravelLinePicker";
import {useNavigate} from "react-router-dom";

export default function PickLine() {


    const navigate = useNavigate();

    const moveToGame = (line) => {
        navigate(`/travel/game?startline=${line}`);
    }

    return (
        <div className="container">
            <Badge main="노선 선택" sub="처음 시작할 노선을 선택해주세요" lineColor={LineID.line3}/>
            <div className="content-container">
                <LinePicker style={{marginTop: '30px'}} setLine={moveToGame}/>
            </div>

            <div className="input-container">
                <Badge main="게임 시작" lineColor={LineID.line3} isButton/>
            </div>
        </div>
    )
}