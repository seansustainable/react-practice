import React, { Component, useEffect, useState, useRef, useMemo } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

/* Hooks */
// const Lotto = () => {
//     const lottoNumbers = useMemo(() => getWinNumbers(), []);
//     const [winNumbers, setWinNumbers] = useState(lottoNumbers);
//     const [winBalls, setWinBalls] = useState([]);
//     const [bonus, setBonus] = useState(null);
//     const [redo, setRedo] = useState(false);
//     const timeOuts = useRef([]);

//     useEffect(() => {
//         runTimeouts();
//         return () => {
//             timeOuts.current.forEach((v) => {
//                 clearTimeout(v);
//             });
//         }
//     }, [timeOuts.current]); // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate를 둘 다 수행한다.
//     // timeOuts.current가 바뀌는 시점은 새 배열을 넣어주는 시점 -> onClickRedo


//     const onClickRedo = () => {
//         setWinNumbers(getWinNumbers());
//         setWinBalls([]);
//         setBonus(null);
//         setRedo(false);
//         timeOuts.current = [];
//     }

//     const runTimeouts = () => {
//         for (let i = 0; i < winNumbers.length - 1; i++) {
//             timeOuts.current[i] = setTimeout(() => {
//                 setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
//             }, (i + 1) * 1000);
//         }
//         timeOuts.current[6] = setTimeout(() => {
//             setBonus(winNumbers[6]);
//             setRedo(true);
//         }, 7000);
//     }

//     return (
//         <>
//             <div>당첨 숫자</div>
//             <div id="result">
//                 {winBalls.map((v) => <Ball key={v} number={v} />)}
//             </div>
//             <div>보너스</div>
//             {bonus && <Ball number={bonus} />}
//             {redo && <button onClick={onClickRedo}>한번더!</button>}
//         </>
//     );
// }

/* Class */
class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
    }

    timeouts = [];
    runTimeouts = () => {
        const { winNumbers } = this.state;
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    }
                })
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            })
        }, 7000);
    }


    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        })
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        })
        this.timeouts = [];
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="result">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한번더!</button>}
            </>
        );
    }
}

export default Lotto;