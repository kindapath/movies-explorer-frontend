// презентационный компонент, который отрисовывает подвал
import './Error.css';

const Error = ({ errorTitle, errorText, isOpen }) => {
  return (
    <h2 className='error'>{errorText}</h2>
  )
}

export default Error;
