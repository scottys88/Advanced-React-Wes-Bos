import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  function handleChange(e) {
    let { name, type, value } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      const [file] = e.target.files;
      value = file;
    }

    setInputs({ ...inputs, [name]: value });
  }

  const resetForm = () => {
    setInputs(initial);
  };

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  };

  return { inputs, handleChange, resetForm, clearForm };
}
