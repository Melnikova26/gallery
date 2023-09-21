import { IPageButtonProps } from "../../types";

const PageButton: React.FC<IPageButtonProps> = ({
  page,
  clazz,
  setCurrentPage,
}) => (
  <button className={clazz} onClick={() => setCurrentPage(page)}>
    {page}
  </button>
);

export default PageButton;
