import Badge from "../../components/Badge";
import {LineID} from "../../utill/LineID";
import GuideImg from "../../assets/img/fill-blank-guide.png";
import {useNavigate} from "react-router-dom";

export default function FillBlankGuide() {

    const navigate = useNavigate();
    const moveToGame = () => {
        navigate('/fillblank/game');
    }

    return (
        <div className="container">
            <div className="guide-badge-container">
                <Badge main="노선도 채우기" sub="게임 방법" lineColor={LineID.line1}/>
            </div>
            <div className="content-container">
                <div className="content">
                    <img src={GuideImg} alt="노선도 채우기 게임 방법"/>
                </div>
                <div className="content">
                    노선도에서 <span className="red">???</span>에 들어갈 역명을 입력해주세요!<br/>
                    역명은 공식 노선도 기준입니다.<br/>
                    오답기회는 3번 주어집니다.
                </div>
            </div>
            <Badge main="게임 시작" lineColor={LineID.line1} isNextButtonVisible onClick={moveToGame}/>
        </div>
    )
}