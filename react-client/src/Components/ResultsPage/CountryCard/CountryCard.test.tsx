import React from "react";
import { render } from "@testing-library/react";
import mockCountries from "../../../../__mocks__/countriesMock";
// Components
import CountryCard, { CountryCardProps } from "./CountryCard";

/**
 * Covers tests for the ResultsPage CountryCard
 */

describe("<CountryCard/>", () => {
  const defaultProps: CountryCardProps = {
    country: mockCountries[0],
  };

  test("renders without crashing", () => {
    const { container } = render(<CountryCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});