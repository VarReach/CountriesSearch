import { Url } from "url";
import axios from "axios";

const BASE_URL = `https://${window.location.hostname}:${window.location.port}/api/countries`;

export type SearchType = "code" | "name" | "fullName"

export interface Country {
  languages: {
    iso639_1: string,
    iso639_2: string,
    name: string,
    nativeName: string,
  }[],
  flag: Url,
  name: string,
  alpha2code: string,
  alpha3code: string,
  region: "AFRICA" | "AMERICAS" | "ASIA" | "EUROPE" | "OCEANIA",
  subregion: string,
  population: number,
}

function CountriesService() {
  const service = {
    get,
  };
  // ==================
  //   PUBLIC METHODS
  // ==================
  function get(type: SearchType, value: string): Promise<Country[]> {
    const queryString = `?type=${type}&value=${value}`;
    return axios.get(BASE_URL + queryString);
  }

  return service;
}

export default CountriesService();