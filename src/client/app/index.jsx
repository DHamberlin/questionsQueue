import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
<<<<<<< HEAD
import AppBar from 'material-ui/AppBar'
=======
import AppBar from 'material-ui/AppBar';
>>>>>>> server-modules

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import AuthExample from './Routes.jsx';
import LoginComponent from './Login.jsx';
import App from './app.jsx';

// const fakeAuth = {
//   loggedIn: false,
//   authenticate(cb) {
//     this.loggedIn = true;
//     setTimeout(cb, 100);
//   },
//   signout(cb) {
//     this.loggedIn = false;
//     setTimeout(cb, 100);
//   },
// };

class Main extends React.Component {
  constructor(props) {
    super(props);

    // This fixes an error of 'Unknown prop `onTouchTap`...' when using
    // expandable cards.
    injectTapEventPlugin();

    this.state = {
      loggedIn: true,
    };
<<<<<<< HEAD
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleAndwered = this.handleAnswered.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  getQuestions() {
    fetch('/api/questions', { credentials: 'include' })
      .then(res => res.json())
      .then(json => this.setState({ questions: json }));
  }
  handleSubmit(text) {
    fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    .then(question => this.setState((prevState) => {
      prevState.questions.push(question);
      return {
        question: prevState.questions,
      };
    },
  ));
=======
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }
  login(cb) {
    /*
     *setState is async, so place callback in an anonymous function?
     */
    this.setState({
      loggedIn: true,
    });
    cb();
>>>>>>> server-modules
  }
  logout(cb) {
    this.setState({
      loggedIn: false,
    });
<<<<<<< HEAD
    this.getQuestions();
  }
  componentDidMount() {
=======
>>>>>>> server-modules
    this.getQuestions();
  }
    cb();
  }
  render() {
    console.log(this.state.loggedIn);
    return (
<<<<<<< HEAD
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Question Queue"
            className="appbar"
            showMenuIconButton={false}
            />
          <QuestionFormComponent handleSubmit={this.handleSubmit} />
          <QueueComponent
            title="Pending Questions"
            expanded={true}
            questions={this.state.questions.filter(q => !q.answered)}
            handleUpvote={this.handleUpvote}
            handleAnswered={this.handleAnswered}
            handleDelete={this.handleDelete}
            />
          <QueueComponent
            title="Answered Questions"
            expanded={false}
            questions={this.state.questions.filter(q => q.answered)}
            handleDelete={this.handleDelete}
            />
        </div>
      </MuiThemeProvider>
=======
      <Router>
        <div>
          <Route exact path="/" render={() => (
            this.state.loggedIn ? (
              <Redirect to="/questions" />
            ) : (
              <Redirect push to="/login" />
            )
          )} />
          <Route path="/questions"
            render={ () => (
              this.state.loggedIn ? (
                <App logout={this.logout}
                  login={this.login}
                />
              ) : (
                <Redirect to="/" />
              )
            )
          }
            />
          <Route path="/login" render={() => (
            <LoginComponent
              login={this.login}
              loggedIn={this.state.loggedIn} />
          )}/>
          </div>
      </Router>
>>>>>>> server-modules
    );
  }
}

injectTapEventPlugin();
render(<Main />, document.getElementById('app'));
