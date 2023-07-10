import { Link } from "react-router-dom";
import {
  useNavigate,
} from 'react-router-dom';
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <h1 className="not-found__heading">404</h1>
      <p className="not-found__subheading">Страница не найдена</p>
      <button className="not-found__back link" onClick={() => navigate(-3)}>Назад</button>
    </section>
  )
}
