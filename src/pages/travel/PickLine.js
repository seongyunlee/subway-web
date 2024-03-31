import Badge from "../../components/Badge";
import {LineID} from "../../utill/LineID";
import DownArrow from "../../assets/img/down-arrow.svg";
import ProblemSampleImg from "../../assets/img/fill-blank-guide.png";
import LinePicker from "./LinePicker";
import {useNavigate} from "react-router-dom";
export default function PickLine() {


    const navigate = useNavigate();

    const moveToGame = () => {
        navigate('/travel/game');
    }

    return (
        <div className="container">
            <div className="guide-badge-container">
                <Badge main="노선 선택" sub="처음 시작할 노선을 선택해주세요" lineColor={LineID.line3}/>
            </div>
            <LinePicker/>
            <div className="input-container">
                <Badge main="게임 시작" lineColor={LineID.line3} isButton onClick={moveToGame}/>
            </div>
        </div>
    )
}