import { useMemo } from 'react';
import useInfoQuery from '../../hooks/useInfoQuery';
import st from './NumberPageItems.module.scss';

const NumberPageItems = () => {
    const {totalPaintings, limit} = useInfoQuery();

    const totalPages = useMemo(() => totalPaintings && Math.ceil(totalPaintings / limit), [totalPaintings, limit])
    
    return(
        <div className={st.buttons}>
            <button></button>
        </div>
    )
}

export default NumberPageItems;