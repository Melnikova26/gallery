import st from "./Spinner.module.scss";
import img from "./spinner.gif";

function Spinner() {
  return (
    <div className={st.spinner}>
      <img src={img} alt="Spinner" />
    </div>
  );
}

export default Spinner;
