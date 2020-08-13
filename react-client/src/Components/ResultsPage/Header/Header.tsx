import React, { FC } from "react";
import "./Header.css"
// Components
import SearchBar from "../../SearchBar/SearchBar";
/* @ts-ignore */
import globe from "../../../Assets/globe.png";

export const Header: FC = () => {
  return (
    <div className="results__header">
      <div className="results__search">
        <img className="logo" src={globe} />
        <SearchBar 
          page={"results"}
        />
      </div>
    </div>
  );
}

export default Header;