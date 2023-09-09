import st from './NumberPageItem.module.scss';

interface INumberPageItemProps {
    currentPage: number;
    totalPages: number;
    onPageChange: Function;
}
// const NumberPageItem: React.FC<INumberPageItemProps> = ({num}) => {
//     return(
//         <button className={st.button}>{num}</button>
//     )
// }
const NumberPageItem: React.FC<INumberPageItemProps> = ({ currentPage, totalPages, onPageChange }) => {
    const visiblePages = [];
    const maxVisiblePages = 3;
  
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, totalPages);

    if (currentPage > 1) {
      visiblePages.push(
        <button key="prev" onClick={() => onPageChange(currentPage - 1)}>
          Назад
        </button>
      );
    }
  
    for (let page = startPage; page <= endPage; page++) {
      visiblePages.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      );
    }

    if (currentPage < totalPages) {
      visiblePages.push(
        <button key="next" onClick={() => onPageChange(currentPage + 1)}>
          Вперед
        </button>
      );
    }
  
    return <div className="pagination">{visiblePages}</div>;
  }

export default NumberPageItem;