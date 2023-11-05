import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous error, if any

    try {
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
      setError(null);
      navigate('/signin');

    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-3'>Sign Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={handleChange}
          id='username'
          className='border p-3 rounded-lg'
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          id='email'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 text-center'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>

      {error && <p className='text-red-500'>{error}</p>}

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>

        <Link to='/signin'>
          <span className='flex ml-2 text-blue-600'>Sign In</span>
        </Link>
      </div>
    </div>
  );
}
