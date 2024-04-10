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

    const [isExpanded, setIsExpanded] = useState(false);

    const {onClick} = props;

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
                <div className="action-btn" onClick={() => {
                    setIsExpanded(false)
                    onClick()
                }}>오답 맞아요
                </div>
                <div className="action-btn" onClick={() => setIsExpanded(false)}>잘 모르겠네요</div>
            </div>
        )
    }

    return (
        <div className="report-btn" onClick={() => setIsExpanded(true)}>
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
    const inputRef = useRef();
    const bubbleContainer = useRef();


    function moveToResult() {
        navigate(`/result?gameType=travel&playerId=${playerId}`);
    }

    function toggleTransfer() {
        setTransferring(!transferring);
    }

    function addPreviousStation(incomingIds) {
        setPrevStationIds([...prevStationIds, ...incomingIds])
    }

    function changePreviousStation(replaceId) {
        setPrevStationIds([...prevStationIds.slice(0, prevStationIds.length - 1), replaceId]);
    }

    function addChat(incomingChat) {
        setChats([...chats, ...incomingChat.map(({chat, isMine}) => {
            return {isMine: isMine, ...chat}
        })]);
        addPreviousStation(incomingChat.map(({chat}) => chat.stationId));
        console.log(chats)
    }

    function removeAndAddChat(changeChat) {
        setChats([...chats.slice(0, chats.length - 1), changeChat]);
    }

    function scrollToBottom() {
        console.log(bubbleContainer.current.scrollHeight, "scrollHeight")
        setTimeout(() => {
            bubbleContainer.current?.scrollTo(0, bubbleContainer.current.scrollHeight);
        }, 100);
    }

    function submitAnswer(answer) {
        if (!answer) {
            return;
        }
        inputRef?.current?.focus();

        const data = {
            answer: answer,
            transferTo: transferTo,
            chatContext: {
                currentLine: currentLine,
                previousStationIds: prevStationIds
            }
        }
        if (transferTo) {
            data.transferTo = transferTo;
        }
        const header = {"playerId": playerId}
        axios.post(`${process.env.REACT_APP_BASE_URL}/travel/submit`, data, {headers: header}
        ).then(res => {
            if (res.data.isCorrect) {
                addChat([
                    {chat: res.data.submittedAnswer, isMine: true},
                    {chat: res.data.dealerAnswer, isMine: false}
                ]);
                console.log(res.data, "data")
                setScore(res.data.gameScore);
                setCurrentLine(res.data.dealerAnswer.originalLine);
                setTransferring(false);
                setTransferTo(null);
                scrollToBottom();

            } else {
                alert("오답입니다.")
                moveToResult();
            }
        }).catch(err => {
            alert("답안 제출에 실패했습니다. 다시 시도해주세요.");
        })
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

    function reportAnswer() {
        axios.post(`${process.env.REACT_APP_BASE_URL}/travel/report`, {
                chatContext: {
                    currentLine: currentLine,
                    previousStationIds: prevStationIds
                }
            },
            {headers: {"playerId": playerId}}
        ).then(res => {
            if (res.data.isSuccess) {
                console.log(res.data.changeStation, "changeStation")
                removeAndAddChat({...res.data.changeStation, isMine: false});
                setScore(res.data.gameScore);
                setTransferring(false);
                setTransferTo(null);
                changePreviousStation(res.data.changeStation.stationId);
                scrollToBottom();
                alert("오답이 맞습니다. 10점을 획득하셨습니다.")
            } else {
                alert("오답이 아닙니다.")
                moveToResult();
            }
        }).catch(err => {
            alert("일시적인 오류가 발생했습니다. 다시 시도해주세요.")
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
        <div className="container fill-eighty-height">
            <Badge main={`현재 점수 ${score}`} sub={`${LineKorean[currentLine]} 역명을 입력하세요!`} lineColor={LineID.line3}/>
            {transferring &&
                <div className="content-container">
                    <LinePicker setLine={setTransfer}/>
                </div>
            }
            <div className={`fill-flex-center ${transferring ? "gone" : ""}`}>
                <div className="bubble-container" ref={bubbleContainer}>
                    {
                        chats.map((chat, idx) => {
                            return <Bubble key={chat.stationId} line={chat.originalLine} transferTo={chat.transfeTo}
                                           stationName={chat.stationName} isMine={chat.isMine}/>
                        })
                    }
                </div>

                <ReportButton onClick={reportAnswer}/>
                <div className="transfer-btn" onClick={toggleTransfer}>
                    <img src={TransferIcon} alt="T"/>
                    환승
                    {transferTo &&
                        <img src={RightArrow} alt="→"/>
                    }
                    {transferTo &&
                        <div className="line-tag"
                             style={{background: HexLineColor[transferTo]}}>{LineKorean[transferTo]}</div>
                    }
                </div>
                <Badge hint={`${LineKorean[currentLine]} 역명을 입력하세요!`} ref={inputRef} lineColor={LineID.line3}
                       isInput
                       returnHandler={submitAnswer}/>
            </div>
        </div>
    )
}