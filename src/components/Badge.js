import '../css/Badge.css'
import RightArrow from "../assets/img/return-arrow.svg";
import HomeButton from "../assets/img/home.svg";
import {useNavigate} from "react-router-dom";
import {HexLineColor} from "../utill/LineID";
import {useEffect, useRef, useState} from "react";

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
        backgroundColor,
        isMiniBadge,
    } = props;

    let rootClass = "badge";
    if (isButton) {
        rootClass += " btn";
    }
    if (isInput) {
        rootClass += " input-badge";
    }

    const badgeRef = useRef();
    const mainTextRef = useRef();

    const [inputValue, setInputValue] = useState("");


    const handleReturnKey = (e) => {
        if (e.keyCode === 13) {
            returnValue();
        }
    }
    const returnValue = async () => {
        await returnHandler(inputValue);
        setInputValue("");
    }

    useEffect(() => {
        if (mainTextRef.current) {
            if (isMiniBadge && main) {
                if (main.length >= 7) {
                    mainTextRef.current.style.fontSize = "17px"
                } else if (main.length >= 5) {
                    mainTextRef.current.style.fontSize = "22px"
                } else {
                    mainTextRef.current.style.fontSize = "26px"
                }
            } else {
                let fontSize = Number(window.getComputedStyle(mainTextRef.current).fontSize.slice(0, -2));
                if (mainTextRef.current.parentElement.getBoundingClientRect().width < fontSize * main.length) {
                    mainTextRef.current.style.fontSize = `${mainTextRef.current.parentElement.getBoundingClientRect().width / fontSize * main.length}px`;
                }
            }
        }
    }, [main]);


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
                    <img loading="lazy" src={RightArrow} alt="→"/>
                </div>
            </div>
        );
    }
    ;


    return (
        <div className={rootClass} onClick={props.onClick}
             style={{outlineColor: HexLineColor[lineColor], background: backgroundColor}}>
            {
                isHomeButtonVisible &&
                <div className="badge-btn home-btn" onClick={goHome} style={{background: HexLineColor[lineColor]}}>
                    <img loading="lazy" src={HomeButton} alt="🏠"/>
                </div>
            }
            <div className="badge-main" ref={mainTextRef}
                 style={{color: backgroundColor != null ? "#ffffff" : "#000000"}}>{main}</div>
            <div className="badge-sub" style={{color: backgroundColor != null ? "#ffffff" : "#000000"}}>{sub}</div>
            {
                isNextButtonVisible &&
                <div className="badge-btn return-btn" style={{background: HexLineColor[lineColor]}}>
                    <img loading="lazy" src={RightArrow} alt="→"/>
                </div>
            }
        </div>
    );
}
