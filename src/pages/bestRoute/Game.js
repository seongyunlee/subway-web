import Badge from "../../components/Badge";
import {LineID} from "../../utill/LineID";
import '../../css/BestRoute.css';
import DownArrow from "../../assets/img/Vector.svg";
import axios from "axios";
import {useEffect, useState} from "react";

export default function BestRouteGame() {

    const [playerId, setPlayerId] = useState("");
    const [score, setScore] = useState(0);
    const [life, setLife] = useState(3);
    const [choices, setChoices] = useState([]);
    const [startStation, setStartStation] = useState("");
    const [endStation, setEndStation] = useState("");
    const [problemId, setProblemId] = useState("");

    function setPlayerInfo(data) {
        const {playerId, gameScore, gameLife} = data;
        setPlayerId(playerId);
        setScore(gameScore);
        setLife(gameLife);
    }

    function showProblem(problem) {
        setStartStation(problem.startStation);
        setChoices(problem.choices);
        setEndStation(problem.endStation);
        setProblemId(problem.id);
    }


    function initGame() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/bestroute/start`)
            .then(res => {
                    setPlayerInfo(res.data);
                    showProblem(res.data.problem);
                }
            ).catch(err => {
            alert("문제를 불러오는데 실패했습니다. 다시 시도해주세요.");
        })
    }

    function showCorrectAnswer(yourAnswer, correctAnswer, minutes) {
        const newChoices = choices.map(choice => {
            if (choice.stationId === yourAnswer) {
                return {
                    ...choice,
                    backgroundColor: yourAnswer === correctAnswer ? "#001AFF" : "#D4003B",
                    minutes: minutes.find(minute => minute.stationId === choice.stationId).timeCost + "분"
                }
            } else if (choice.stationId === correctAnswer) {
                return {
                    ...choice,
                    backgroundColor: "#001AFF",
                    minutes: minutes.find(minute => minute.stationId === choice.stationId).timeCost + "분"
                }
            } else {
                return {
                    ...choice,
                    minutes: minutes.find(minute => minute.stationId === choice.stationId).timeCost + "분"
                }
            }
        })
        setChoices(newChoices);
    }

    function moveToResult() {
        window.location.href = `/result?gameType=bestroute&playerId=${playerId}`;
    }


    function submitAnswer(answer) {
        const header = {"playerId": playerId}
        axios.post(`${process.env.REACT_APP_BASE_URL}/bestroute/submit`, {
            problemId: problemId,
            answer: answer
        }, {headers: header})
            .then(res => {
                showCorrectAnswer(answer, res.data.answer, res.data.correctMinute);
                if (res.data.gameLife > 0) {
                    setTimeout(() => {
                        showProblem(res.data.newProblem);
                    }, 1000);
                    setLife(res.data.gameLife)
                    setScore(res.data.gameScore)
                } else {
                    setTimeout(() => {
                        moveToResult();
                    }, 1000);
                }
            })
    }

    useEffect(() => {
        initGame();
    }, []);

    return (

        <div className="container">
            <Badge main={`현재 점수 ${score}`} sub={`남은 기회:${life}`} lineColor={LineID.line3}/>
            <div className="route-problem-container">
                <Badge main={startStation}/>
                <img src={DownArrow} alt="↓"/>
                <div className="choose-station-container">
                    {
                        choices.map((choice, index) => {
                            return <Badge main={choice.stationName} sub={choice.minutes} isButton key={index}
                                          lineColor={LineID.line3} backgroundColor={choice.backgroundColor}
                                          onClick={() => submitAnswer(choice.stationId)}/>
                        })
                    }
                </div>
                <img src={DownArrow} alt="↓"/>
                <Badge main={endStation}/>
            </div>
        </div>
    )
}