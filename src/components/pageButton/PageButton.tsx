import st from "./PageButton.module.scss";

interface IPageButtonProps {
  page: number;
  setCurrentPage: Function;
  clazz: string;
}
const PageButton: React.FC<IPageButtonProps> = ({
  page,
  clazz,
  setCurrentPage,
}) => {
  return (
    <button className={clazz} onClick={() => setCurrentPage(page)}>
      {page}
    </button>
  );
};

export default PageButton;
