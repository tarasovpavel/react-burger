import style from "./error-page.module.css";
import { useNavigate } from "react-router-dom";



function ErrorPage() {
  const navigate = useNavigate();

  function handleClickMain() {
    navigate("/");
  }

  return (


    <div className="text text_type_main-large">
      <p>Ошибка 404</p>
      <p>Страница не найдена</p>
      
    </div>
  );
}

export default ErrorPage;
