import Badge from "../components/Badge";
import {LineID} from "../utill/LineID";
import GuideImg from "../assets/img/RouteExample.svg";
import {useNavigate} from "react-router-dom";

export default function BestRouteGuide() {

    const navigate = useNavigate();
    const moveToGame = () => {
        navigate('/bestroute/game');
    }

    return (
        <div className="container">
            <Badge main="최적 노선 맞추기" sub="게임 방법" lineColor={LineID.line1} isHomeButtonVisible/>
            <div className="content-container">
                <div className="content fixed-content">
                    <img src={GuideImg} alt="최적노선 맞추기"/>
                </div>
                <div className="content">
                    가장 빠른 경로 상에 있는 역을 선택하세요!<br/>
                    오답 기회는 3번 주어집니다.<br/><br/>

                    환승이 아닐 경우, 내려서 다시 타는 것이 아닌 지나치는 것이 기준입니다.출발역에서 도착역으로 이동할 때 평균적으로 가장 빠른 경로 상에 있는 역을 선택하세요!<br/>
                    오답 기회는 3번 주어집니다.<br/>

                    환승이 아닐 경우, 내려서 다시 타는 것이 아닌 지나치는 것이 기준입니다.
                </div>
            </div>
            <Badge main="게임 시작" lineColor={LineID.line1} isNextButtonVisible onClick={moveToGame}/>
        </div>
    )
}