import React, { useState } from 'react';
import axios from 'axios';
import RegistrationForm from './src/RegistrationForm';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    dob: '',
    languages: [],
    country: '',
    state: '',
    city: '',
  });

  const [message, setMessage] = useState('');

  const languagesList = ['English', 'Hindi', 'Tamil', 'Telugu'];

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'select-multiple') {
      const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
      setFormData({ ...formData, [name]: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register.php`, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="date" name="dob" onChange={handleChange} required />

      <select name="languages" multiple onChange={handleChange} required>
        {languagesList.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <select name="country" onChange={handleChange} required>
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
      </select>

      <select name="state" onChange={handleChange} required>
        <option value="">Select State</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="California">California</option>
      </select>

      <select name="city" onChange={handleChange} required>
        <option value="">Select City</option>
        <option value="Chennai">Chennai</option>
        <option value="Los Angeles">Los Angeles</option>
      </select>

      <button type="submit">Submit</button>
      <button type="button" onClick={() => (window.location.href = '/login')}>
        Go to Login
      </button>

      <p>{message}</p>
    </form>
  );
};

export default RegistrationForm;

