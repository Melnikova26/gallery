import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextType {
  theme: string;
  lightThemeThenBlack: string;
  lightThemeThenWhite: string;
  toggleTheme: () => void;
}

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

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(Theme.light);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.light ? Theme.dark : Theme.light
    );
    console.log("heloooow");
  };

  const lightThemeThenBlack = theme === Theme.light ? "#000" : "#fff";
  const lightThemeThenWhite = theme === Theme.light ? "#fff" : "#0C0C0C";

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, lightThemeThenBlack, lightThemeThenWhite }}
    >
      {children}
    </ThemeContext.Provider>
  );
};