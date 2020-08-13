import axios from "axios";

const BASE_URL = `http://${window.location.hostname}:${window.location.port}/api/countries`;

export type SearchType = "code" | "name" | "fullName";

export interface Country {
  languages: {
    iso639_1: string,
    iso639_2: string,
    name: string,
    nativeName: string,
  }[],
  flag: string,
  name: string,
  alpha2Code: string,
  alpha3Code: string,
  region: "AFRICA" | "AMERICAS" | "ASIA" | "EUROPE" | "OCEANIA",
  subregion: string,
  population: number,
}

function CountriesService() {
  const service = {
    get: get,
  };
  // ==================
  //   PUBLIC METHODS
  // ==================
  async function get(type: SearchType, value: string): Promise<Country[]> {
    const response = await axios.get(BASE_URL, { params: { type, value }});
    return response.data;
  }

  return service;
}

export default CountriesService();