import React, { useState } from 'react';

interface DirectorLoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

// Director credentials
const DIRECTOR_EMAIL = 'destan34tun@gmail.com';
const DIRECTOR_PASSWORD = 'Destan96';

const DirectorLoginModal: React.FC<DirectorLoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === DIRECTOR_EMAIL && password === DIRECTOR_PASSWORD) {
      onLoginSuccess();
    } else {
      setError('Incorrect email or password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-sm border border-purple-500/30">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-purple-300">Director's Entrance</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-light transition-all duration-200 ease-in-out hover:scale-125">&times;</button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="p-6 space-y-4">
            <p className="text-gray-400">Enter your credentials to access Director Mode.</p>
            <div>
              <label htmlFor="director-email" className="sr-only">Email</label>
              <input
                id="director-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Email"
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="director-password" className="sr-only">Password</label>
              <input
                id="director-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="p-4 border-t border-gray-700">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition-all duration-200 ease-in-out hover:scale-105 active:scale-100 disabled:hover:scale-100 disabled:bg-gray-600"
              disabled={!email || !password}
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DirectorLoginModal;