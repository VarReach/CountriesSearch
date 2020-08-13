import React, { FC } from "react";
import { Country } from "../../../Services/CountriesService";
import "./CountryCard.css";


export interface CountryCardProps {
  country: Country;
}

export const CountryCard: FC<CountryCardProps> = (props) => {
  const { country } = props;
  return (
    <div className="results__country-card">
      <h3>{country.name}</h3>
      <div className="results__country-card__content">
        <img src={country.flag} />
        <div>
          <span><h4>Alpha Code 2:</h4> {country.alpha2Code}</span>
          <span><h4>Alpha Code 3:</h4> {country.alpha3Code}</span>
        </div>
        <div>
          <span><h4>Region:</h4> {country.region}</span>
          <span><h4>Subregion:</h4> {country.subregion}</span>
        </div>
        <div>
          <span><h4>Population:</h4> {Number(country.population).toLocaleString()}</span>
        </div>
        <div>
          <h4>Languages:</h4>
          <ul>
            {country.languages.map((language, i) => {
              return <li key={i}>{language.name}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CountryCard;