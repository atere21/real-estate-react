import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      // Check if user info is available in the result
      if (result?.user) {
        const { displayName, email, photoURL } = result.user;

        // Log the photoURL to verify correctness
        console.log('User Photo URL:', photoURL);

        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: result.user.displayName,
            email: result.user.displayName,
            photo: result.user.photoURL,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          dispatch(signInSuccess(data));
          navigate('/dashboard');
        } else {
          throw new Error('Failed to authenticate user');
        }
      } else {
        throw new Error('User information not available');
      }
    } catch (error) {
      console.log('Could not sign in with Google', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with Google
    </button>
  );
}
