import React, { useCallback, useEffect, useReducer, useState } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1],
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL:
            const tableData = [...state.tableData]; // 이후 immer 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        case RESET_GAME:
            return {
                ...state,
                turn: 'O',
                tableData: [['', '', ''], ['', '', ''], ['', '', '']],
                recentCell: [-1, -1],
            }
        default:
            return state;
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로줄 검사
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로줄 검사
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 대각선 검사
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 대각선 검사
            win = true;
        }
        if (win) {
            dispatch({ type: SET_WINNER, winner: turn })
            dispatch({ type: RESET_GAME })
        } else {
            let all = true; // all이 true이면 무승부
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                })
            })
            if (all) { // 무승부
                dispatch({ type: RESET_GAME })
            } else {
                dispatch({ type: CHANGE_TURN })
            }
        }
    }, [recentCell]);

    return (
        <>
            <Table tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리! 🎉</div>}
        </>
    )
}

export default TicTacToe;