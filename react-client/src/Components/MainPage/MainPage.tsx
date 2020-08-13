import React, { FC } from "react";
import "./MainPage.css"
// Components
/* @ts-ignore */
import globe from "../../Assets/globe.png";
import SearchBar from "../SearchBar/SearchBar";

export const MainPage: FC = () => {
  return (
    <div className="main">
      <div className="main__search">
        <img className="logo" src={globe} />
        <SearchBar 
          page={"main"}
        />
      </div>
    </div>
  );
}

export default MainPage;