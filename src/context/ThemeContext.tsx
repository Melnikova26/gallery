import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { ThemeContextType } from "../types";

export enum Theme {
  light = "light",
  dark = "dark",
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.light,
  toggleTheme: () => undefined,
  lightThemeThenBlack: "",
  lightThemeThenWhite: "",
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return Theme.light;
  });

  const saveTheme = (newtheme: string) => {
    localStorage.setItem("theme", newtheme);
  };

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.light ? Theme.dark : Theme.light,
    );
  };

  const lightThemeThenBlack = useMemo(
    () => (theme === Theme.light ? "#000" : "#fff"),
    [theme],
  );
  const lightThemeThenWhite = useMemo(
    () => (theme === Theme.light ? "#fff" : "#0C0C0C"),
    [theme],
  );
  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      lightThemeThenBlack,
      lightThemeThenWhite,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
