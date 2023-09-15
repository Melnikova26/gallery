import { useMemo } from "react";
import useInfoQuery from "../../hooks/useInfoQuery";
import PageButton from "../pageButton/PageButton";
import Cards from "../cards/Cards";
import { ParamsType, baseURL, getPaintings } from "../../services/fetcher";
import st from "./Pagination.module.scss";

interface IPaginationProps {
  currentPage: number;
  filters?: ParamsType;
  setCurrentPage: Function;
}
const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  setCurrentPage,
  filters,
}) => {
  const { totalPaintings, limit, isPreviousData, isLoading } = useInfoQuery();

  const totalPage = useMemo(
    () => totalPaintings && Math.ceil(totalPaintings / limit),
    [totalPaintings, limit]
  );

  const lastPage = () => setCurrentPage(totalPage);

  const firstPage = () => setCurrentPage(1);

  const nextPage = () => {
    setCurrentPage((prevCurrentPage: number) => prevCurrentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage((prevCurrentPage: number) => prevCurrentPage - 1);
  };

  const pagesArray = Array(totalPage)
    .fill(0)
    .map((_, i) => i + 1);

  const nav = (
    <nav className={st.nav}>
      <button
        className={`${st.btn_arrow_start} ${st.btn_arrow}`}
        onClick={firstPage}
        disabled={isPreviousData || currentPage === 1}
      >
        &lt;&lt;
      </button>
      <button
        className={st.btn_arrow}
        onClick={prevPage}
        disabled={isPreviousData || currentPage === 1}
      >
        &lt;
      </button>

      {pagesArray.map((page: number) => (
        <PageButton key={page} page={page} setCurrentPage={setCurrentPage} />
      ))}
      <button
        className={st.btn_arrow}
        onClick={nextPage}
        disabled={isPreviousData || currentPage === totalPage}
      >
        &gt;
      </button>
      <button
        className={`${st.btn_arrow_end} ${st.btn_arrow}`}
        onClick={lastPage}
        disabled={isPreviousData || currentPage === totalPage}
      >
        &gt;&gt;
      </button>
    </nav>
  );

  return (
    <>
      {isLoading && <span className="loading">Loading...</span>}
      <Cards currentPage={currentPage} limit={limit} filters={filters} />
      {nav}
    </>
  );
};

export default Pagination;
