
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';

const Dashboard = () => {
  const [username, setUsername] = useState(''); 
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || ''); 
      } else{
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className='dashboard'>
      <div className='flex1'>
      <h2>Dashboard</h2>
      <p>Home</p>
      <button className='button3' onClick={handleLogout}>Logout</button>
    </div>
      
      <p>Welcome, {username}!</p>
     </div>
  );
};

export default Dashboard;
