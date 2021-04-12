const { useState, useRef } = require('react');
const React = require('react');
const { Component } = React;

/* Class */
// class WordRelay extends Component {
//     state = {
//         word: '고구마',
//         value: '',
//         result: '',
//     }

//     onChangeInput = (e) => {
//         this.setState({
//             value: e.target.value,
//         })
//     }

//     onSubmitForm = (e) => {
//         e.preventDefault();
//         if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
//             this.setState({
//                 result: 'PASS!',
//                 word: this.state.value,
//                 value: '',
//             })
//         } else {
//             this.setState({
//                 result: 'FAIL!',
//                 value: '',
//             })
//         }
//         this.input.focus();
//     }

//     input;
//     refInput = (c) => {
//         this.input = c;
//     }

//     render() {
//         return (
//             <>
//                 <div>{this.state.word}</div>
//                 <form onSubmit={this.onSubmitForm}>
//                     <input ref={this.refInput} value={this.state.value} onChange={this.onChangeInput} />
//                     <button>입력</button>
//                 </form>
//                 <div>{this.state.result}</div>
//             </>
//         );
//     }
// }

/* Hooks */
const WordRelay = () => {
    const [word, setWord] = useState('고구마');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const refInput = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value)
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setResult('PASS!');
            setWord(value);
            setValue('');
        } else {
            setResult('FAIL!');
            setValue('');
        }
        refInput.current.focus();
    }

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={refInput} value={value} onChange={onChangeInput} />
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    );

}

module.exports = WordRelay;