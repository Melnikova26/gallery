import style from "./Header.module.scss";
import { Theme } from "../../context/ThemeContext";
import { HeaderProps } from "../../types";

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => (
  <header className={style.items}>
    <div className={style.item}>
      <img src="./assets/img/logo.svg" alt="Logo" />
    </div>
    <div className={style.item}>
      <img
        src={
          theme === Theme.light
            ? "./assets/img/light-theme.svg"
            : "./assets/img/dark-theme.svg"
        }
        alt="Theme"
        onClick={toggleTheme}
      />
    </div>
  </header>
);

export default Header;
