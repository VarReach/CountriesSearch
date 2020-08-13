import React, { FC } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./MainPage.css"
// Components
import globe from "../../Assets/globe.png";

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