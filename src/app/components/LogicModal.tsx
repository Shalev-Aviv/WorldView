import React, { useState } from 'react';

type AuthModalProps = {
  show: boolean;
  onAuth: (mode: 'login' | 'signup', email: string, password: string) => void;
  onClose: () => void;
};

export default function LogicModal({ show, onAuth }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if (!show) return null;
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center z-1000'>
      <div className='bg-white p-8 border rounded-[0.75rem] min-w-80 flex flex-col gap-4 shadow-[0_4px_24px_rgba(0,0,0,0.15)]'>
        <h2 className='text-center m-0 text-black font-[600] text-[1.5rem]'>
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>
        <input className='text-black p-2 border-1 border-solid border-[#ccc] rounded-[0.375rem] size-4 w-full h-10'
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input className='text-black p-2 border-1 border-solid border-[#ccc] rounded-[0.375rem] size-4 w-full h-10'
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className='cursor-pointer mt-1 bg-purple-500 text-white border-none rounded-[0.375rem] p-3 font-[600] text-[1rem]'
          onClick={() => onAuth(mode, email, password)}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
        <button className='cursor-pointer bg-transparent text-[#1976d2] border-none p-0 text-[0.95rem] underline'
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'No account? Sign up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}