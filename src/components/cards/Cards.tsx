import { useQueryClient } from "react-query";
import CardItem from "../cardItem/CardItem";
import st from "./Cards.module.scss";
import { baseURL } from "../../services/fetcher";
import useInfoQuery from "../../hooks/useInfoQuery";

interface IPaintingsType {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}
interface ICardsProps {
  currentPage: number;
}

const Cards: React.FC<ICardsProps> = ({ currentPage }) => {
  // const client = useQueryClient();
  // const paintingsData: IPaintingsType[] | undefined = client.getQueryData(['paintings', currentPage]);

  const { paintings } = useInfoQuery();

  return (
    <main className={st.main}>
      {paintings &&
        paintings.map((painting: IPaintingsType) => (
          <CardItem
            key={painting.id}
            imageUrl={`${baseURL}/${painting.imageUrl}`}
            name={painting.name}
          />
        ))}
    </main>
  );
};

export default Cards;
