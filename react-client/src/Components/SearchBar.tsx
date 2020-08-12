import React, { FC, useState } from "react";
import { SearchType } from "../Services/CountriesService";

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
    <form id={`search_form__${page}`} className={`search_${page}`} onSubmit={(event) => event.preventDefault()}>
      <input 
        id={`search_form_input__${page}`} 
        className={`search_input__${page}`} 
        tabIndex={1} 
        value={searchValue} 
        autoComplete="off" 
        autoCapitalize="off" 
        autoCorrect="off" 
        onChange={updateSearchValue}
      />
      <input
        id={`search_form_button__${page}`}
        className={`search_button__${page}`}
        type="submit"
        tabIndex={2}
      />
    </form>
  );
}

export default SearchBar;