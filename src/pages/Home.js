import Badge from "../components/Badge";
import dropDownImg from "../assets/img/drop-down.svg";
import '../css/home.css'
import {useNavigate} from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();
    const moveToFillBlankGame = () => {
        navigate('/fillblank/guide');
    }

    const moveToBestRouteGame = () => {
        navigate('/bestroute/guide');
    }

    const moveToTravelGame = () => {
        navigate('/travel/guide');
    }

    return (
        <div className="container no-header">
            <div className="menu-title">
                <div className="title-badge">
                    {/*<div th:replace="fragments/badge.html :: badge(main='지하철 게임')"></div>*/}
                    <Badge main="지하철 게임"/>
                </div>
                <div className="title-strip">
                    <div id="top"></div>
                    <div id="bottom"></div>
                </div>
            </div>
            <div className="drop-down-btn">
                <img src={dropDownImg} alt="V"/>
                수도권광역전철
            </div>
            <div className="game-list">
                <Badge main="노선도 채우기" isButton onClick={moveToFillBlankGame}/>
                <Badge main="최적경로 맞추기" isButton onClick={moveToBestRouteGame}/>
                <Badge main="지하철~ 지하철~" sub="몇호선? 몇호선?" isButton onClick={moveToTravelGame}/>
            </div>
        </div>
    );
}

