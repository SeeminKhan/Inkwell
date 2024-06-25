import React, { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      alert('Registration successful');
    } else {
      alert('Registration failed');
    }
  }

  return (
    <div className="min-h-80 flex items-center justify-center bg-zinc-950">
      <form className="bg-zinc-950 p-6 rounded-lg shadow-md w-full max-w-sm" onSubmit={register}>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-300 ">Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
          className="w-full p-2 mb-4 border border-gray-800 rounded-md bg-zinc-900 text-gray-300 "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          className="w-full p-2 mb-4 border border-gray-800 rounded-md bg-zinc-900 text-gray-300"
        />
        <button
          type="submit"
          className="w-full p-2 bg-cyan-900 hover:bg-cyan-950 text-white font-bold rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
