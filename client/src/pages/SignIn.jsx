import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(signInStart());
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    } finally {
      navigate('/'); // Always navigate after submission
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-3'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      {error && <p className='text-red-500'>{error}</p>}

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>

        <Link to='/signup'>
          <span className='flex ml-2 text-blue-600'>Sign Up</span>
        </Link>
      </div>
    </div>
  );
}
