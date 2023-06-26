// презентационный компонент, который отрисовывает подвал
import './Error.css';

const Error = ({ errorTitle, errorText, addclass, isOpen }) => {
  return (
    <h2 className={`error ${addclass}`}>{errorText}</h2>
  )
}

export default Error;
