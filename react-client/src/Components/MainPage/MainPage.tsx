import React, { FC } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./MainPage.css"
// Components
import globe from "../../Assets/globe.png";

export const MainPage: FC = () => {
  return (
    <div className="main">
      <img className="logo" src={globe} />
      <SearchBar 
        page={"main"}
      />
    </div>
  );
}

export default MainPage;