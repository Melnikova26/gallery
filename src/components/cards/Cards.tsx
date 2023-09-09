import { useQueryClient } from "react-query";
import CardItem from "../cardItem/CardItem";
import st from './Cards.module.scss';
import { baseURL } from "../../services/fetcher";

interface IPaintingsType {
    authorId: number;
    created: string;
    id: number;
    imageUrl: string;
    locationId: number;
    name: string;
}

const Cards = () => {
    const client = useQueryClient();
    const paintingsData: IPaintingsType[] | undefined = client.getQueryData(['paintings']);
    return (
        <main className={st.main}>
            {paintingsData && paintingsData.map((painting) => (
                <CardItem key={painting.id} imageUrl={`${baseURL}/${painting.imageUrl}`} name={painting.name}/>
            ))}
        </main>
    );
}
export default Cards;