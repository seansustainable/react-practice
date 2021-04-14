import React, { Component, useEffect, useRef, useState } from 'react';

const rspCoords = {
    바위: '-13px',
    가위: '-262px',
    보: '-522px',
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const cpuChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imgCoord;
    })[0];
}

/* Hooks */
// const RSP = () => {
//     const [result, setResult] = useState('');
//     const [imgCoord, setImgCoord] = useState(rspCoords.바위);
//     const [score, setScore] = useState(0);
//     const interval = useRef();

//     useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대 1 대응은 아님)
//         interval.current = setInterval(changeHand, 100);
//         return () => { // componentWillUnmount 역할
//             clearInterval(interval.current);
//         }
//     }, [imgCoord]); // 두 번째 인수 배열에 넣은 값들이 바뀔 때마다 useEffect가 실행된다.

//     const changeHand = () => {
//         if (imgCoord === rspCoords.바위) {
//             setImgCoord(rspCoords.가위);
//         } else if (imgCoord === rspCoords.가위) {
//             setImgCoord(rspCoords.보);
//         } else if (imgCoord === rspCoords.보) {
//             setImgCoord(rspCoords.바위);
//         }
//     }

//     const onClickBtn = (choice) => () => {
//         clearInterval(interval.current);
//         const myScore = scores[choice];
//         const cpuScore = scores[cpuChoice(imgCoord)];
//         const diff = myScore - cpuScore;
//         if (diff === 0) {
//             setResult('무승부');
//         } else if ([-1, 2].includes(diff)) {
//             setResult('승리');
//             setScore((prevScore) => prevScore + 1);
//         } else {
//             setResult('패배');
//             setScore((prevScore) => prevScore - 1);
//         }
//         setTimeout(() => {
//             interval.current = setInterval(changeHand, 100);
//         }, 3000);
//     }

//     return (
//         <>
//             <div id="computer" style={{ background: `url(https://miro.medium.com/max/4800/1*8du96SQUQ0NlWmWvVu20Zw.png) ${imgCoord} -150px` }}></div>
//             <div>
//                 <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
//                 <button id="scissors" className="btn" onClick={onClickBtn('가위')}>가위</button>
//                 <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
//             </div>
//             <div>{result}</div>
//             <div>현재 {score}점</div>
//         </>
//     );
// }

/* Class */
class RSP extends Component {
    state = {
        result: '',
        imgCoord: rspCoords.바위,
        score: 0,
    }

    interval;
    componentDidMount() {
        // const { imgCoord } = this.state; // 코드를 여기에 두면 클로저 문제 발생
        this.interval = setInterval(this.changeHand, 100);
    }

    changeHand = () => {
        const { imgCoord } = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            })
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            })
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            })
        }
    }

    onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;

        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[cpuChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '무승부',
            })
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '승리',
                    score: prevState.score + 1,
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    result: '패배',
                    score: prevState.score - 1,
                }
            })
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 3000);
    }

    render() {
        const { result, imgCoord, score } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://miro.medium.com/max/4800/1*8du96SQUQ0NlWmWvVu20Zw.png) ${imgCoord} -150px` }}></div>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissors" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;