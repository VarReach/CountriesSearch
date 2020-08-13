import React from "react";
import { render } from "@testing-library/react";
// Components
import Header from "./Header";

/**
 * Covers tests for the ResultsPage Header
 */

describe("<Header/>", () => {
  test("renders without crashing", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});