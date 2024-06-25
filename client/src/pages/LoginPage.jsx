import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('Wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="min-h-80 flex items-center justify-center bg-zinc-950">
      <form className=" bg-zinc-950 rounded-lg shadow-md w-full max-w-sm" onSubmit={login}>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-300">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
          className="w-full p-2 mb-4 border border-gray-800 bg-zinc-900"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          className="w-full p-2 mb-4 border border-gray-800 bg-zinc-900"
        />
        <button
          type="submit"
          className="w-full p-2 bg-cyan-900 hover:bg-cyan-950 text-white font-bold rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
