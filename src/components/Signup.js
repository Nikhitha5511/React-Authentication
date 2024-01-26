

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword || !username) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      if (password !== confirmPassword) {
        setError("Passwords don't match");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: username });

      console.log('User registered and logged in successfully');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`sinupPage ${loading ? 'blur' : ''}`}>
      <div className='card'>
        <label>Email:</label>
        <input type="email" placeholder='your@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password"  placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Confirm Password:</label>
        <input type="password" placeholder='ReEnter Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <label>Username:</label>
        <input type="text"  placeholder='Enter userName' value={username} onChange={(e) => setUsername(e.target.value)} />
        <button className='button1' onClick={handleSignup} disabled={loading}>Sign up</button>
        {loading && <div className="loader"></div>} 
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
