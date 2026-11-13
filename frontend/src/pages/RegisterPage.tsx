import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import { Sparkles, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.register({
        username,
        email,
        password,
        fullName,
        institution,
      });
      login(response.token, response.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/30 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-heritage-terracotta text-heritage-ivory flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-heritage-indigo">Researcher Registration</h1>
          <p className="text-xs text-heritage-slate/60">Create an account to contribute to cultural preservation</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-heritage-slate">
          <div>
            <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-ivory"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-ivory"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-ivory"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-ivory"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Institution / Museum</label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-ivory"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-heritage-terracotta hover:bg-heritage-gold text-heritage-ivory font-semibold shadow-md transition-colors text-sm"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

      </div>
    </div>
  );
};
