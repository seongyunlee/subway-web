import Badge from "../components/Badge";
import dropDownImg from "../assets/img/drop-down.svg";
import '../css/home.css'
import {useNavigate} from "react-router-dom";
import {LineID} from "../utill/LineID";

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

    const showDropDown = () => {
        alert("준비중 입니다.")
    }

    return (
        <div className="container no-header">
            <div className="menu-title">
                <div className="title-badge">
                    <Badge main="지하철 게임" lineColor={LineID.line2}/>
                </div>
                <div className="title-strip">
                    <div id="top"></div>
                    <div id="bottom"></div>
                </div>
            </div>
            <div className="drop-down-btn" onClick={showDropDown}>
                <img loading="lazy" src={dropDownImg} alt="V"/>
                수도권광역전철
            </div>
            <div className="game-list">
                <Badge main="노선도 채우기" isButton onClick={moveToFillBlankGame}/>
                <Badge main="최적경로 맞추기" isButton onClick={moveToBestRouteGame}/>
                <Badge main="지하철~ 지하철~" sub="몇호선? 몇호선?" isButton onClick={moveToTravelGame}/>
            </div>
            <footer className="footer">
                <div>문의사항 및 공지사항</div>
                <a href="https://discord.gg/zBqguu7PRB">Discord</a>
            </footer>
        </div>
    );
}

