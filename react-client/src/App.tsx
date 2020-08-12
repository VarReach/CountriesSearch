import React, { FC, useState, useEffect } from "react";
import CountriesService, { Country, SearchType } from "./Services/CountriesService";
// Components
import MainPage from "./Components/MainPage";
import SearchPage from "./Components/SearchPage";

type SearchContextValue = {
  fetchCountries: (type: SearchType, value: string) => void;
}
const SearchContext = React.createContext<SearchContextValue>({ fetchCountries: () => null });

export const App: FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    // (async () => {
    //   if (window.location.search) {

    //   }
    // })();
  }, []);

  const fetchCountries = async (type: SearchType, value: string) => {
    setLoading(true);
    try {
      const countries = await CountriesService.get(type, value);
      setCountries(countries);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <SearchContext.Provider value={{ fetchCountries }}>
      {countries.length ? 
      <SearchPage /> : 
      <MainPage />
      }
    </SearchContext.Provider>
  );
}

export default App;