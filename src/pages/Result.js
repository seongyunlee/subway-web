import Badge from "../components/Badge";
import '../css/ScoreBoard.css'
import {useNavigate} from "react-router-dom";
import {LineID} from "../utill/LineID";
export default function Result() {

    const navigate = useNavigate();

    return (
    <div class="container">
        <div class="guide-badge-container">
            <Badge main="게임 결과" sub="최종 점수 : 12" isHomeButtonVisible lineColor={LineID.line1}/>
        </div>
        <div class="score-board">
            <div class="board-header">
                <span>오늘의 순위</span>
                <div class="separator"></div>
                <div class="sub-title">
                    <div>
                        Daily Leaderboard
                    </div>
                    <div>
                        每日排行榜
                    </div>
                </div>
            </div>
            <div class="board-body">
                <div class="board-score-item">
                    <div class="board-rank">
                        <div class="rank-circle">
                            54
                        </div>
                    </div>
                    <div class="records-list">
                        <div class="record">
                            <div class="name">바보랜드</div>
                            <div class="score">1위· 54문제 · 15분 32초</div>
                        </div>
                        <div class="record">
                            <div class="name">바보랜드</div>
                            <div class="score">1위· 54문제 · 15분 32초</div>
                        </div>
                    </div>
                </div>
                <div class="board-score-item">
                    <div class="board-rank">
                        <div class="rank-circle">
                            54
                        </div>
                    </div>
                    <div class="records-list">
                        <div class="record">
                            <div class="name">바보랜드</div>
                            <div class="score">1위· 54문제 · 15분 32초</div>
                        </div>
                        <div class="record">
                            <div class="name">바보랜드</div>
                            <div class="score">1위· 54문제 · 15분 32초</div>
                        </div>
                    </div>
                </div>
                <div class="board-score-item">
                    <div class="board-rank">
                        <div class="rank-circle">
                            54
                        </div>
                    </div>
                    <div class="records-list">
                        <div class="record">
                            <div class="name">바보랜드</div>
                            <div class="score">1위· 54문제 · 15분 32초</div>
                        </div>
                        <div class="record">
                            <div class="name">바보랜드</div>
                            <div class="score">1위· 54문제 · 15분 32초</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="input-container">
            <Badge hint="랭킹 등록하기" lineColor={LineID.line1} isInput/>
        </div>
    </div>
    );
}

