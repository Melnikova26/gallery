import Select, {
  DropdownIndicatorProps,
  components,
  StylesConfig,
} from "react-select";
import { ISelectValues } from "../selectItems/SelectItems";
import st from "./SelectItem.module.scss";
import { useState } from "react";

interface ISelectItemProps {
  name: string;
  options: ISelectValues[];
}

const SelectItem: React.FC<ISelectItemProps> = ({ name, options }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const DropdownIndicator: React.FC<DropdownIndicatorProps> = (props) => (
    <components.DropdownIndicator {...props}>
      {isDropdownOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path
            d="M0.321395 4.1663L4.22936 0.314613C4.65497 -0.104871 5.34503 -0.104871 5.77064 0.314613L9.67861 4.1663C10.3652 4.84298 9.87892 6 8.90797 6L1.09203 6C0.121082 6 -0.365172 4.84298 0.321395 4.1663Z"
            fill="black"
            fillOpacity="0.3"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path
            d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.36609e-08 1.09203 0L8.90797 6.7345e-07C9.87892 7.57111e-07 10.3652 1.15702 9.67861 1.8337Z"
            fill="black"
            fillOpacity="0.3"
          />
        </svg>
      )}
    </components.DropdownIndicator>
  );

  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderRadius: state.menuIsOpen ? "0.5rem 0.5rem 0 0" : "0.5rem",
      border:
        state.isFocused || state.menuIsOpen
          ? "1px solid #000!important"
          : "1px solid rgba(0, 0, 0, .30)",
      borderBottom: "1px solid rgba(0, 0, 0, 0.30)",
      boxShadow: state.isFocused && state.menuIsOpen ? "" : "",
      height: "2.8125rem",
      width: "16.5625rem",
      maxWidth: "16.5625rem",
      fontSize: "0.8125rem",
      color: "#000",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0 0 0.5rem 0.5rem",
      border: "1px solid #000",
      borderColor: "#000",
      marginTop: 0,
      boxShadow: "none",
      borderTop: "0px",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0.62rem 0",
    }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,
      fontSize: "1rem",
      fontWeight: "500",
      lineHeight: "1.25rem",
      backgroundColor: isFocused || isSelected ? "#000" : "transparent",
      color: isFocused || isSelected ? "#fff" : "#000",
      border: isFocused || isSelected ? "#fff" : "#000",
      padding: "0.62rem 1.88rem",
      "&:hover": {
        backgroundColor: "#000",
        color: "#fff",
      },
    }),
  };

  return (
    <>
      <Select
        styles={customStyles}
        className={`${st.select}`}
        placeholder={name}
        isSearchable={true}
        components={{ DropdownIndicator }}
        options={options}
        onMenuOpen={() => setIsDropdownOpen(true)}
        onMenuClose={() => setIsDropdownOpen(false)}
      />
    </>
  );
};
export default SelectItem;
