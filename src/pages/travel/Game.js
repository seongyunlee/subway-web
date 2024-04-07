import Badge from "../../components/Badge";
import {HexLineColor, LineID, LineKorean} from "../../utill/LineID";
import {Bubble} from "../../components/Bubble";
import ReportIcon from "../../assets/img/Siren.svg";
import "../../css/Travel.css";
import TransferIcon from "../../assets/img/transfer.png";
import RightArrow from "../../assets/img/RightArrow.svg";
import {useEffect, useRef, useState} from "react";
import LinePicker from "./LinePicker";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ReportButton(props) {

    const {isExpanded} = props;

    if (isExpanded) {
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

    const [transferring, setTransferring] = useState(false);

    const [chats, setChats] = useState([]);
    const [prevStationIds, setPrevStationIds] = useState([]);
    const [playerId, setPlayerId] = useState(null);

    const navigate = useNavigate();

    const [transferTo, setTransferTo] = useState(null);
    const [score, setScore] = useState(0);
    const [isReportBtnExpanded, setIsReportBtnExpanded] = useState(false);
    const [currentLine, setCurrentLine] = useState(null);
    const floatingDiv = useRef();


    function moveToResult() {
        navigate(`/result?gameType=travel&playerId=${playerId}`);
    }

    function toggleTransfer() {
        setTransferring(!transferring);
    }

    function addPreviousStation(incomingIds) {
        setPrevStationIds([...prevStationIds, ...incomingIds])
    }

    function addChat(incomingChat) {
        setChats([...chats, ...incomingChat.map(({chat, isMine}) => {
            return {isMine: isMine, ...chat}
        })]);
        addPreviousStation(incomingChat.map(({chat}) => chat.stationId));
        console.log(chats)
    }

    function submitAnswer(answer) {
        if (!answer) {
            return;
        }
        const data = {
            answer: answer,
            transferTo: transferTo,
            chatContext: {
                currentLine: LineID.line1,
                previousStationIds: prevStationIds
            }
        }
        const header = {"playerId": playerId}
        axios.post(`${process.env.REACT_APP_BASE_URL}/travel/submit`, data, {headers: header}
        ).then(res => {
            if (res.data.isCorrect) {
                addChat([
                    {chat: res.data.submittedAnswer, isMine: true},
                    {chat: res.data.dealerAnswer, isMine: false}
                ]);
                //dispatchChats(res.data.dealerAnswer, false);
                console.log(res.data, "data")
                setScore(res.data.gameScore);
                setCurrentLine(res.data.dealerAnswer.originalLine);
                setTransferring(false);
                setTransferTo(null)
                console.log('tt', currentLine, LineKorean[currentLine])
            } else {
                //moveToResult();
            }
        }).catch(err => {
            alert("답안 제출에 실패했습니다. 다시 시도해주세요.");
        })
    }

    function adjustFloating() {
        console.log("moveBadge!!!");
        if (!floatingDiv.current) return;
        floatingDiv.current.style.bottom = "0px";
    }

    function startGame() {
        console.log("Start Game")
        const startLine = new URLSearchParams(window.location.search).get("startline");
        axios.get(`${process.env.REACT_APP_BASE_URL}/travel/start?startLine=${startLine}`
        ).then(res => {
            setPlayerId(res.data.playerId);
            setPrevStationIds(res.data.chatContext.previousStationIds);
            setCurrentLine(res.data.chatContext.currentLine);
            setScore(res.data.gameScore);
            addChat([{chat: res.data.firstAnswer, isMine: false}]);
        }).catch(err => {
            console.error(err);
            alert("게임 시작에 실패했습니다. 다시 시도해주세요.");
        })
    }

    const setTransfer = (line) => {
        setTransferTo(line);
        setTransferring(false);
        console.log(transferTo, HexLineColor[transferTo])
    }

    useEffect(() => {
        startGame();
    }, []);


    return (
        <div className="container">
            <Badge main={`현재 점수 ${score}`} sub={`${LineKorean[currentLine]} 역명을 입력하세요!`} lineColor={LineID.line3}/>
            {transferring &&
                <LinePicker setLine={setTransfer}/>
            }
            {!transferring && <div className="fill-flex-center">
                <div className="bubble-container">
                    {
                        chats.map((chat, idx) => {
                            return <Bubble key={idx} line={chat.originalLine} transferTo={chat.transfeTo}
                                           stationName={chat.stationName} isMine={chat.isMine}/>
                        })
                    }
                </div>
                <ReportButton isExpanded={isReportBtnExpanded}/>
                <div className="transfer-btn" onClick={toggleTransfer}>
                    <img src={TransferIcon} alt="T"/>
                    환승
                    <img src={RightArrow} alt="→"/>
                    <div className="line-tag"
                         style={{background: HexLineColor[transferTo]}}>{LineKorean[transferTo]}</div>
                </div>
                <Badge hint={`${LineKorean[currentLine]} 역명을 입력하세요!`} lineColor={LineID.line3} isInput
                       returnHandler={submitAnswer}/>
            </div>}
        </div>
    )
}