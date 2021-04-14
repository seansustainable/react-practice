import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import NumberBaseball from '../numberBaseball/NumberBaseball';
import RSP from '../rsp/RSP';
import Lotto from '../lotto/Lotto';

export default class GameMatcher extends Component {
    render() {
        // console.log(this.props.history, this.props.location, this.props.match);
        console.log(this.props);
        let { name } = this.props.match.params;
        if(name === 'numberbaseball') {
            return <NumberBaseball />;
        } else if(name === 'rsp') {
            return <RSP />;
        } else if(name === 'lotto') {
            return <Lotto />;
        }
        return (
            <div>일치하는 게임이 없습니다.</div>
        );
    }
}

// export default withRouter(GameMatcher);
