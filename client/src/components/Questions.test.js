import { render, screen, act } from '@testing-library/react';
import Questions from './Questions';

describe("Questions", () => {
  it("renders spinner", () => {
    render(<Questions />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders questions after fetch calls", async () => {
    jest.spyOn(window, 'fetch');
    act(async () => {
      render(<Questions />);
      jest.useFakeTimers();
    });
    // expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });
});
