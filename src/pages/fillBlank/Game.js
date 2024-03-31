import Badge from "../../components/Badge";
import {LineID} from "../../utill/LineID";
import DownArrow from "../../assets/img/down-arrow.svg";
import ProblemSampleImg from "../../assets/img/fill-blank-guide.png";
export default function FillBlankGame() {
    return (
        <div className="container">
            <div className="guide-badge-container">
                <Badge main="현재 점수 12" sub="남은 기회:1" lineColor={LineID.line2}/>
            </div>
            <div className="content-container">
                <div className="content">
                    <img src={ProblemSampleImg} alt="문제 이미지"/>
                </div>
            </div>
            <div className="input-container">
                <Badge hint="정답 입력" lineColor={LineID.line1} isInput/>
            </div>
        </div>
    )
}