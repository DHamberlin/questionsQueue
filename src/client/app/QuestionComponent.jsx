import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import TagArray from './TagArray.jsx';
// import QuestionModifyComponent from './QuestionModifyComponent.jsx';

const QuestionComponent = (props) => {
  const question = props.question;
  const user = props.user;

  const upVoteBtn = <FlatButton onClick={() => props.handleUpvote(question)} label="Vote" />;
  const answerBtn = <FlatButton onClick={() => props.handleAnswered(question)} label="Clear" />;
  const deleteBtn = <FlatButton onClick={() => props.handleDelete(question)} label="Delete" />;
  const editBtn = <FlatButton onClick={() => props.handleEdit(question)} label="Edit" />;

  const buttons = [
    !question.answered
      && !question.usersVoted.includes(user.username)
      ? upVoteBtn : null,
    user.username === question.username ||
      user.role === 'admin'
      ? editBtn : null,
    user.username === question.username ||
      user.role === 'admin'
      ? deleteBtn : null,
    user.role === 'admin'
      ? answerBtn : null,
  ];

  return (
      <Card className="question">
        <CardText>
        {question.questionText.split('\n').map((line, idx) => (
          <span key={idx}>{line}<br/></span>
        ))}
        {lineBreak.split('\n').map((question, idx) => {
          return <span key={idx}>{question}<br/></span>
        })}
        <div>Code: {question.codeSnippet}</div>
        <div>Votes: {question.votes}</div>
        <div>Asked on {question.createdAt}</div>
        <div>Tags: <TagArray tags={question.tags} /></div>
        </CardText>
        <CardActions>
          {buttons}
        </CardActions>
      </Card>
  );
};

// <div>Tags: <TagArray tags={question.tags} /></div>
export default QuestionComponent;
