import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useInfoQuery from "../../hooks/useInfoQuery";
import PageButton from "../pageButton/PageButton";
import Cards from "../cards/Cards";
import { getPaintings } from "../../services/fetcher";
import { Theme, useTheme } from "../../context/ThemeContext";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { IPaginationProps } from "../../types";

import st from "./Pagination.module.scss";

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  setCurrentPage,
  filters,
  totalPaintings,
}) => {
  const [totalPage, setTotalPage] = useState(0);
  const [buttonsToRender, setButtonsToRender] = useState([0]);
  const { limit } = useInfoQuery();

  const { theme } = useTheme();

  const themeColor = theme === Theme.light ? st.light : st.dark;

  const {
    data: paintings,
    isLoading,
    isError,
    isSuccess,
    isPreviousData,
  } = useQuery(
    ["paintings", currentPage, filters],
    () => getPaintings(currentPage, limit, filters),
    {
      staleTime: 1000 * 5,
    },
  );

  useEffect(() => {
    if (totalPaintings) {
      const newTotalPage = Math.ceil(totalPaintings / limit);
      setTotalPage(newTotalPage);
    }
  }, [totalPaintings, limit, filters, totalPage]);

  useEffect(() => {
    const maxButtons = 3;
    const middleButton = Math.ceil(maxButtons / 2);

    let newButtonsToRender: number[] = [];

    if (totalPage <= 2) {
      newButtonsToRender.length = totalPage;
      for (let i = 0; i < totalPage; i++) {
        newButtonsToRender[i] = i + 1;
      }
    } else {
      const lastPage = Math.min(currentPage + middleButton - 1, totalPage);
      const firstPage = Math.max(lastPage - maxButtons + 1, 1);

      newButtonsToRender = Array.from(
        { length: maxButtons },
        (_, index) => firstPage + index,
      );
    }

    setButtonsToRender(newButtonsToRender);
  }, [currentPage, totalPage]);

  const lastPage = () => setCurrentPage(totalPage);

  const firstPage = () => setCurrentPage(1);

  const nextPage = () => {
    setCurrentPage((prevCurrentPage: number) => prevCurrentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage((prevCurrentPage: number) => prevCurrentPage - 1);
  };

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

  if (isLoading && !isSuccess) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Cards paintings={paintings} />
      {nav}
    </>
  );
};

export default Pagination;
