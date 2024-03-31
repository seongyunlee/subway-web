import Badge from "../../components/Badge";
import {HexLineColor, LineID, LineKorean} from "../../utill/LineID";
import DownArrow from "../../assets/img/down-arrow.svg";
import ProblemSampleImg from "../../assets/img/fill-blank-guide.png";
import {Bubble} from "../../components/Bubble";
import ReportIcon from "../../assets/img/Siren.svg";
import "../../css/Travel.css";
import TransferIcon from "../../assets/img/transfer.png";
import RightArrow from "../../assets/img/RightArrow.svg";
import {useState} from "react";
import LinePicker from "./LinePicker";

function ReportButton(props){

    const {isExpanded} = props;

    if (isExpanded){
        return (
            <div className="report-btn">
                <div className="report-header">
                    <img src={ReportIcon} alt="신고"/>
                    과연 오답일까요?
                    <div className="report-count">4</div>
                </div>
                <div className="report-guide">
                    정말 틀렸다면 10점을 획득,<br/>
                    정답이라면 게임이 종료됩니다
                </div>
                <div className="action-btn">오답 맞아요</div>
                <div className="action-btn">잘 모르겠네요</div>
            </div>
        )
    }

    return (
            <div className="report-btn">
                <div className="report-header">
                    <img src={ReportIcon} alt="신고"/>
                    오답!
                    <div className="report-count">4</div>
                </div>
            </div>
    )


}


export default function TravelGame() {

    const [transferring,setTransferring] = useState(false);

    const toggleTransfer = () => {
        setTransferring(!transferring);
    }

    const [transferTo, setTransferTo] = useState(LineID.line1);

    const setTransfer = (line) => {
        setTransferTo(line);
        setTransferring(false);
        console.log(transferTo,HexLineColor[transferTo])
    }


    return (
        <div className="container">
            <div className="guide-badge-container">
                <Badge main="현재 점수 12" sub="9호선 역명을 입력하세요!" lineColor={LineID.line3}/>
            </div>
            {transferring &&
                <LinePicker setLine={setTransfer}/>
            }
            {!transferring && <div className="fill-flex-center" >
            <div className="bubble-container">
                <Bubble line="line-1" transferTo="line-2" stationName="서울역"/>
                <Bubble line="line-1" transferTo="line-2" stationName="서울역" isMine/>
            </div>
            <ReportButton isExpanded/>
            <div className="input-container">
                <div className="transfer-btn" onClick={toggleTransfer}>
                    <img src={TransferIcon} alt="T"/>
                    환승
                    <img src={RightArrow} alt="→"/>
                    <div className="line-tag" style={{background:HexLineColor[transferTo]}}>{LineKorean[transferTo]}</div>
                </div>
                <Badge hint="9호선 역명을 입력하세요!" lineColor={LineID.line3} isInput/>
            </div>
            </div>}
        </div>
    )
}