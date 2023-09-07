import style from './Header.module.scss';
import { Theme } from '../app/App';
interface HeaderProps {
    theme: string;
    setTheme: Function;
}

const Header: React.FC<HeaderProps> = ({theme, setTheme}) => {
    const changeTheme = () => {
        switch(theme) {
            case Theme.light:
                setTheme(Theme.dark);
            break;
            case Theme.dark:
                setTheme(Theme.light);
            break;
            default:
                setTheme(Theme.light);
        }
    }

    return(
        <>
            <header className={style.items}>
                <div className={style.item}>
                    <img src="./logo.svg" alt="Logo" />
                </div>
                <div className={style.item} onClick={changeTheme}>
                    <img src={ theme === Theme.light ? './light-theme.svg' : './dark-theme.svg'} alt="Theme" />
                </div>
            </header>
        </>
    );
}

export default Header;