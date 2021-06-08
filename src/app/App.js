import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../home/Home';
import TeamPage from '../team/TeamPage';
import AuthPage from '../auth/AuthPage';
import DraftPage from '../draft-page/DraftPage';
import './App.css';

class App extends Component {

  state = {
    token: window.localStorage.getItem('TOKEN'),
    userId: window.localStorage.getItem('USER_ID'),
    userName: window.localStorage.getItem('USER_NAME')
  }

  handleUser = user => {
    window.localStorage.setItem('USER_NAME', user.name);
    window.localStorage.setItem('USER_ID', user.id);
    window.localStorage.setItem('TOKEN', user.token);

    this.setState({ token: user.token });
  }

  handleSignOut = () => {
    window.localStorage.clear();
    // you should be able to clear state and get same result:
    // window.location.reload();
    this.setState({ token: '', userId: '', userName: '' })
  }

  render() {
    const { token, userId } = this.state;

    return (
      <div className="App">
        <Router>
          <Header isSignedIn={!!token} onSignOut={this.handleSignOut}/>
          <main>
            <Switch>
              <Route path="/" exact={true}
                render={routerProps => (
                  token
                    ? <Home {...routerProps} />
                    : <Redirect to="/auth" />
                )}
              />

              <Route path="/auth" exact={true}
                render={routerProps => (
                  <AuthPage {...routerProps}
                    onUser={this.handleUser} />
                )}
              />

              <Route path="/draft" exact={true}
                render={routerProps => (
                  token
                    ? <DraftPage {...routerProps} userId={userId} userName={userName} />
                    : <Redirect to="/auth" />
                )}
              />

              <Route path="/my-team"
                render={routerProps => (
                  token
                    ? <TeamPage {...routerProps} />
                    : <Redirect to="/auth" />
                )}
              />

              <Redirect to="/" />

            </Switch>
          </main>
          <Footer />
        </Router>
      </div>
    );

  }
};

export default App;
