import React, {Component} from 'react';
import LoginScreen from './auth/LoginScreen';
import CreateAccount from './auth/CreateAccount';
import VideoPlayer from './VideoPlayer';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class App extends Component {


    render() {
        return (
            <Router>
                <Switch>
                    <Route path={'/'} exact component={VideoPlayer} />
                    <Route path={'/login'} component={LoginScreen} />
                    <Route path={'/create'} component={CreateAccount} />
                </Switch>
            </Router>
        )
    }
}

export default App;