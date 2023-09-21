import { components } from "react-select";
import DropDownArrowClose from "../../dropdownArrow/DropDownArrowClose";
import DropdownArrowOpen from "../../dropdownArrow/DropdownArrowOpen";
import { DropdownProps } from "../../types";

const DropdownIndicator: React.FC<DropdownProps> = (props) => (
  <components.DropdownIndicator {...props}>
    {props.isDropdownOpen ? <DropdownArrowOpen /> : <DropDownArrowClose />}
  </components.DropdownIndicator>
);

export default DropdownIndicator;
