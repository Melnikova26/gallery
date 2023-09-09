import { useEffect, useState } from "react";
import st from './App.module.scss';
import Header from "../header/Header";
import SelectItems from "../selectItems/SelectItems";
import Cards from "../cards/Cards";
import useInfoQuery from "../../hooks/useInfoQuery";
export enum Theme {
    light = 'light',
    dark = 'dark',
}
function App() {
    const [theme, setTheme] = useState<string>(Theme.light);

    const { paintings, authors, isLoading, isSuccess } = useInfoQuery();

  useEffect( ()=> {
    isSuccess && console.log(authors);
  })

  if (isLoading) return <h1>isLoading...</h1>
  return (
    <div className={theme === Theme.light ? st.containerLight : st.containerDark}>
        <div className={st.app}>
            <Header theme={theme} setTheme={setTheme}/>
            <SelectItems/>
            <Cards/>
        </div>
    </div>
    
  );
}

export default App;
