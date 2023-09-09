import st from './CardItem.module.scss';

interface ICardType {
    imageUrl: string;
    name: string;
}
const CardItem: React.FC<ICardType> = ({imageUrl, name}) => {
    return (
        <div className={st.card}>
            <img src={imageUrl} alt={name} />
            <div className={st.name}>{name}</div>
        </div>
    );
}

export default CardItem;