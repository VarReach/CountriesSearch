import React from "react";
import { render } from "@testing-library/react";
import mockCountries from "../../../../__mocks__/countriesMock";
// Components
import Footer, { FooterProps } from "./Footer";

/**
 * Covers tests for the ResultsPage Footer
 */

describe("<Footer/>", () => {
  const defaultProps: FooterProps = {
    countries: mockCountries,
  };

  test("renders without crashing", () => {
    const { container } = render(<Footer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});