import '../css/Badge.css'
import RightArrow from "../assets/img/return-arrow.svg";
import HomeButton from "../assets/img/home.svg";
import {useNavigate} from "react-router-dom";
import {LineID,HexLineColor} from "../utill/LineID";
export default function Badge(props){

    const navigate = useNavigate();



    function goHome(){
        navigate('/');
    }

    let {main,sub, lineColor, isInput, isButton, isHomeButtonVisible,isNextButtonVisible} = props;

    let rootClass = "badge";
    if(isButton){
        rootClass += " btn";
    }
    if(lineColor){
        rootClass += " " + lineColor;
    }
    if(isInput){
        rootClass += " input-badge";
    }


    if(isInput){
        return (
            <div className={rootClass}>
                <label>
                    <input type="text" className="badge-input" placeholder={props.hint}/>
                </label>
                <div className="badge-btn return-btn" style={{background: HexLineColor[lineColor]}}>
                    <img src={RightArrow} alt="→"/>
                </div>
            </div>
        );
    }
    ;


    return (
        <div className={rootClass} onClick={props.onClick}>
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
