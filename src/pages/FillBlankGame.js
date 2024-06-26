import Badge from "../components/Badge";
import {LineID} from "../utill/LineID";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function FillBlankGame() {

    const navigate = useNavigate();

    const [playerId, setPlayerId] = useState("");

    const [problem, setProblem] = useState(null);

    const [life, setLife] = useState(3);

    const [score, setScore] = useState(0);

    const [answer, setAnswer] = useState(null);

    const [isCorrect, setIsCorrect] = useState(null);

    const hiddenInput = useRef();

    const inputRef = useRef();

    const scrollIntoView = (event) => {

        // legacy for Safari's Strange Keyboard Appearing Behavior
        setTimeout(() => {
            const visualViewport = window.visualViewport;
            const {height} = visualViewport;
            window.scrollTo(0, 0);
            const rect = inputRef?.current?.parentNode?.getBoundingClientRect();
            if (!rect) return;
            const gap = rect.bottom - height;
            if (gap > 0) {
                window.scrollBy(0, gap + 10);
            } else {
                window.scrollBy(0, 0);
            }
        }, 100);

    }


    function setPlayerInfo(data) {
        const {playerId, problem} = data;
        setPlayerId(playerId);
        setProblem(problem);
        setLife(life);
        setScore(score);
    }

    function finishGame() {
        navigate(`/result?gameType=fillblank&playerId=${playerId}`);
    }

    function showResult(data) {
        const {isCorrect, answer, gameLife, gameScore, newProblem} = data;

        setIsCorrect(isCorrect);
        setAnswer(answer);
        setScore(gameScore);
        setLife(gameLife);
        setTimeout(() => {
            setIsCorrect(null);
            setAnswer(null);
            if (gameLife === 0) {
                finishGame();
            } else {
                setProblem(newProblem);
                setReadyToSetFocus(true);
            }
        }, 1000);
    }

    const [readyToSetFocus, setReadyToSetFocus] = useState(false);


    async function submitAnswer(inputValue) {
        const header = {"playerId": playerId}
        const data = {answer: inputValue, problemId: problem.id}
        hiddenInput?.current?.focus();
        await axios.post(`${process.env.REACT_APP_BASE_URL}/fillblank/submit`, data, {headers: header}
        ).then(res => {
            showResult(res.data);
        }).catch(err => {
            alert("답안 제출에 실패했습니다. 다시 시도해주세요.");
        })
        return inputValue;
    }

    function initGame() {
        axios.get(`${process.env.REACT_APP_BASE_URL}/fillblank/start`)
            .then(res => {
                    setPlayerInfo(res.data);
                }
            ).catch(err => {
            alert("문제를 불러오는데 실패했습니다. 다시 시도해주세요.");
        })
    }

    useEffect(() => {
            initGame();
        }, []
    )

    function focusInput() {
        if (readyToSetFocus && inputRef.current) {
            inputRef.current.focus();
            setReadyToSetFocus(false);
        }
    }

    useEffect(() => {
        focusInput();
    }, [inputRef.current]);


    return (
        <div className="container">
            <Badge main={`현재 점수 ${score}`} sub={`남은 기회:${life}`} lineColor={LineID.line1}/>
            <div className="content-container">
                <div className="content">
                    {problem == null ? "문제를 불러오는중입니다." :
                        <img src={problem.problemImage} alt="문제 가져오는중.." loading="lazy"/>
                    }
                </div>
                <Badge hint="정답 입력" lineColor={(isCorrect !== false) ? LineID.line1 : LineID.lineSinbundang}
                       isInput={isCorrect == null} returnHandler={submitAnswer}
                       main={isCorrect ? "정답입니다!" : "틀렸습니다!"} inputRef={inputRef}
                       sub={isCorrect ? null : `정답은 ${answer}입니다.`}/>
                <input className="fake-input" ref={hiddenInput}></input>
            </div>
        </div>
    )
}