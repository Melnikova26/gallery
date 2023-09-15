interface IPageButtonProps {
  page: number;
  setCurrentPage: Function;
}
const PageButton: React.FC<IPageButtonProps> = ({ page, setCurrentPage }) => {
  return <button onClick={() => setCurrentPage(page)}>{page}</button>;
};

export default PageButton;
