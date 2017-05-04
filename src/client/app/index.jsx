import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar'

import QueueComponent from './QueueComponent.jsx';
import QuestionFormComponent from './QuestionFormComponent.jsx';
// import QuestionModifyComponent from './QuestionModifyComponent.jsx';

const putRequest = (question) =>
  fetch('/api/questions', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });

class App extends React.Component {
  constructor(props) {
    super(props);

    // This fixes an error of 'Unknown prop `onTouchTap`...' when using
    // expandable cards.
    injectTapEventPlugin();

    this.state = {
      questions: [],
      edition: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleAndwered = this.handleAnswered.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  getQuestions() {
    fetch('/api/questions')
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
  }
  handleUpvote(question) {
    const q = question;
    q.votes += 1;
    putRequest(question)
      .catch((err) => {
        console.error(err);
        q.votes -= 1;
      });
  }
  handleAnswered(question) {
    const q = question;
    q.answered = true;
    putRequest(question)
      .catch((err) => {
        console.error(err);
        q.answered = false;
      });
  }
  handleDelete(question) {
    const _id = question._id;
    // console.log(_id);
    fetch('/api/questions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    });
    this.getQuestions();
  }
  handleEdit(question) {
    const q = question;
    const preText = q.questionText;
    q.questionText = prompt('Edit Your Question Here..', preText);
    putRequest(question)
      .catch((err) => {
        console.error(err);
      });
  }
  handleEdit(question) {
    const q = question;
    const preText = q.questionText;
    q.questionText = prompt('Edit Your Question Here..', preText);
    putRequest(question)
      .catch((err) => {
        console.error(err);
      });
  }
  componentDidMount() {
    this.getQuestions();
    this.interval = setInterval(() => this.getQuestions(), 2000);
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar class= "header" title="Question Queue" showMenuIconButton={false} />
          <QuestionFormComponent handleSubmit={this.handleSubmit} />
          <QueueComponent
            title="Pending Questions"
            expanded={true}
            questions={this.state.questions.filter(q => !q.answered)}
            handleUpvote={this.handleUpvote}
            handleAnswered={this.handleAnswered}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            />
          <QueueComponent
            title="Answered Questions"
            expanded={false}
            questions={this.state.questions.filter(q => q.answered)}
            handleDelete={this.handleDelete}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

render(<App />, document.getElementById('app'));
