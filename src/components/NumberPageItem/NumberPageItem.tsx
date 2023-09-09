import st from './NumberPageItem.module.scss';

interface INumberPageItemProps {
    num: number;
}
const NumberPageItem: React.FC<INumberPageItemProps> = ({num}) => {

    return(
        <button className={st.button}>{num}</button>
    )
}

export default NumberPageItem;