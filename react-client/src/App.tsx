import React, { FC, useState, useEffect } from "react";
import CountriesService, { Country, SearchType } from "./Services/CountriesService";
import QS from "query-string";
import "./App.css";
// Components
import MainPage from "./Components/MainPage/MainPage";
import ResultsPage from "./Components/ResultsPage/ResultsPage";

type SearchContextValue = {
  fetchCountries: (type: SearchType, value: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}
export const SearchContext = React.createContext<SearchContextValue>({ 
  fetchCountries: () => null,
  searchValue: "",
  setSearchValue: () => null
});

export const App: FC = () => {
  const [countries, setCountries] = useState<Country[]>();
  const [error, setError] = useState<Error>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCountries = async (type: SearchType, value: string) => {
    if (!loading) setLoading(true);
    updateURL({ type, value })
    try {
      const countries = await CountriesService.get(type, value);
      setCountries(countries);
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
    // Check for valid Querie params -> execute the search
    if (window.location.search) {
      // Ignore unrelated query params
      const queries = QS.parse(window.location.search);
      const { type } = queries;
      let { value } = queries;
      // Check to make sure Type is valid, if it's not, clear it
      if (type !== "code" && type !== "name" && type !== "fullName") {
        updateURL({ type: undefined });
      } else if (type && value) {
        // Use last value if multiple are provided
        value = Array.isArray(value) ? value[value.length - 1] : value;
        // Remove additional values from URL
        updateURL({ value });
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
        setSearchValue
      }}
    >
      {loading || error || (countries && countries.length) ? 
      <ResultsPage /> : 
      <MainPage />
      }
    </SearchContext.Provider>
  );
}

export default App;