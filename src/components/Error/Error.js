// презентационный компонент, который отрисовывает подвал
import { Alert, AlertTitle } from '@mui/material';
import './Error.css';

const Error = ({ errorTitle, errorText, isOpen }) => {
  return (
    <Alert severity="error" color="error" variant="filled" isOpen={isOpen}>
      <AlertTitle>{errorTitle}</ AlertTitle>
      {errorText}
    </Alert>
  )
}

export default Error;
