import Badge from "../components/Badge";
import '../css/ScoreBoard.css'
import {useNavigate} from "react-router-dom";
import {LineID} from "../utill/LineID";
import axios from "axios";
import {useLayoutEffect, useState} from "react";

export default function Result() {

    const navigate = useNavigate();

    const [ranking, setRanking] = useState([]);

    const [playerScore, setPlayerScore] = useState(null);

    const [playerId, setPlayerId] = useState("");
    const [gameType, setGameType] = useState("");

    function processRanking(rawRanking, myRanking) {
        if (rawRanking) {
            if (myRanking) {
                rawRanking.push({
                    nickName: "나",
                    score: myRanking.score,
                    duration: myRanking.duration,
                    isMine: true,
                });
            }
            const sorted = rawRanking.sort((a, b) => b.score - a.score);
            const indexed = sorted.map((record, index) => {
                return {
                    ...record,
                    rank: index + 1,
                }
            })
            const group = Object.groupBy(indexed, ({score}) => score)
            const flat = Object.entries(group).map(([score, records]) => {
                return {
                    score: score,
                    records: records,
                }
            }).sort((a, b) => b.score - a.score)
            setRanking(flat)
        }
        console.log('ranking', ranking)
    }

    function enrollRanking(nickName) {
        const playerId = new URLSearchParams(window.location.search).get("playerId");
        if (!nickName) {
            alert("닉네임을 입력해주세요.");
            return;
        }
        if (nickName.length > 8) {
            alert("닉네임은 8자 이하로 입력해주세요.");
            return;
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/rank/enroll`, {
            nickName: nickName,
            playerId: playerId,
        }).then(res => {
            const gameType = new URLSearchParams(window.location.search).get("gameType");
            window.location.href = `/result?gameType=${gameType}`;
        }).catch(err => {
            alert("랭킹 등록에 실패했습니다. 다시 시도해주세요.");
        })
    }

    function getRanking() {
        const gameType = new URLSearchParams(window.location.search).get("gameType");
        const playerId = new URLSearchParams(window.location.search).get("playerId");
        let url = `${process.env.REACT_APP_BASE_URL}/rank/${gameType}`;
        if (playerId) {
            url += `?playerId=${playerId}`;
        }
        axios.get(url)
            .then(res => {
                    console.log(res.data);
                    processRanking(res.data.ranks, res.data.playerInfo);
                    setPlayerScore(res.data?.playerInfo?.score)
                }
            ).catch(err => {
            console.log(err);
            alert("순위를 불러오는데 실패했습니다. 다시 시도해주세요.");
        })
    }

    function backToGame() {
        const gameType = new URLSearchParams(window.location.search).get("gameType");
        window.location.href = `/${gameType}/guide`;
    }

    useLayoutEffect(() => {
        getRanking();
        setPlayerId(new URLSearchParams(window.location.search).get("playerId"));
        const gameType = new URLSearchParams(window.location.search).get("gameType");
        const gameTypeToString = {
            "fillblank": "빈칸 채우기",
            "bestroute": "최적 경로",
            "travel": "지하철 게임",
        }
        setGameType(gameTypeToString[gameType]);
    }, []);

    return (
        <div className="container">
            <div className="guide-badge-container">
                <Badge main="게임 결과"
                       sub={playerId == null ? gameType : `최종 점수: ${playerScore != null ? playerScore : ""}`}
                       isHomeButtonVisible
                       lineColor={LineID.line1}/>
            </div>
            <div className="score-board">
                <div className="board-header">
                    <span>오늘의 순위</span>
                    <div className="separator"></div>
                    <div className="sub-title">
                        <div>
                            Daily Leaderboard
                        </div>
                        <div>
                            每日排行榜
                        </div>
                    </div>
                </div>
                <div className="board-body">
                    {ranking.map((rank, index) => {
                        return (
                            <div className="board-score-item" key={index}>
                                <div className="board-rank">
                                    <div className="rank-circle">
                                        {rank.score}
                                    </div>
                                </div>
                                <div className="records-list">
                                    {rank.records.map(record => {
                                        return (
                                            <div className="record" key={record.rank}>
                                                <div
                                                    className={`name+${record.isMine == true ? " myRecord" : ""}`}>{record.nickName}</div>
                                                <div className="score">{record.rank}위· {record.score}점
                                                    · {record.duration}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {playerId != null &&
                <Badge hint="랭킹 등록하기" lineColor={LineID.line1} isInput returnHandler={enrollRanking}/>}
            {playerId == null &&
                <Badge main="게임으로 돌아기기" lineColor={LineID.line1} isButton onClick={backToGame}/>
            }
        </div>
    );
}

