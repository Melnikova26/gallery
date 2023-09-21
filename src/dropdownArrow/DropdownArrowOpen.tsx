import { useTheme } from "../context/ThemeContext";

const DropdownArrowOpen = () => {
  const { lightThemeThenBlack } = useTheme();
  return (
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
  );
};

export default DropdownArrowOpen;
