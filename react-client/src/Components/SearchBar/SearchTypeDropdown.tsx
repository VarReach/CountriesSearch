import React, { FC, useEffect } from "react";
import { SearchType } from "../../Services/CountriesService";

interface SearchTypeDropdownProps {
  page: "main" | "results";
  visible: boolean;
  selectedType: SearchType;
  switchType: (type: SearchType) => void;
  setVisible: (visible: boolean) => void;
}


export const SearchTypeDropdown: FC<SearchTypeDropdownProps> = (props) => {
  const { page, selectedType, visible, setVisible, switchType } = props;

  const options = ["name", "fullName", "code"]

  /**
   * Hide the dropdown when the user clicks outside of it or presses the 'escape' key
   */
  useEffect(() => {
    const clickEvent = () => {
      setVisible(false);
    }
    const keyDownEvent = (event) => {
      if (event.key === "Escape") setVisible(false);
    }

    if (visible) {
      setTimeout(() => {
        window.document.addEventListener("click", clickEvent);
        window.document.addEventListener("keydown", keyDownEvent);
      });
    }
    return () => {
      // Went from visible to open, remove events
      window.document.removeEventListener("click", clickEvent);
      window.document.removeEventListener("keydown", keyDownEvent);
    }
  }, [visible])


  const dropdownClasses = "search-type-dropdown" +
   (visible ? "" : " hide");

  return (
    <div id={`search-type-dropdown__${page}`} className={dropdownClasses}>
      <ul className="search-type-dropdown__list">
        {options.map((option, i) => {
          return (
            <li key={i} className="search-type-dropdown__list-item">
              <button 
                type="button" 
                className={
                  "search-type-dropdown__button" + (selectedType === option ? " selected" : "")
                }
                onClick={() => switchType(option)}
              >
                {option === "fullName" ? "full name" : option}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchTypeDropdown;