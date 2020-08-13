import React, { FC, useEffect, useCallback } from "react";
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

  const clickEvent = useCallback(() => {
    setVisible(false);
  }, []);
  const keyDownEvent = useCallback((event) => {
    if (event.key === "Escape") setVisible(false);
  }, []);

  /**
   * Hide the dropdown when the user clicks outside of it or presses the 'escape' key
   */
  useEffect(() => {
    if (visible) {
      document.addEventListener("click", clickEvent);
      document.addEventListener("keydown", keyDownEvent);
    } else {
      document.removeEventListener("click", clickEvent);
      document.removeEventListener("keydown", keyDownEvent);
    }
  }, [visible])

  // Make sure event listeners are removed on dismount
  useEffect(() => {
    return () => {
      document.removeEventListener("click", clickEvent);
      document.removeEventListener("keydown", keyDownEvent);
    }
  }, []);

  if (visible) {
    return (
      <div id={`search-type-dropdown__${page}`} className="search-type-dropdown" role="listbox">
        <ul className="search-type-dropdown__list">
          {options.map((option, i) => {
            return (
              <li key={i} className="search-type-dropdown__list-item">
                <button 
                  type="button"
                  title={option}
                  className={
                    "search-type-dropdown__button" + (selectedType === option ? " selected" : "")
                  }
                  onClick={() => switchType(option as SearchType)}
                >
                  {option === "fullName" ? "full name" : option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

export default SearchTypeDropdown;