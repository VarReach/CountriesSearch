import React, { FC, useState } from "react";
import { SearchType } from "../../Services/CountriesService";
import "./SearchBar.css";
// Components
import SearchTypeDropdown from "./SearchTypeDropdown";

interface SearchBarProps {
  page: "main" | "results";
}

export const SearchBar: FC<SearchBarProps> = (props) => {
  const { page } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  // Default to 'name' search type
  const [searchType, setSearchType] = useState<SearchType>("name");

  const updateSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  }

  return (
    <form id={`search_form__${page}`} className={`search_form search_form__${page}`} onSubmit={(event) => event.preventDefault()}>
      <input 
        id={`search_form__input_${page}`}
        className="search_form__input"
        tabIndex={1} 
        value={searchValue} 
        autoComplete="off" 
        autoCapitalize="off" 
        autoCorrect="off" 
        onChange={updateSearchValue}
        autoFocus={true}
      />
      <div className="search_form__inputs">
        <button 
          id={`search_form__type-button_${page}`}
          className="search_form__type-button"
          type="button"
        >
          <span>{searchType}</span>
          <i className="material-icons">expand_more</i>
        </button>
        {/* <SearchTypeDropdown /> */}
        <button
          id={`search_form__submit_${page}`}
          className="search_form__submit"
          tabIndex={3}
        >
          <i className="material-icons">search</i>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;