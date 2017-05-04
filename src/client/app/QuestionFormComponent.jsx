import React from 'react';
import TextField from 'material-ui/TextField';
<<<<<<< HEAD
import Paper from 'material-ui/Paper'
=======
>>>>>>> Merge onto dev
import RaisedButton from 'material-ui/RaisedButton';

class QuestionFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.questionText);
    this.setState({
      questionText: '',
    });
  }

  render() {
    return (
<<<<<<< HEAD
      <Paper className="question-form" >
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              name="questionText"
              className="question-text-form"
              fullWidth={true}
              value={this.state.questionText}
              multiLine={true}
              floatingLabelText="Ask a question..."
              onChange={this.handleInputChange} />
            </div>
          <RaisedButton type="submit" disabled={!this.state.questionText} label="Submit" />
        </form>
      </Paper>
=======
      <form onSubmit={this.handleSubmit}>
        <TextField
          name="questionText"
          ref="textBox"
          multiLine={true}
          floatingLabelText="Ask a question..."
          onChange={this.handleInputChange} />
        <RaisedButton type="submit" label="Submit" />
      </form>
>>>>>>> Merge onto dev
    );
  }
}

export default QuestionFormComponent;
