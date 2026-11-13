import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import { Sparkles, Lock, User, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('AdminPass123!');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login({ username, password });
      login(response.token, response.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/30 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-heritage-terracotta text-heritage-ivory flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-heritage-indigo">Researcher Sign In</h1>
          <p className="text-xs text-heritage-slate/60">Access HeritageAI Digital Preservation Platform</p>
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
            <div className="relative">
              <User className="w-4 h-4 text-heritage-slate/40 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-ivory"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-heritage-indigo mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-heritage-slate/40 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-heritage-gold/30 bg-heritage-ivory"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-heritage-terracotta hover:bg-heritage-gold text-heritage-ivory font-semibold shadow-md transition-colors text-sm"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-xs text-heritage-slate/60 border-t border-heritage-gold/20 pt-4">
          Default Admin: <strong className="text-heritage-indigo">admin</strong> / <strong className="text-heritage-indigo">AdminPass123!</strong>
        </div>

      </div>
    </div>
  );
};
