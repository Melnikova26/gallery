import { useMutation, useQuery, useQueryClient } from "react-query";
import CardItem from "../cardItem/CardItem";
import st from "./Cards.module.scss";
import { ParamsType, baseURL, getPaintings } from "../../services/fetcher";
import useInfoQuery from "../../hooks/useInfoQuery";
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";

export interface IPaintingsType {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

interface ICardsProps {
  currentPage: number;
  limit: number;
  filters?: ParamsType;
}

const Cards: React.FC<ICardsProps> = ({ currentPage, limit, filters }) => {
  useEffect(() => {
    console.log("hi", filters);
  }, [filters]);

  const { data: paintings, isLoading } = useQuery(
    ["paintings", currentPage, filters],
    () => getPaintings(currentPage, limit, filters),
    {
      staleTime: 1000 * 5,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className={st.main}>
      {paintings &&
        paintings.data.map((painting: IPaintingsType) => (
          <CardItem key={painting.id} {...painting} />
        ))}
    </main>
  );
};

export default Cards;
