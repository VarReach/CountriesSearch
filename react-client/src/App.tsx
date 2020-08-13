import React, { FC, useState, useEffect } from "react";
import CountriesService, { Country, SearchType } from "./Services/CountriesService";
import QS from "query-string";
import { AxiosError } from "axios";
import "./App.css";
// Components
import MainPage from "./Components/MainPage/MainPage";
import ResultsPage from "./Components/ResultsPage/ResultsPage";

type SearchContextValue = {
  fetchCountries: (type: SearchType, value: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
}
export const SearchContext = React.createContext<SearchContextValue>({ 
  fetchCountries: () => null,
  searchValue: "",
  setSearchValue: () => null,
  searchType: "name",
  setSearchType: () => null,
});

export const App: FC = () => {
  const [countries, setCountries] = useState<Country[]>();
  const [error, setError] = useState<AxiosError>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchType, setSearchType] = useState<SearchType>("name");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCountries = async (type: SearchType, value: string) => {
    if (!loading) setLoading(true);
    updateURL({ type, value })
    try {
      const countries = await CountriesService.get(type, value);
      setCountries(countries);
      if (error) setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const updateURL = (queries: { type?: SearchType, value?: string}) => {
    queries = { ...QS.parse(window.location.search), ...queries };
    const queryString = QS.stringify(queries);
    const newUrl = new URL(window.location.href);
    newUrl.search = `?${queryString}`;
    window.history.replaceState(null, "", newUrl.href);
  }

  useEffect(() => {
    // Check for valid Query params -> execute the search
    const queries = QS.parse(window.location.search);
    const { type } = queries;
    let { value } = queries;
    // Check to make sure Type is valid, if it's not, clear it
    if (type !== "code" && type !== "name" && type !== "fullName") {
      updateURL({ type: undefined });
    // Update the state if BOTH Type and Value are valid
    } else if (type && value) {
      if ((type === "code" && value.length >= 2 && value.length <= 3) || type !== "code") {
        // Use last value if multiple are provided
        value = Array.isArray(value) ? value[value.length - 1] : value;
        // Remove additional values from URL
        updateURL({ value });
        setSearchType(type);
        setSearchValue(value);
        fetchCountries(type, value);
      }
    }
  }, []);

  return (
    <SearchContext.Provider 
      value={{ 
        fetchCountries,
        searchValue,
        setSearchValue,
        searchType,
        setSearchType
      }}
    >
      {loading || error || (countries && countries.length) ? 
      <ResultsPage 
        loading={loading}
        error={error}
        countries={countries}
      /> : 
      <MainPage />
      }
    </SearchContext.Provider>
  );
}

export default App;