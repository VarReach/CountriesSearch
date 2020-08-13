import React, { FC } from "react";
import "./ResultsPage.css";
import { Country } from "../../Services/CountriesService";
import { AxiosError } from "axios";
// Components
import Header from "./Header/Header";
import CountryCard from "./CountryCard/CountryCard";
import Footer from "./Footer/Footer";

export interface ResultsPageProps {
  loading: boolean;
  error: AxiosError;
  countries: Country[];
}

export const ResultsPage: FC<ResultsPageProps> = (props) => {
  const { error, countries } = props;
  return (
    <div className="results" data-testid="results">
      <Header />
      <div className="results__content">
        {countries && !error && (
          <>
            <section className="results__content__country-list" role="list">
              {countries.map((country,i) => {
                return <CountryCard key={i} country={country} />
              })}
            </section>
            <Footer countries={countries} />
          </>
        )}
        {error && (
          <div className="results__error">
            {error && error.response && error.response.status === 404 ? "No results found." : "Something went wrong."}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;