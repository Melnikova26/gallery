import { useMemo } from "react";
import useInfoQuery from "../../hooks/useInfoQuery";
import PageButton from "../pageButton/PageButton";
import Cards from "../cards/Cards";
import { ParamsType } from "../../services/fetcher";
import st from "./Pagination.module.scss";
import Spinner from "../spinner/Spinner";
import { Theme, useTheme } from "../../context/ThemeContext";

interface IPaginationProps {
  currentPage: number;
  filters?: ParamsType;
  setCurrentPage: Function;
  totalPaintings: number;
}
const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  setCurrentPage,
  filters,
  totalPaintings,
}) => {
  const { limit, isPreviousData, isLoading } = useInfoQuery();

  const { theme } = useTheme();

  const themeColor = theme === Theme.light ? st.light : st.dark;

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

  const maxButtons = 3;
  const middleButton = Math.ceil(maxButtons / 2);
  let buttonsToRender = Array.from(
    { length: maxButtons },
    (_, index) => currentPage - middleButton + index + 1
  );

  if (currentPage <= middleButton) {
    buttonsToRender = Array.from(
      { length: maxButtons },
      (_, index) => index + 1
    );
  } else if (currentPage >= totalPage - middleButton + 1) {
    buttonsToRender = Array.from(
      { length: maxButtons },
      (_, index) => totalPage - maxButtons + index + 1
    );
  }

  const nav = (
    <nav className={st.nav}>
      <button
        className={`${st.btn_arrow_start} ${st.btn_arrow} ${themeColor}`}
        onClick={firstPage}
        disabled={isPreviousData || currentPage === 1}
      >
        &lt;&lt;
      </button>
      <button
        className={`${st.btn_arrow} ${themeColor}`}
        onClick={prevPage}
        disabled={isPreviousData || currentPage === 1}
      >
        &lt;
      </button>

      {buttonsToRender.map((page: number) => (
        <PageButton
          key={page}
          page={page}
          clazz={`${currentPage === page ? st.active_page : ""} ${themeColor}`}
          setCurrentPage={setCurrentPage}
        />
      ))}
      <button
        className={`${st.btn_arrow} ${themeColor}`}
        onClick={nextPage}
        disabled={isPreviousData || currentPage === totalPage}
      >
        &gt;
      </button>
      <button
        className={`${st.btn_arrow_end} ${st.btn_arrow} ${themeColor}`}
        onClick={lastPage}
        disabled={isPreviousData || currentPage === totalPage}
      >
        &gt;&gt;
      </button>
    </nav>
  );

  return (
    <>
      {isLoading && <Spinner />}
      <Cards currentPage={currentPage} limit={limit} filters={filters} />
      {nav}
    </>
  );
};

export default Pagination;
