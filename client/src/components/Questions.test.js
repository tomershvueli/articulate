import {
  render,
  screen,
  act,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Questions from "./Questions";

import apiService from "../util/ApiService";

describe("Questions", () => {
  it("renders spinner", () => {
    render(<Questions />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("calls to API twice and removes spinner", async () => {
    jest.spyOn(apiService, "getKnowledgeCheckBlocks");
    jest.spyOn(apiService, "getUserQuestionsState");

    render(<Questions />);

    expect(apiService.getKnowledgeCheckBlocks).toHaveBeenCalledTimes(1);
    expect(apiService.getUserQuestionsState).toHaveBeenCalledTimes(1);
    waitForElementToBeRemoved(() => screen.queryByTestId("spinner"));
  });

  it("should display error when failed to fetch questions", async () => {
    const mockGetKnowledgeCheckBlocks = jest.spyOn(
      apiService,
      "getKnowledgeCheckBlocks"
    );
    mockGetKnowledgeCheckBlocks.mockImplementation(() => {
      return {
        error: 500,
      };
    });
    act(() => {
      render(<Questions />);
    });

    await waitFor(() => {
      expect(apiService.getKnowledgeCheckBlocks).toHaveBeenCalledTimes(1);
    });
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    expect(screen.getByTestId("alert-error")).toBeInTheDocument();
  });
});
