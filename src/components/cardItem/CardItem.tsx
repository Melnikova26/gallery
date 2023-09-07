import st from './CardItem.module.scss';

const CardItem = () => {
    return (
        <div className={st.card}>
            <img src='./painting.png' alt="Image" />
            <div className={st.name}>The Starry Night</div>
        </div>
    );
}

export default CardItem;