import { useContext, useState } from "react";
import Header from "../header/Header";
import SelectItems from "../selectItems/SelectItems";
import { ThemeContext, Theme } from "../../context/ThemeContext";

import st from "./App.module.scss";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={theme === Theme.light ? st.containerLight : st.containerDark}
    >
      <div className={st.app}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        <SelectItems />
      </div>
    </div>
  );
}

export default App;
