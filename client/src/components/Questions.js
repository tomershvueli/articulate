import { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

import { API_URL, USER_ID } from "../constants";

import Question from "./Question";

function Questions() {

  const [questions, setQuestions] = useState([]);
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      setIsFetchingQuestions(true);

      try {
        const [questionsData, statesData] = await Promise.all([
          fetch(`${API_URL}knowledge-check-blocks`),
          fetch(`${API_URL}user-questions-state?userId=${USER_ID}`)
        ]);
        const [questions, states] = await Promise.all([
          questionsData.json(),
          statesData.json()
        ]);

        // Map each question with its respective state, or empty object
        questions.forEach(q => {
          q.state = states[q.id] || {}
        });
        setQuestions(questions);
      } catch (error) {
        console.log("asdf"); // TODO
      } finally {
        setIsFetchingQuestions(false);
      }
    }

    fetchQuestions();
  }, [setIsFetchingQuestions, setQuestions]);

  return (
    <>
      {isFetchingQuestions ?
        <Spinner animation="border" role="status" data-testid="spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
      :
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          {questions.map((question, idx) => {
            return (
              <Question key={idx} question={question} />
            );
          })
          }
        </Col>
      </Row>
      }
    </>
  )
};

export default Questions;
