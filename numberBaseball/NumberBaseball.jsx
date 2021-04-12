import React, { Component, useState, useRef, createRef } from 'react';
import Try from './Try';

function getNumbers() {
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.random() * (9 - i), 1)[0];
        array.push(chosen);
    }
    // console.log(array);
    return array;
}

/* Class */
class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런! 🎉',
                    tries: [...prevState.tries, { try: this.state.value, result: '홈런' }],
                };
            })
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            })
        } else {
            const inputArray = this.state.value.split('').map(v => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) {
                this.setState({
                    result: `10번 틀려서 실패! 답은 ${this.state.answer.join('')}이었습니다. 🤣`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                })
            } else {
                for (let i = 0; i < 4; i++) {
                    if (inputArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(inputArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: this.state.value, result: `${strike}스트라이크 ${ball}볼` }],
                        value: '',
                    };
                })
            }
        }
        // this.input.focus();
        this.refInput.current.focus();
    }

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    // input;
    // refInput = (c) => {
    //     this.input = c;
    // }
    refInput = createRef();

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input type="number" maxLength={4} value={this.state.value} onChange={this.onChangeInput} ref={this.refInput} />
                    <button>입력</button>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            <Try key={i} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        );
    }
}

/* Hooks */
// const NumberBaseball = () => {
//     const [result, setResult] = useState('');
//     const [value, setValue] = useState('');
//     const [answer, setAnswer] = useState(getNumbers());
//     const [tries, setTries] = useState([]);
//     const refInput = useRef(null);

//     const onSubmitForm = (e) => {
//         e.preventDefault();
//         if (value === answer.join('')) {
//             setResult('홈런! 🎉');
//             setTries((prevTries) => [...prevTries, { try: value, result: '홈런' }])
//             alert('게임을 다시 시작합니다!');
//             setValue('');
//             setAnswer(getNumbers());
//             setTries([]);
//         } else {
//             const inputArray = value.split('').map(v => parseInt(v));
//             let strike = 0;
//             let ball = 0;
//             if (tries.length >= 9) {
//                 setResult(`10번 틀려서 실패! 답은 ${answer.join('')}이었습니다. 🤣`);
//                 alert('게임을 다시 시작합니다!');
//                 setValue('');
//                 setAnswer(getNumbers());
//                 setTries([]);
//             } else {
//                 console.log(answer);
//                 for (let i = 0; i < 4; i++) {
//                     if (inputArray[i] === answer[i]) {
//                         strike += 1;
//                     } else if (answer.includes(inputArray[i])) {
//                         ball += 1;
//                     }
//                 }
//                 setTries((prevTries) => [...prevTries, { try: value, result: `${strike}스트라이크 ${ball}볼` }]);
//                 setValue('');
//             }
//         }
//     }

//     const onChangeInput = (e) => {
//         setValue(e.target.value);
//     }

//     return (
//         <>
//             <h1>{result}</h1>
//             <form onSubmit={onSubmitForm}>
//                 <input type="number" maxLength={4} value={value} onChange={onChangeInput} ref={refInput} />
//             </form>
//             <div>시도: {tries.length}</div>
//             <ul>
//                 {tries.map((v, i) => {
//                     return (
//                         <Try key={i} tryInfo={v} />
//                     );
//                 })}
//             </ul>
//         </>
//     );
// }

export default NumberBaseball;