import useInfoQuery from "../../hooks/useInfoQuery";
import { baseURL } from "../../services/fetcher";
import { IAuthor, ILocation, IPaintingsType } from "../../types";
import st from "./CardItem.module.scss";

const CardItem: React.FC<Omit<IPaintingsType, "id">> = ({
  authorId,
  locationId,
  created,
  name,
  imageUrl,
}) => {
  const { locations, authors } = useInfoQuery();

  const location: ILocation = locations.find(
    (location: ILocation) => location.id === locationId,
  );

  const author: IAuthor = authors.find(
    (author: IAuthor) => author.id === authorId,
  );

  return (
    <div className={st.card}>
      <img src={`${baseURL}/${imageUrl}`} alt={name} />
      <div className={st.descr}>
        <div className={st.name}>{name}</div>
        <div className={st.about}>
          <div className={st.text}>
            <span>Author:</span> {author.name}
          </div>
          <div className={st.text}>
            <span>Created:</span> {created}
          </div>
          <div className={st.text}>
            <span>Location:</span> {location.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
