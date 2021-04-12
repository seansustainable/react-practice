import React, { useMemo } from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIndex, dispatch }) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => useMemo(() => ( // 컴포넌트를 기억하여 성능 최적화
                <Td key={i} cellData={rowData[i]} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} />
            ), [rowData[i]]))}
        </tr>
    );
}

export default Tr;