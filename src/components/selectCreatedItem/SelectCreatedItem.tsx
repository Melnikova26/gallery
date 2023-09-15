import Select, {
  DropdownIndicatorProps,
  StylesConfig,
  components,
} from "react-select";
import ValueType from "react-select";
import st from "./SelectCreatedItem.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ParamsType } from "../../services/fetcher";

interface ISelectCreatedProps {
  name: string;
  setFilters: Function;
}
interface IValuesInput {
  from: number | string;
  to: number | string;
}
interface ISelect {
  label: string;
  value: string;
}

const SelectCreatedItem: React.FC<ISelectCreatedProps> = ({
  name,
  setFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [selectValue, setSelectValue] = useState(name);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (fromValue || toValue) {
      setSelectValue(`${fromValue}-${toValue}`);
    } else {
      setSelectValue(name);
    }
    if (toValue.length === 4 && fromValue.length === 4) {
      toggleMenu();
      setFilters((prevFilter: ParamsType) => ({
        ...prevFilter,
        from: fromValue.toString(),
        to: toValue.toString(),
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
    <div className={isOpen ? st.select_open : st.select_close}>
      <div className={st.header}>{selectValue}</div>
      <div className={st.dropDown} onClick={toggleMenu}>
        {isOpen ? (
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
      </div>
      {isOpen && (
        <form className={st.menu}>
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
          <div className={st.minus}></div>
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
  );
};

export default SelectCreatedItem;
