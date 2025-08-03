import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function EmailConfirmed() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Checking...');
  const token = searchParams.get('token');

  useEffect(() => {
    fetch(`http://localhost:8000/api/confirm_email.php?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setStatus('Email confirmed. Proceed to set your password.');
        } else {
          setStatus('Invalid or expired link.');
        }
      });
  }, [token]);

  return (
    <div>
      <h2>{status}</h2>
      {status.includes('Proceed') && (
        <a href={`/set-password?token=${token}`}>Set Password</a>
      )}
    </div>
  );
}
