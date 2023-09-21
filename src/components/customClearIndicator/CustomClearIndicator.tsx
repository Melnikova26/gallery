import { ClearIndicatorProps, components } from "react-select";
import Clear from "../Clear/Clear";

const CustomClearIndicator: React.FC<ClearIndicatorProps> = (props) => (
  <components.ClearIndicator {...props}>
    <div
      style={{ cursor: "pointer" }}
      onClick={() => {
        props.clearValue();
      }}
    >
      <Clear />
    </div>
  </components.ClearIndicator>
);

export default CustomClearIndicator;
