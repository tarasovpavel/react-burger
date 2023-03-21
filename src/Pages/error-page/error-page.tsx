
import { useNavigate } from "react-router-dom";
import { FC } from "react";



const ErrorPage: FC = () => {
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
