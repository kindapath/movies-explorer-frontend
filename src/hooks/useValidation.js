import { useEffect, useState } from "react";

export default function useValidation() {

  // стейти значений инпутов, ошибок и валидности формы
  const [values, setValues] = useState({})
  const [error, setError] = useState({})
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {

    // если каждый ключ в объекте error пустой, то форма валидная (true)
    // иначе форма не валидная (false)
    const formValid = Object.values(error).every(error => error === '')
    setFormValid(formValid)

    // когда объект error меняется, то снова проверяем
  }, [error])

  // при изменении значения инпута
  function onChange(e) {
    // достаем из инпута с которым работаем name и value
    const { name, value } = e.target;

    // достаем validationMessage из инпута с которым работаем
    const error = e.target.validationMessage

    // в стейт values (значений) записываем имя инпута и его значение
    // затем в стейт errors (ошибки) записываем имя инпута и его ошибку
    // предварительно копируем все содержимое стейтов, чтобы оно не стералось
    setValues(values => ({ ...values, [name]: value }));
    setError(errors => ({ ...errors, [name]: error }));
  }

  // сбрасываем валидацию
  function resetValidation(values = {}, error = {}) {
    setValues(values);
    setError(error)
  }


  return {
    values,
    setValues,
    error,
    onChange,
    resetValidation,
    formValid
  }
}

