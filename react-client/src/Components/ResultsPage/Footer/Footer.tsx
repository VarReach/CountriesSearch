import React, { FC, useState, useEffect } from "react";
import "./Footer.css"
import { Country } from "../../../Services/CountriesService";

export interface FooterProps {
  countries: Country[],
}

export const Footer: FC<FooterProps> = (props) => {
  const { countries } = props;
  const [counts, setCounts] = useState<{ regionCounts, subregionCounts }>({ regionCounts: {}, subregionCounts: {} });

  useEffect(() => {
    // console.log(countries);
    const counts = countries.reduce((counts, country) => {
      const { region, subregion } = country;
      counts.regionCounts[region] 
        = counts.regionCounts[region] ? counts.regionCounts[region] + 1 : 1; 
      counts.subregionCounts[subregion] 
        = counts.subregionCounts[subregion] ? counts.subregionCounts[subregion] + 1 : 1; 
      return counts;
    }, { regionCounts: {}, subregionCounts: {} });
    setCounts(counts);
  }, [countries]);


  const renderCounts = (entries) => {
    return entries.map(([key, value], i) => {
      return <span key={i}><h3>{key ? key : "Unknown"}:</h3> {value}</span>
    })
  }

  const renderSubregionCounts = () => {
    const entries = Object.entries(counts.subregionCounts);
    if (entries.length) {
      return (
        <div className="results__footer__subregions">
          <h2>Subregions:</h2>
          {renderCounts(entries)}
        </div>
      );
    }
  }

  const renderRegionCounts = () => {
    const entries = Object.entries(counts.subregionCounts);
    if (entries.length) {
      return (
        <div className="results__footer__regions">
          <h2>Regions:</h2>
          {renderCounts(entries)}
        </div>
      );
    }
  }


  return (
    <div className="results__footer">
      <div className="results__footer__total-count">
        <h2>Total Number of Countries Found:</h2>
        <h3>{countries.length}</h3>
      </div>
      <div className="results__footer__counts">
        {renderRegionCounts()}
        {renderSubregionCounts()}
      </div>
    </div>
  );
}

export default Footer;