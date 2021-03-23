import { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

import apiService from "../util/ApiService";

import Question from "./Question";

function Questions() {
  const [errorFetching, setErrorFetching] = useState();
  const [questions, setQuestions] = useState([]);
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      setIsFetchingQuestions(true);

      try {
        const [questions, states] = await Promise.all([
          apiService.getKnowledgeCheckBlocks(),
          apiService.getUserQuestionsState(),
        ]);

        // Map each question with its respective state, or empty object
        questions.forEach((q) => {
          q.state = states[q.id] || {};
        });
        setQuestions(questions);
      } catch (error) {
        setErrorFetching(error);
      } finally {
        setIsFetchingQuestions(false);
      }
    }

    fetchQuestions();
  }, [setIsFetchingQuestions, setQuestions]);

  const displayQuestions = () => {
    return errorFetching ? (
      <>
        <Alert variant="danger" data-testid="alert-error">
          There was a problem fetching the questions. Please try again. 
        </Alert>
      </>
    ) : (
      <>
        {questions.map((question, idx) => {
          return <Question key={idx} question={question} />;
        })}
      </>
    );
  };

  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        {isFetchingQuestions ? (
          <div className="text-center">
            <Spinner animation="border" role="status" data-testid="spinner">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          displayQuestions()
        )}
      </Col>
    </Row>
  );
}

export default Questions;
