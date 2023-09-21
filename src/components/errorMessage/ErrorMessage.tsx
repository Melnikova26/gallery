import img from "./error.png";
import st from "./errorMessage.module.scss";

function ErrorMessage() {
  return <img className={st.desc} src={img} alt="Error" />;
}

export default ErrorMessage;
