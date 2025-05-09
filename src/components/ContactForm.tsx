import { FormEvent } from 'react';
import { useForm } from '../hooks/useForm';
import Button from './Button';
import './ContactForm.css';

/**
 * Simple contact form that uses our custom useForm hook
 */
const ContactForm = () => {
  const { values, errors, touched, handleChange, handleBlur, resetForm, validateField } = useForm({
    name: '',
    email: '',
    message: '',
  });

  const validateName = (value: string) => {
    return value.trim() === '' ? 'Name is required' : null;
  };

  const validateEmail = (value: string) => {
    if (value.trim() === '') return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
    return null;
  };

  const validateMessage = (value: string) => {
    return value.trim() === '' ? 'Message is required' : null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nameValid = validateField('name', validateName);
    const emailValid = validateField('email', validateEmail);
    const messageValid = validateField('message', validateMessage);

    if (nameValid && emailValid && messageValid) {
      // In a real app, you'd submit the form here
      alert(`Form submitted with: ${JSON.stringify(values, null, 2)}`);
      resetForm();
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.name && errors.name ? 'error' : ''}
          />
          {touched.name && errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.email && errors.email ? 'error' : ''}
          />
          {touched.email && errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.message && errors.message ? 'error' : ''}
            rows={4}
          />
          {touched.message && errors.message && <div className="error-message">{errors.message}</div>}
        </div>

        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={resetForm}>
            Reset
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
