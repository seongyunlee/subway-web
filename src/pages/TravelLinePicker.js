import {HexLineColor, LineID, LineKorean} from "../utill/LineID";
import "../css/LinePicker.css";

export default function LinePicker(props) {

    const lines = [];

    const {setLine, isCancel} = props;


    // 긴 노선명은 원 안에 들어가도록 가운데서 줄바꿈한다.
    // 단 GTX-A 처럼 한글이 아닌 이름은 쪼개면 "GT / X-A" 가 되어 읽을 수 없다.
    const formatText = (text) => {
        const isHangul = /[가-힣]/.test(text ?? "");
        if (isHangul && text.length > 4) {
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
