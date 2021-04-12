import React, { Component, useRef, useState } from 'react';

/* Hooks */
const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const timeOut = useRef();
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            timeOut.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭하세요');
                startTime.current = new Date();
            }, (Math.random() * 1000) + 2000); // 2~3초
        } else if (state === 'ready') {
            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요');
            clearTimeout(timeOut.current);
        } else if (state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
        }
    }

    const onReset = () => {
        setResult([]);
    }

    return (
        <>
            <div id="screen"
                className={state}
                onClick={onClickScreen}>
                {message}
            </div>
            {result.length !== 0 &&
                <>
                    <div>평균 시간: {result.reduce((a, b) => a + b) / result.length}ms</div>
                    <button onClick={onReset}>리셋</button>
                </>
            }
        </>
    );
}

/* Class */
// class ResponseCheck extends Component {
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작하세요',
//         result: [],
//     }

//     timeout;
//     startTime;
//     endTime;
//     onClickScreen = () => {
//         const { state, message, result } = this.state;
//         if (state === 'waiting') {
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭하세요',
//             });
//             this.timeout = setTimeout(() => {
//                 this.setState({
//                     state: 'now',
//                     message: '지금 클릭하세요',
//                 })
//                 this.startTime = new Date();
//             }, (Math.random() * 1000) + 2000); // 2~3초
//         } else if (state === 'ready') {
//             this.setState({
//                 state: 'waiting',
//                 message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요',
//             })
//             clearTimeout(this.timeout);
//         } else if (state === 'now') {
//             this.endTime = new Date();
//             this.setState((prevState) => {
//                 return {
//                     state: 'waiting',
//                     message: '클릭해서 시작하세요',
//                     result: [...prevState.result, this.endTime - this.startTime]
//                 };
//             })
//         }
//     }

//     onReset = () => {
//         this.setState({
//             result: [],
//         })
//     }

//     render() {
//         const { state, message, result } = this.state;
//         return (
//             <>
//                 <div id="screen"
//                     className={state}
//                     onClick={this.onClickScreen}>
//                     {message}
//                 </div>
//                 {result.length !== 0 &&
//                     <>
//                         <div>평균 시간: {result.reduce((a, b) => a + b) / result.length}ms</div>
//                         <button onClick={this.onReset}>리셋</button>
//                     </>
//                 }
//             </>
//         );
//     }
// }

export default ResponseCheck;