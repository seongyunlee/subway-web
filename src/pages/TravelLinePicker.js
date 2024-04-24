import {HexLineColor, LineID, LineKorean} from "../utill/LineID";
import "../css/LinePicker.css";

export default function LinePicker(props) {

    const lines = [];

    const {setLine, isCancel} = props;


    const formatText = (text) => {
        if (text.length > 4) {
            let half = text.length / 2;
            return text.slice(0, half) + "\n" + text.slice(half, text.length);
        } else {
            return text;
        }
    }

    for (const [key, value] of Object.entries(LineID)) {
        lines.push(
            {
                key: value,
                color: HexLineColor[value],
                text: formatText(LineKorean[value]),
            }
        )
    }

    console.log(lines)

    return (
        <div className="line-picker">{
            isCancel &&
            <div className="line-picker-item" style={{backgroundColor: "black"}} onClick={() => setLine(null)}>
                취소
            </div>
        }
            {lines.map((line, index) => (
                <div key={index} className="line-picker-item" style={{backgroundColor: line.color}}
                     onClick={() => setLine(line.key)}>
                    {line.text}
                </div>
            ))}
        </div>
    )
}