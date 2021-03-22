import { render, screen, fireEvent } from '@testing-library/react';
import Question from './Question';

const defaultQuestion = {
  id: "9d044cf1-763f-44a8-aec6-77713be117df",
  question: {
    text: 'What is this a picture of?',
    media: {
      type: 'image',
      url: 'https://images.articulate.com/f:jpg%7Cpng,a:retain,b:fff/rise/courses/S3jQ2LjHDoRsPUQmR7dp6hA7-IaoYPA4/d229V-nstxA6tZdi.gif'
    }
  },
  answers: [
    {
      text: 'Cookies and coffee',
      isCorrect: true
    },
    {
      text: 'Donuts and cider',
      isCorrect: false
    }
  ],
  feedback: 'I just love cookies and a warm cup of coffee!',
  state: {}
};

const buildComponent = (question = defaultQuestion) => {
  return render(<Question question={question} />);
};

describe("Question", () => {
  it("renders Question properly", () => {
    buildComponent();

    expect(screen.getByTestId("question-wrap")).toBeInTheDocument();
    expect(screen.getByTestId("question-img")).toBeInTheDocument();
    expect(screen.getByText("What is this a picture of?")).toBeInTheDocument();
    expect(screen.getAllByTestId("question-radio-btn").length).toBe(2);
    expect(screen.getByText("Cookies and coffee")).toBeInTheDocument();
    expect(screen.getByText("Donuts and cider")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeDisabled();
  });

  it("enables the submit question when radio selected", () => {
    buildComponent();

    const submitBtn = screen.getByTestId("submit-btn");

    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    fireEvent.click(screen.getAllByTestId("question-radio-btn")[0]);

    expect(submitBtn).not.toBeDisabled();
  });

  it("selects right answer and resets question", () => {
    buildComponent();

    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeDisabled();
    expect(screen.queryByTestId("answer-alert")).not.toBeInTheDocument();
    expect(screen.queryByTestId("try-again-btn")).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId("question-radio-btn")[0]);

    expect(screen.getByTestId("submit-btn")).not.toBeDisabled();

    fireEvent.click(screen.getByTestId("submit-btn"));

    expect(screen.queryByTestId("answer-alert")).toBeInTheDocument();
    expect(screen.queryByTestId("answer-alert")).toHaveClass("alert-success")
    expect(screen.queryByTestId("try-again-btn")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("try-again-btn"));

    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeDisabled();
    expect(screen.queryByTestId("answer-alert")).not.toBeInTheDocument();
    expect(screen.queryByTestId("try-again-btn")).not.toBeInTheDocument();
  });

  it("selects wrong answer and resets question", () => {
    buildComponent();

    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeDisabled();
    expect(screen.queryByTestId("answer-alert")).not.toBeInTheDocument();
    expect(screen.queryByTestId("try-again-btn")).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId("question-radio-btn")[1]);

    expect(screen.getByTestId("submit-btn")).not.toBeDisabled();

    fireEvent.click(screen.getByTestId("submit-btn"));

    expect(screen.queryByTestId("answer-alert")).toBeInTheDocument();
    expect(screen.queryByTestId("answer-alert")).toHaveClass("alert-danger");
    expect(screen.queryByTestId("try-again-btn")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("try-again-btn"));

    expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toBeDisabled();
    expect(screen.queryByTestId("answer-alert")).not.toBeInTheDocument();
    expect(screen.queryByTestId("try-again-btn")).not.toBeInTheDocument();
  });

  describe("Preexisting question state", () => {
    it("should pre-select the first radio btn", () => {
      buildComponent({
        ...defaultQuestion,
        state: {
          ...defaultQuestion.state,
          selected: 0
        }
      });

      expect(screen.getAllByTestId("question-radio-btn").length).toBe(2);
      expect(screen.getAllByTestId("question-radio-btn")[0]).toBeChecked();
      expect(screen.getAllByTestId("question-radio-btn")[1]).not.toBeChecked();
    });
  });

  it("should show a submitted form", () => {
    buildComponent({
      ...defaultQuestion,
      state: {
        selected: 0,
        submitted: true
      }
    });

    expect(screen.getAllByTestId("question-radio-btn").length).toBe(2);
    expect(screen.getAllByTestId("question-radio-btn")[0]).toBeChecked();
    expect(screen.getAllByTestId("question-radio-btn")[1]).not.toBeChecked();

    expect(screen.queryByTestId("submit-btn")).not.toBeInTheDocument();
    expect(screen.queryByTestId("answer-alert")).toBeInTheDocument();
    expect(screen.queryByTestId("answer-alert")).toHaveClass("alert-success");
    expect(screen.queryByTestId("try-again-btn")).toBeInTheDocument();
  });
});
