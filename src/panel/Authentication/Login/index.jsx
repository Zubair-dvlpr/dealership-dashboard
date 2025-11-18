import React, { useState } from 'react';
import { useAuthStore } from '../../../store/features/auth/useAuthStore';
import { Button } from '../../../components/shared';

export const Login = () => {
  const loading = useAuthStore(state => state?.loading);
  const loginFn = useAuthStore(state => state?.login);
  // STATES
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = e => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      loginFn(loginData);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black'>
      <div className='bg-panel/50 p-8 rounded-2xl shadow-2xl w-96 border border-ink'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold  mb-2'>Welcome Back</h1>
          <p className='text-gray-600'>Sign in to your dashboard</p>
        </div>

        <form className='space-y-6' onSubmit={handleLogin}>
          <div>
            <label className='block text-sm font-medium mb-2'>Email</label>
            <input
              type='email'
              value={loginData.email}
              onChange={e => setLoginData({ ...loginData, email: e.target.value })}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all'
              placeholder='Enter your email'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium  mb-2'>Password</label>
            <input
              type='password'
              value={loginData.password}
              onChange={e => setLoginData({ ...loginData, password: e.target.value })}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all'
              placeholder='Enter your password'
              required
            />
          </div>

          <Button loading={loading} disabled={loading} onClick={handleLogin}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};
