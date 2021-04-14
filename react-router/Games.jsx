import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import NumberBaseball from '../numberBaseball/NumberBaseball';
import RSP from '../rsp/RSP';
import Lotto from '../lotto/Lotto';
import GameMatcher from './GameMatcher';

class Games extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Link to="/game/numberbaseball">숫자야구</Link>
                    &nbsp;
                    <Link to="/game/rsp">가위바위보</Link>
                    &nbsp;
                    <Link to="/game/lotto">로또</Link>
                    &nbsp;
                    <Link to="/game/index">게임매처</Link>
                </div>
                <div>
                    {/* <Route path="/numberbaseball" component={NumberBaseball} />
                    <Route path="/rsp" component={RSP} />
                    <Route path="/lotto" component={Lotto} /> */}

                    {/* <Route path="/game/:name" component={GameMatcher} /> */}
                    {/* /game/numberbaseball인데 /(상위)도 일치한다고 쳐버린다 */}
                    <Switch>
                        <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
                        <Route exact path="/game/:name" render={(props) => <GameMatcher {...props} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Games;