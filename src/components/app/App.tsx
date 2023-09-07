import { useEffect, useState } from "react";
import st from './App.module.scss';
import Header from "../header/Header";
import SelectItems from "../selectItems/SelectItems";
import Cards from "../cards/Cards";
import axios from 'axios';

export enum Theme {
    light = 'light',
    dark = 'dark',
}
function App() {
    const [theme, setTheme] = useState<string>(Theme.light);

async function fetchArtists() {
    try {
      const response = await axios.get('https://test-front.framework.team/authors');
      return response.data;
    } catch (error) {
      console.error('Произошла ошибка при получении данных о художниках:', error);
      throw error;
    }
  }
  const getData = async ()=> {
    const data = await fetchArtists();
    console.log(data);
  }
  useEffect( ()=> {
    getData();
  })

  return (
    <div className={st.app}>
        <div className={theme === Theme.light ? st.containerLight : st.containerDark}>
            <Header theme={theme} setTheme={setTheme}/>
            <SelectItems/>
            <Cards/>
        </div>
    </div>
    
  );
}

export default App;
