import { useContext, useState } from "react";
import Header from "../header/Header";
import SelectItems from "../selectItems/SelectItems";

import st from "./App.module.scss";
import { ThemeContext, Theme } from "../../context/ThemeContext";

// export enum Theme {
//   light = "light",
//   dark = "dark",
// }

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
