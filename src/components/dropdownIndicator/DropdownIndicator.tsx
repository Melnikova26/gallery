import { components } from "react-select";
import { DropdownProps } from "../../types";
import { useTheme } from "../../context/ThemeContext";

const DropdownIndicator: React.FC<DropdownProps> = (props) => {
  const { lightThemeThenBlack } = useTheme();

  return (
    <components.DropdownIndicator {...props}>
      {props.isDropdownOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path
            d="M0.321395 4.1663L4.22936 0.314613C4.65497 -0.104871 5.34503 -0.104871 5.77064 0.314613L9.67861 4.1663C10.3652 4.84298 9.87892 6 8.90797 6L1.09203 6C0.121082 6 -0.365172 4.84298 0.321395 4.1663Z"
            fill={lightThemeThenBlack}
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
            fill={lightThemeThenBlack}
            fillOpacity="0.3"
          />
        </svg>
      )}
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
