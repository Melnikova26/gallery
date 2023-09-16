import Select, { StylesConfig } from "react-select";
import { ISelectValues } from "../selectItems/SelectItems";
import st from "./SelectItem.module.scss";
import { useState } from "react";
import CustomClearIndicator from "../customClearIndicator/CustomClearIndicator";
import DropdownIndicator from "../dropdownIndicator/DropdownIndicator";

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
