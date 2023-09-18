import style from "./Header.module.scss";
import { Theme } from "../../context/ThemeContext";
interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  console.log(toggleTheme);
  return (
    <>
      <header className={style.items}>
        <div className={style.item}>
          <img src="./logo.svg" alt="Logo" />
        </div>
        <div className={style.item}>
          <img
            src={
              theme === Theme.light ? "./light-theme.svg" : "./dark-theme.svg"
            }
            alt="Theme"
            onClick={toggleTheme}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
