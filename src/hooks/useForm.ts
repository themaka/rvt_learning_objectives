import { useState, type ChangeEvent } from 'react';

/**
 * Custom hook for managing form state
 * @param initialValues - Initial values for the form
 * @returns Form state and handlers
 */
export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const validateField = (name: keyof T, validator: (value: any) => string | null) => {
    const value = values[name];
    const error = validator(value);
    
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return !error;
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    validateField,
    setValues,
    setErrors,
  };
}
