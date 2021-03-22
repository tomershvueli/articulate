import { render, screen } from '@testing-library/react';
import App from './App';

describe("App", () => {
  it("should render the app title", () => {
    render(<App />);
    const linkElement = screen.getByText(/knowledge check blocks/i);
    expect(linkElement).toBeInTheDocument();
  });
});
