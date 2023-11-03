import React from 'react';
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom';

export default function HeaderBar() {
  return (
    <header className='bg-slate-300 shadow-md '>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Sahand</span>
            <span className='text-slate-700'>Estate</span>
        </h1>
        </Link>

        <form
         className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input className='bg-transparent focus::outline-none w-24 sm:w-64'
           type='text' placeholder='Search...'
           />
           <BiSearch className='text-slate-600'/>
        </form>
        <ul className='flex gap-4'>
          <Link to="/home"> 
          <li className='hidden sm:inline text-slate-700 hover::underline cursor-pointer'>Home</li>
          </Link>
          <Link to="/about">
          <li className='hidden sm:inline text-slate-700 hover::underline cursor-pointer'>About</li>
          </Link>
          <Link to="/signin">
          <li className=' sm:inline text-slate-700 hover::underline cursor-pointer'>Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
