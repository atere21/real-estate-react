import React from 'react';
import { Link } from 'react-router-dom'; // Fix the import statement

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-3'>Sign Up</h1>

      <form className='flex flex-col gap-4 '>
        <input type='text' placeholder='Username' id='username' className='border p-3 rounded-lg' />
        <input type='email' placeholder='Email' id='email' className='border p-3 rounded-lg' />
        <input type='password' placeholder='Password' id='password' className='border p-3 rounded-lg' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 text-center'>SIGN UP</button> {/* Fixed typo here */}
      </form>

      <div className=' flex gap-2 mt-5 '>
        <p>Have an account?</p>

        <Link to="/signin"> {/* Use double quotes for string literals */}
          <span className='flex gap-2 ml-5 text-blue-600'>Sign In</span>
        </Link>
      </div>
    </div>
  );
}
