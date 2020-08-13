import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CountryService from "./Services/CountriesService";
import QS from "query-string";
import mockCountries from "../__mocks__/countriesMock.js";
// Components
import App from "./App";

/**
 * Covers tests for the App
 */

describe("<App/>", () => {
  let params;

  beforeEach(() => {
    params = {};
    CountryService.get = jest.fn().mockResolvedValue(mockCountries);
    QS.parse = jest.fn().mockReturnValue(params);
  });

  describe("no query params", () => {
    test("renders main page without crashing", () => {
      const { container } = render(<App />);
      expect(screen.getByTestId("main")).toBeTruthy();
      expect(container).toMatchSnapshot();
    });
  });

  describe("query params", () => {
    describe("invalid query params should not be respected", () => {
      test("both invalid", () => {
        params = { type: "invalid" };
        QS.parse = jest.fn().mockReturnValue(params);
  
        render(<App />);
        expect(CountryService.get).not.toHaveBeenCalled();
        expect(screen.getByTestId("main")).toBeTruthy();
      });

      test("type invalid", () => {
        params = { type: "invalid", value: "params"};
        QS.parse = jest.fn().mockReturnValue(params);
  
        render(<App />);
        expect(CountryService.get).not.toHaveBeenCalled();
        expect(screen.getByTestId("main")).toBeTruthy();
      });

      test("valid type = 'code': value length is invalid", () => {
        params = { type: "code", value: "params"};
        QS.parse = jest.fn().mockReturnValue(params);
  
        render(<App />);
        expect(CountryService.get).not.toHaveBeenCalled();
        expect(screen.getByTestId("main")).toBeTruthy();
      });
    });

    describe("valid query params should be respected", () => {
      test("valid: type = 'name'", async () => {
        params = { type: "name", value: "name-value"};
        QS.parse = jest.fn().mockReturnValue(params);
  
        render(<App />);
        expect(CountryService.get).toHaveBeenCalledWith(params.type, params.value);
        const resultsPage = await waitFor(() => screen.getByTestId("results"));
        expect(resultsPage).toBeTruthy();
      });

      test("valid: type = 'fullName'", async () => {
        params = { type: "fullName", value: "name-value"};
        QS.parse = jest.fn().mockReturnValue(params);
  
        render(<App />);
        expect(CountryService.get).toHaveBeenCalledWith(params.type, params.value);
        const resultsPage = await waitFor(() => screen.getByTestId("results"));
        expect(resultsPage).toBeTruthy();
      });

      test("valid: type = 'code'", async () => {
        params = { type: "code", value: "yes"};
        QS.parse = jest.fn().mockReturnValue(params);
  
        render(<App />);
        expect(CountryService.get).toHaveBeenCalledWith(params.type, params.value);
        const resultsPage = await waitFor(() => screen.getByTestId("results"));
        expect(resultsPage).toBeTruthy();
      });
    })
  });
});