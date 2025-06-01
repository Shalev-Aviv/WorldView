import React from 'react';

interface AuthStatusProps {
  email: string;
  onLogout: () => void;
}

export default function AuthStatus({ email, onLogout }: AuthStatusProps) {
  return (
    <div className='absolute top-4 left-4'>
      <div>{email}</div>
      <button className=' cursor-pointer mt-2 fill-white bg-red-500 border-none px-3 py-1.5 rounded-sm'
        onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}
