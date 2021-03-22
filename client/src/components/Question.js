import { useState } from "react";
import { Card, Button, ListGroup, ListGroupItem, Form, Alert } from "react-bootstrap";

import { API_URL, USER_ID } from "../constants";

import './Question.css';

function Question({ question }) {

  const [radioSelected, setRadioSelected] = useState(question.state.selected ?? -1);
  const [hasSubmitted, setHasSubmitted] = useState(question.state.submitted ?? false);

  const correctAnswerEmojis = ["✅", "👍", "🥳"];
  const incorrectAnswerEmojis = ["❌", "😕", "😢"];

  const getCorrectEmoji = () => {
    return correctAnswerEmojis[Math.floor(Math.random() * correctAnswerEmojis.length)];
  };
  const getIncorrectEmoji = () => {
    return incorrectAnswerEmojis[Math.floor(Math.random() * incorrectAnswerEmojis.length)];
  };

  const { media, text: questionTitle } = question.question;

  const updateQuestionState = async (questionState) => {
    // Let's update the questions' state in our API
    await fetch(`${API_URL}user-questions-state`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: USER_ID,
        questionId: question.id,
        questionState
      })
    });
  };

  const handleRadioChange = async (idx) => {
    setRadioSelected(idx);

    updateQuestionState({ selected: idx });
  };

  const handleSubmit = async () => {
    setHasSubmitted(true);

    updateQuestionState({
      submitted: true
    });
  }

  const resetQuestion = () => {
    setRadioSelected(-1);
    setHasSubmitted(false);

    updateQuestionState({
      selected: -1,
      submitted: false
    });
  }

  const questionFooter = () => {
    const isCorrect = question.answers[radioSelected]?.isCorrect;

    return (
      <>
        {hasSubmitted ?
          <>
            <Alert data-testid="answer-alert" variant={isCorrect ? "success" : "danger"}>
              <div className="emoji-answer">{isCorrect ? getCorrectEmoji() : getIncorrectEmoji()}</div>
              {question.feedback}
            </Alert>
            <Button data-testid="try-again-btn" variant="info" onClick={resetQuestion}>
              Try Again
            </Button>
          </>
        :
          <Button
            variant="outline-success"
            disabled={radioSelected === -1}
            onClick={handleSubmit}
            data-testid="submit-btn"
          >
            Submit
          </Button>}
      </>
    );
  }

  return (
    <Card className="mb-4" data-testid="question-wrap">
      {media && media.type === 'image' && <Card.Img variant="top" data-testid="question-img" src={media.url} alt={questionTitle} />}
      <Card.Body>
        <Card.Title className="mb-0">{questionTitle}</Card.Title>
        <ListGroup className="list-group-flush mb-3">
          {question.answers.map((answer, idx) => {
            const inputId = `${question.id}-${idx}`;
            const checked = idx === radioSelected;
            return (
              <ListGroupItem key={idx}>
                <Form.Check 
                  type="radio"
                  name={question.id}
                  id={inputId}
                  label={answer.text}
                  checked={checked}
                  onChange={() => handleRadioChange(idx)}
                  disabled={hasSubmitted}
                  className={hasSubmitted && (answer.isCorrect ? "text-success" : "text-danger")}
                  data-testid="question-radio-btn"
                />
              </ListGroupItem>
            )
          })}
        </ListGroup>
        <div className="text-center">
          {questionFooter()}
        </div>
      </Card.Body>
    </Card>
  )
};

export default Question;
