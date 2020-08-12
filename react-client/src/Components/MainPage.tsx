import React, { FC } from "react";
import SearchBar from "./SearchBar";
import globe from "../Assets/globe.png";

export const MainPage: FC = () => {
  return (
    <>
      <img src={globe} />
      <SearchBar 
        page={"main"}
      />
    </>
  );
}

export default MainPage;