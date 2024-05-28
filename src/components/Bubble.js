import RightArrow from "../assets/img/RightArrow.svg";
import {HexLineColor, LineKorean} from "../utill/LineID";
import "../css/Bubble.css";

export function Bubble(props) {

    const {line, transferTo, stationName, isMine} = props;

    return (
        <div className={"bubble " + (isMine ? "bubble-right" : "bubble-left")}>
            <div className="line-circle" style={{background: HexLineColor[line]}}>{LineKorean[line]}</div>
            {
                transferTo &&
                <img loading="lazy" src={RightArrow} alt="→"></img>
            }
            {
                transferTo &&
                <div className="line-circle"
                     style={{background: HexLineColor[transferTo]}}>{LineKorean[transferTo]}</div>
            }
            <div className="station-name">{stationName}</div>
        </div>
    );
}