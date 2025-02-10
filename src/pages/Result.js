import Badge from "../components/Badge";
import '../css/ScoreBoard.css'
import {useNavigate} from "react-router-dom";
import {LineID} from "../utill/LineID";
import axios from "axios";
import {useEffect, useLayoutEffect, useState} from "react";

const {Kakao} = window;

export default function Result() {

    const navigate = useNavigate();

    const [ranking, setRanking] = useState([]);

    const [playerScore, setPlayerScore] = useState(null);

    const [playerId, setPlayerId] = useState("");
    const [gameType, setGameType] = useState("");

    useEffect(() => {
        Kakao.cleanup();
        Kakao.init('8d1e862300c7d96439f927beaba60f55');
        console.log(Kakao.isInitialized());
    }, []);


    function processRanking(rawRanking, myRanking) {
        if (rawRanking) {
            const indexed = rawRanking.map((record, index) => {
                return {
                    ...record,
                    rank: index + 1,
                }
            })
            const group = Object.groupBy(indexed, ({score}) => score)
            if (myRanking) {
                const ownRank = {
                    nickName: "나",
                    score: myRanking.score,
                    rank: myRanking.rank,
                    duration: myRanking.duration,
                    isMine: true,
                }
                if (group[myRanking.score]) {
                    group[myRanking.score].push(ownRank)
                } else {
                    group[myRanking.score] = [ownRank]
                }
            }
            const flat = Object.entries(group).map(([score, records]) => {
                return {
                    score: score,
                    records: records,
                }
            }).sort((a, b) => b.score - a.score)
            setRanking(flat)
        }
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

    const shareKakao = () => {

        const content = "🚇 지하철 역 맞추기 게임 도전 완료! 🚇\n" +
            "나는 OO점을 기록했어! (몇 개 틀린 건 비밀 🤫)\n" +
            "너도 한 번 도전해봐! 몇 점이나 나오려나? ㅋㅋ"

        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '지하철 게임',
                description: content,
                imageUrl:
                    'https://subwaygame.s3.ap-northeast-2.amazonaws.com/e60668ae-70a6-4cf3-b101-47b237259fcb.png',
                link: {
                    mobileWebUrl: 'https://zeehacheol.com',
                    webUrl: 'https://zeehacheol.com',
                }
            },
            buttons: [
                {
                    title: '나도 테스트 하러가기',
                    link: {
                        webUrl: "https://zeehacheol.com",
                        mobileWebUrl: "https://zeehacheol.com",
                    },
                },
            ],
        });
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
                    processRanking(res.data.ranks, res.data.playerInfo);
                    setPlayerScore(res.data?.playerInfo?.score)
                }
            ).catch(err => {
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
            "fillblank": "노선도 채우기",
            "bestroute": "최적 경로",
            "travel": "지하철 게임",
        }
        setGameType(gameTypeToString[gameType]);
    }, []);

    return (
        <div className="container">
            <Badge main="게임 결과"
                   sub={playerId == null ? gameType : `최종 점수: ${playerScore != null ? playerScore : ""}`}
                   isHomeButtonVisible
                   lineColor={LineID.line1}/>
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
            <div className="badges-container">
                {/*{playerId != null &&
                    <Badge hint="랭킹 등록하기" lineColor={LineID.line1} isInput returnHandler={enrollRanking}/>}*/}
                <Badge main="결과 공유하기"
                       lineColor={LineID.lineKakao}
                       onClick={shareKakao}
                       isShareButtonVisible/>
                {playerId == null &&
                    <Badge main="게임으로 돌아가기" lineColor={LineID.line1} isButton onClick={backToGame}/>
                }
            </div>
        </div>
    );
}

