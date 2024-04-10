import '../css/Badge.css'
import RightArrow from "../assets/img/return-arrow.svg";
import HomeButton from "../assets/img/home.svg";
import {useNavigate} from "react-router-dom";
import {HexLineColor} from "../utill/LineID";
import {useRef, useState} from "react";

export default function Badge(props) {

    const navigate = useNavigate();


    function goHome() {
        navigate('/');
    }


    let {
        main,
        sub,
        lineColor,
        isInput,
        isButton,
        isHomeButtonVisible,
        isNextButtonVisible,
        returnHandler,
        inputRef,
        isFloating,
    } = props;

    let rootClass = "badge";
    if (isButton) {
        rootClass += " btn";
    }
    if (isInput) {
        rootClass += " input-badge";
    }

    const badgeRef = useRef();


    const [inputValue, setInputValue] = useState("");

    const handleReturnKey = (e) => {
        if (e.keyCode === 13) {
            returnValue();
        }
    }
    const returnValue = () => {
        returnHandler(inputValue);
        setInputValue("");
    }


    if (isInput) {
        return (
            <div className={rootClass} ref={badgeRef} style={{outlineColor: HexLineColor[lineColor], height: "80px"}}>
                <label>
                    <input type="text" className="badge-input" placeholder={props.hint} value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           onKeyUp={handleReturnKey}
                           ref={inputRef}
                    />
                </label>
                <div className="badge-btn return-btn" style={{background: HexLineColor[lineColor]}}
                     onClick={returnValue}>
                    <img src={RightArrow} alt="→"/>
                </div>
            </div>
        );
    }
    ;


    return (
        <div className={rootClass} onClick={props.onClick} style={{outlineColor: HexLineColor[lineColor]}}>
            {
                isHomeButtonVisible &&
                <div className="badge-btn home-btn" onClick={goHome} style={{background: HexLineColor[lineColor]}}>
                    <img src={HomeButton} alt="🏠"/>
                </div>
            }
            <div className="badge-main">{main}</div>
            <div className="badge-sub">{sub}</div>
            {
                isNextButtonVisible &&
                <div className="badge-btn return-btn" style={{background: HexLineColor[lineColor]}}>
                    <img src={RightArrow} alt="→"/>
                </div>
            }
        </div>
    );
}
