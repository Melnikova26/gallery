import Select, { StylesConfig } from "react-select";
import { ISelectValues } from "../selectItems/SelectItems";
import st from "./SelectItem.module.scss";
import { useState } from "react";
import CustomClearIndicator from "../customClearIndicator/CustomClearIndicator";
import DropdownIndicator from "../dropdownIndicator/DropdownIndicator";
import { Theme, useTheme } from "../../context/ThemeContext";

interface ISelectItemProps {
  name: string;
  options: ISelectValues[];
  handleChangeFunc: (value: string | null) => void;
}

const SelectItem: React.FC<ISelectItemProps> = ({
  name,
  options,
  handleChangeFunc,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { theme, lightThemeThenBlack, lightThemeThenWhite } = useTheme();

  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: lightThemeThenWhite,
      borderRadius: state.menuIsOpen ? "0.5rem 0.5rem 0 0" : "0.5rem",
      border:
        state.isFocused || state.menuIsOpen
          ? `1px solid ${lightThemeThenBlack}!important`
          : `1px solid ${
              theme === Theme.light ? "rgba(0, 0, 0, .30)" : "#fff"
            }`,
      borderBottom: `1px solid ${
        theme === Theme.light ? "rgba(0, 0, 0, .30)" : "#fff"
      }`,
      boxShadow: state.isFocused && state.menuIsOpen ? "" : "",
      height: "2.8125rem",
      fontSize: "0.8125rem",
      color: `${lightThemeThenBlack}`,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0 0 0.5rem 0.5rem",
      border: `1px solid ${lightThemeThenBlack}`,
      borderColor: `${lightThemeThenBlack}`,
      marginTop: 0,
      boxShadow: "none",
      borderTop: "0px",
      backgroundColor: lightThemeThenWhite,
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
      backgroundColor:
        isFocused || isSelected ? lightThemeThenBlack : "transparent",
      color:
        isFocused || isSelected
          ? `${lightThemeThenWhite}`
          : `${lightThemeThenBlack}`,
      border:
        isFocused || isSelected ? lightThemeThenWhite : lightThemeThenBlack,
      padding: "0.62rem 1.88rem",
      "&:hover": {
        backgroundColor: lightThemeThenBlack,
        color: lightThemeThenWhite,
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: lightThemeThenBlack,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: "0.2rem 0.94rem 0 0.62rem",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: "0",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 10px 2px 15px",
    }),
  };

  return (
    <>
      <Select
        styles={customStyles}
        className={`${st.select}`}
        placeholder={name}
        components={{
          DropdownIndicator: (props) => (
            <DropdownIndicator isDropdownOpen={isDropdownOpen} {...props} />
          ),
          ClearIndicator: CustomClearIndicator,
        }}
        isClearable={true}
        options={options}
        onMenuOpen={() => setIsDropdownOpen(true)}
        onMenuClose={() => setIsDropdownOpen(false)}
        onChange={(newValue: unknown, actionMeta) => {
          if (newValue) {
            const selectedOption = newValue as { value: string; label: string };
            handleChangeFunc(selectedOption.value);
          } else {
            handleChangeFunc(null);
          }
        }}
      />
    </>
  );
};
export default SelectItem;
