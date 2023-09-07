import CardItem from "../cardItem/CardItem";
import st from './Cards.module.scss';
const Cards = () => {
    return (
        <main className={st.main}>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
            <CardItem/>
        </main>
    );
}
export default Cards;