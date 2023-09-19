import { ICardsProps, IPaintingsType } from "../../types";
import CardItem from "../cardItem/CardItem";

import st from "./Cards.module.scss";

const Cards: React.FC<ICardsProps> = ({ paintings }) => (
  <main className={st.main}>
    {paintings &&
      paintings.data.map((painting: IPaintingsType) => (
        <CardItem key={painting.id} {...painting} />
      ))}
  </main>
);

export default Cards;
