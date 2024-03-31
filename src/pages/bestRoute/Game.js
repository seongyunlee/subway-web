import Badge from "../../components/Badge";
import {LineID} from "../../utill/LineID";
import '../../css/BestRoute.css';
import DownArrow from "../../assets/img/Vector.svg";
export default function BestRouteGame() {
    return (

    <div className="container">
        <div className="guide-badge-container">
            <Badge main="현재 점수 12" sub="남은 기회:1" lineColor={LineID.line3}/>
        </div>
        <div className="route-problem-container">
            <Badge main="서울역"/>
            <img src={DownArrow} alt="↓"/>
            <div className="choose-station-container">
                <Badge main="시청" isButton lineColor={LineID.line3}/>
                <Badge main="종각" isButton lineColor={LineID.line3}/>
                <Badge main="종로3가" isButton lineColor={LineID.line3}/>
                <Badge main="종로5가" isButton lineColor={LineID.line3}/>
            </div>
            <img src={DownArrow} alt="↓"/>
            <Badge main="서울역"/>
        </div>
    </div>
)
}