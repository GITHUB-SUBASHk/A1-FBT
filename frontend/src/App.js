import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import SetPassword from './components/SetPassword';
import EmailConfirmed from './components/EmailConfirmed';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/confirm" element={<EmailConfirmed />} />
      <Route path="/set-password" element={<SetPassword />} />
    </Routes>
  </Router>
);

export default App;
