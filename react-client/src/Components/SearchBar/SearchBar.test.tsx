import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
// Context
import { SearchContext } from "../../App";
// Components
import SearchBar, { SearchBarProps } from "./SearchBar";

/**
 * Covers tests for the SearchBar and SearchTypeDropdown
 */
describe("<SearchBar/>", () => {
  const defaultContext = {
    fetchCountries: jest.fn(),
  };

  const defaultProps: SearchBarProps = {
    page: "main",
  };

  test("renders without crashing", () => {
    const { container } = render(
      <SearchContext.Provider value={defaultContext}>
        <SearchBar {...defaultProps} />
      </SearchContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  describe("<SearchTypeDropdown />", () => {
    test("dropdown should be visible after clicking on button", () => {
      render(
        <SearchContext.Provider value={defaultContext}>
          <SearchBar {...defaultProps} />
        </SearchContext.Provider>
      );

      expect(screen.queryByRole("listbox")).toBeFalsy();
      fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
      expect(screen.getByRole("listbox")).toBeTruthy();
    });

    test("clicking elsewhere should close the dropdown", () => {
      const { getByRole } = render(
        <SearchContext.Provider value={defaultContext}>
          <SearchBar {...defaultProps} />
        </SearchContext.Provider>
      );

      fireEvent.click(getByRole("button", { name: "name expand_more" }));
      expect(screen.getByRole("listbox")).toBeTruthy();

      fireEvent.click(document);
      expect(screen.queryByRole("listbox")).toBeFalsy();
    });

    test("clicking 'escape' should close the dropdown", () => {
      render(
        <SearchContext.Provider value={defaultContext}>
          <SearchBar {...defaultProps} />
        </SearchContext.Provider>
      );

      fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
      expect(screen.getByRole("listbox")).toBeTruthy();

      fireEvent.keyDown(screen.getByRole("listbox"), { key: "Escape" });
      expect(screen.queryByRole("listbox")).toBeFalsy();
    });

    test("clicking on a list button should close the dropdown and update search type", () => {
      render(
        <SearchContext.Provider value={defaultContext}>
          <SearchBar {...defaultProps} />
        </SearchContext.Provider>
      );

      fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
      expect(screen.getByRole("listbox")).toBeTruthy();

      fireEvent.click(screen.getByText("full name"));
      expect(screen.queryByRole("listbox")).toBeFalsy();
      expect(screen.getByRole("button", { name: "full name expand_more" })).toBeTruthy();
    });

    test("clicking on the selected type should close the dropdown", () => {
      render(
        <SearchContext.Provider value={defaultContext}>
          <SearchBar {...defaultProps} />
        </SearchContext.Provider>
      );

      fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
      expect(screen.getByRole("listbox")).toBeTruthy();

      const elements = screen.getAllByText("name");
      fireEvent.click(elements[1]);
      expect(screen.queryByRole("listbox")).toBeFalsy();
      expect(screen.getByRole("button", { name: "name expand_more" })).toBeTruthy();
    });
  });

  test("When search type is code, the input is limited to max 3 characters", () => {
    render(
      <SearchContext.Provider value={defaultContext}>
        <SearchBar {...defaultProps} />
      </SearchContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
    expect(screen.getByRole("listbox")).toBeTruthy();

    fireEvent.click(screen.getByText("code"));
    expect(screen.queryByRole("listbox")).toBeFalsy();
    expect(screen.getByRole("button", { name: "code expand_more" })).toBeTruthy();

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "testing" } });
    expect(screen.queryByDisplayValue("testing")).toBeFalsy();
    expect(screen.getByDisplayValue("tes")).toBeTruthy();
  });

  describe("Switching to/from type Code should clear input", () => {
    test("switching from name to code", () => {
      render(
        <SearchContext.Provider value={defaultContext}>
          <SearchBar {...defaultProps} />
        </SearchContext.Provider>
      );

      fireEvent.change(screen.getByRole("textbox"), { target: { value: "testing" } });
      fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
      fireEvent.click(screen.getByText("code"));
  
      expect(screen.queryByDisplayValue("testing")).toBeFalsy();
    });

    test("switching from full name to code", () => {
      render(
        <SearchContext.Provider value={defaultContext}>
          <SearchBar {...defaultProps} />
        </SearchContext.Provider>
      );
      // Switch to fullname
      fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
      fireEvent.click(screen.getByText("full name"));

      fireEvent.change(screen.getByRole("textbox"), { target: { value: "testing" } });

      // Switch to code
      fireEvent.click(screen.getByRole("button", { name: "full name expand_more" }));
      fireEvent.click(screen.getByText("code"));
  
      expect(screen.queryByDisplayValue("testing")).toBeFalsy();
    });

    test("switching from code to name", () => {
      render(
        <SearchContext.Provider value={defaultContext}>
          <SearchBar {...defaultProps} />
        </SearchContext.Provider>
      );
      // Switch to fullname
      fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
      fireEvent.click(screen.getByText("code"));

      fireEvent.change(screen.getByRole("textbox"), { target: { value: "tes" } });

      // Switch to code
      fireEvent.click(screen.getByRole("button", { name: "code expand_more" }));
      fireEvent.click(screen.getByText("name"));
  
      expect(screen.queryByDisplayValue("tes")).toBeFalsy();
    });

    test("switching from code to full name", () => {
      render(
        <SearchContext.Provider value={defaultContext}>
          <SearchBar {...defaultProps} />
        </SearchContext.Provider>
      );
      // Switch to fullname
      fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
      fireEvent.click(screen.getByText("code"));

      fireEvent.change(screen.getByRole("textbox"), { target: { value: "tes" } });

      // Switch to code
      fireEvent.click(screen.getByRole("button", { name: "code expand_more" }));
      fireEvent.click(screen.getByText("full name"));
  
      expect(screen.queryByDisplayValue("tes")).toBeFalsy();
    });
  });

  test("should not attempt to fetch countries if input is empty", () => {
    render(
      <SearchContext.Provider value={defaultContext}>
        <SearchBar {...defaultProps} />
      </SearchContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
    expect(screen.getByRole("listbox")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "search" }));
    expect(defaultContext.fetchCountries).not.toHaveBeenCalled();
  });

  test("should attempt to fetch countries if input is empty", () => {
    render(
      <SearchContext.Provider value={defaultContext}>
        <SearchBar {...defaultProps} />
      </SearchContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "name expand_more" }));
    expect(screen.getByRole("listbox")).toBeTruthy();

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "testing" } });
    fireEvent.click(screen.getByRole("button", { name: "search" }));
    expect(defaultContext.fetchCountries).toHaveBeenCalled();
  });
});