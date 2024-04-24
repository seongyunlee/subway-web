import Badge from "../components/Badge";
import {LineID} from "../utill/LineID";
import {useNavigate} from "react-router-dom";

export default function TravelGuide() {


    const navigate = useNavigate();

    const moveToGame = () => {
        navigate('/travel/pick');
    }

    return (
        <div className="container">
            <Badge main="지하철~ 지하철~" sub="게임 방법" lineColor={LineID.line3}/>
            <div className="content-container">
                <div className="content">
                    주어진 노선의 역명을 입력하세요!<br/>
                    상대방의 답이 틀렸다고 생각된다면 오답 버튼을 눌러 보너스 점수 10점을 획득 할 수 있습니다.<br/>
                    단, 정답인 경우엔 즉시 게임이 종료됩니다.<br/>
                    입력하는 역이 환승역을 경우, 원하는 노선으로 환승할 수 있습니다.<br/>
                </div>
            </div>
            <Badge main="게임 시작" lineColor={LineID.line3} isButton onClick={moveToGame}/>

        </div>
    )
}