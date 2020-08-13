import React, { FC, useState, useContext, useRef } from "react";
import { SearchType } from "../../Services/CountriesService";
import "./SearchBar.css";
// Context
import { SearchContext } from "../../App";
// Components
import SearchTypeDropdown from "./SearchTypeDropdown";

export interface SearchBarProps {
  page: "main" | "results";
}

export const SearchBar: FC<SearchBarProps> = (props) => {
  const { page } = props;
  const { fetchCountries, searchValue, setSearchValue } = useContext(SearchContext);
  // Default to 'name' search type
  const [searchType, setSearchType] = useState<SearchType>("name");
  const [submitError, setSubmitError] = useState<boolean>(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState<boolean>(false);
  
  const searchInput = useRef(null);

  /**
   * Updates the controlled search input's value
   * Enforces "Code" type expectation of 2-3 characters
   * @param event 
   */
  const updateSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    let newValue = event.target.value;
    if (searchType === "code" && newValue.length > 3) {
      newValue = newValue.slice(0, 3);
    }
    if (submitError) setSubmitError(false);

    setSearchValue(newValue);
  }

  /**
   * Clears the search input's value when switching search types
   * @param event 
   */
  const switchType = (type: SearchType) => {
    if (type === searchType) return;
    if (
      (searchType !== "code" && type === "code") ||
      (type !== "code" && searchType === "code")
    ) {
      setSearchValue("");
    }
    searchInput.current.focus();
    setSearchType(type);
  }

  const toggleTypeDropdown = (visible?: boolean) => {
    if (visible === undefined) {
      setShowTypeDropdown(!showTypeDropdown);
    } else {
      setShowTypeDropdown(visible);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchValue.length) {
      setSubmitError(true);
      searchInput.current.focus();
      return;
    }

    fetchCountries(searchType, searchValue);
  }

  // Show red error border when trying to submit if input is empty
  // and lower width when type = "code"
  const formClasses = `search_form search_form__${page}` +
   (submitError ? " error" : "") +
   (searchType === "code" ? " code" : "")

  // Show the clear button only when text is entered
  const clearButtonClasses = "search_form__clear search_form__button" + 
    (searchValue.length ? "" : " hide");
  const searchButtonClasses = "search_form__submit search_form__button" +
    (searchValue.length ? " highlight" : "");

  return (
    <form id={`search_form__${page}`} className={formClasses} onSubmit={handleSubmit}>
      <input 
        id={`search_form__input_${page}`}
        className="search_form__input"
        tabIndex={1} 
        value={searchValue} 
        autoComplete="off" 
        autoCapitalize="off" 
        autoCorrect="off" 
        onChange={updateSearchValue}
        autoFocus={page === "main"}
        ref={searchInput}
      />
      <button 
        id={`search_form__clear`}
        className={clearButtonClasses}
        type="button"
        onClick={() => setSearchValue("")}
      >
        <i className="material-icons">clear</i>
      </button>
      <div className="search_form__inputs">
        <button 
          id={`search_form__type-button_${page}`}
          className="search_form__type-button search_form__button"
          type="button"
          onClick={() => toggleTypeDropdown()}
        >
          <span>{searchType === "fullName" ? "full name" : searchType}</span>
          <i className="material-icons">expand_more</i>
        </button>
        <SearchTypeDropdown 
          page={page}
          visible={showTypeDropdown}
          setVisible={toggleTypeDropdown}
          selectedType={searchType}
          switchType={switchType}
        />
        <button
          id={`search_form__submit_${page}`}
          className={searchButtonClasses}
        >
          <i className="material-icons">search</i>
        </button>
      </div>
      {submitError && (<span className="search_form__error">
        Please enter a value.
      </span>)}
    </form>
  );
}

export default SearchBar;