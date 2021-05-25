import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from '../home/Home';
import AuthPage from '../auth/AuthPage';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
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


render() {
  const { token, userName } = this.state;

  return (
    <div className="App">
      <Router>
        <Header userName={userName}/>
        <main>

          <Switch>
            <Route path="/" exact={true}
              render={routerProps => (
                <Home {...routerProps}/>
              )}
            />

            <Route path="/auth" exact={true}
              render={routerProps => (
                <AuthPage {...routerProps}
                  onUser={this.handleUser}/>
              )}
            />

            <Route path="/resources" exact={true}
              render={routerProps => (
                token
                  ? <h1>HELLO TOKEN HOLDER</h1>
                  : <div>Implement a page of resources</div>
                  
              )}
            />

            <Route path="/resources/:id"
              render={routerProps => (
                <div>Implement a page for id {routerProps.match.params.id}</div>
              )}
            />

            <Redirect to="/" />

          </Switch>
        </main>
        <Footer/>
      </Router>
    </div>
  );
}

}

export default App;
