import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ISelectCreatedProps, ParamsType } from "../../types";
import { Theme, useTheme } from "../../context/ThemeContext";
import DropdownArrowOpen from "../../dropdownArrow/DropdownArrowOpen";
import DropDownArrowClose from "../../dropdownArrow/DropDownArrowClose";

import st from "./SelectCreatedItem.module.scss";

const SelectCreatedItem: React.FC<ISelectCreatedProps> = ({
  nameValue,
  setFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [selectValue, setSelectValue] = useState(nameValue);

  const { theme } = useTheme();

  const filtersRef = useRef<HTMLDivElement | null>(null);

  const themeColor = theme === Theme.light ? st.light : st.dark;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(`.${st.filters}`)) {
        toggleMenu();
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (fromValue || toValue) {
      setSelectValue(`${fromValue}-${toValue}`);
    } else {
      setSelectValue(nameValue);
    }
    if (toValue.length === 4 && fromValue.length === 4) {
      toggleMenu();
      setFilters((prevFilter: ParamsType) => ({
        ...prevFilter,
        from: fromValue.toString(),
        to: toValue.toString(),
      }));
    }
    if (toValue.length === 0 && fromValue.length === 0) {
      setFilters((prevFilter: ParamsType) => ({
        ...prevFilter,
        from: undefined,
        to: undefined,
      }));
    }
  }, [fromValue, toValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "from") {
      setFromValue(value.slice(0, 4));
    } else if (name === "to") {
      setToValue(value.slice(0, 4));
    }
  };

  return (
    <div className={st.filters}>
      <div
        className={`${isOpen ? st.select_open : st.select_close} ${themeColor}`}
      >
        <div className={`${st.header} ${themeColor}`}>{selectValue}</div>
        <div className={st.dropDown} onClick={toggleMenu}>
          {isOpen ? <DropdownArrowOpen /> : <DropDownArrowClose />}
        </div>
        {isOpen && (
          <form className={`${st.menu} ${themeColor}`}>
            <input
              className={st.from}
              type="number"
              name="from"
              min={0}
              maxLength={4}
              placeholder="from"
              value={fromValue}
              onChange={handleInputChange}
            />
            <div className={`${st.minus} ${themeColor}`} />
            <input
              className={st.to}
              type="number"
              name="to"
              maxLength={4}
              placeholder="to"
              value={toValue}
              onChange={handleInputChange}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default SelectCreatedItem;
