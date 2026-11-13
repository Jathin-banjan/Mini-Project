import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Compass, Sparkles, Database, BarChart3, ShieldCheck, User as UserIcon, LogOut, Info, Palette } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-heritage-indigo text-heritage-ivory sticky top-0 z-50 shadow-md border-b border-heritage-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <RouterLink to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-heritage-terracotta flex items-center justify-center text-heritage-ivory shadow-md group-hover:bg-heritage-gold transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold tracking-wide text-heritage-ivory group-hover:text-heritage-gold transition-colors">
                Heritage<span className="text-heritage-gold">AI</span>
              </div>
              <div className="text-xs text-heritage-ivory/70 tracking-wider uppercase font-medium">
                Cultural Pattern Intelligence
              </div>
            </div>
          </RouterLink>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            <RouterLink
              to="/"
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/') ? 'bg-heritage-gold/20 text-heritage-gold' : 'hover:bg-white/10 text-heritage-ivory/90'
              }`}
            >
              <Compass className="w-4 h-4" /> Home
            </RouterLink>

            <RouterLink
              to="/about"
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/about') ? 'bg-heritage-gold/20 text-heritage-gold' : 'hover:bg-white/10 text-heritage-ivory/90'
              }`}
            >
              <Info className="w-4 h-4" /> Research Paper
            </RouterLink>

            <RouterLink
              to="/categories"
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/categories') ? 'bg-heritage-gold/20 text-heritage-gold' : 'hover:bg-white/10 text-heritage-ivory/90'
              }`}
            >
              <Palette className="w-4 h-4" /> Art Categories
            </RouterLink>

            <RouterLink
              to="/analyzer"
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/analyzer') ? 'bg-heritage-gold/20 text-heritage-gold' : 'hover:bg-white/10 text-heritage-ivory/90'
              }`}
            >
              <Sparkles className="w-4 h-4 text-heritage-gold" /> AI Analyzer
            </RouterLink>

            <RouterLink
              to="/archive"
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/archive') ? 'bg-heritage-gold/20 text-heritage-gold' : 'hover:bg-white/10 text-heritage-ivory/90'
              }`}
            >
              <Database className="w-4 h-4" /> Digital Archive
            </RouterLink>

            <RouterLink
              to="/dashboard"
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/dashboard') ? 'bg-heritage-gold/20 text-heritage-gold' : 'hover:bg-white/10 text-heritage-ivory/90'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Dashboard
            </RouterLink>

            <RouterLink
              to="/evaluation"
              className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isActive('/evaluation') ? 'bg-heritage-gold/20 text-heritage-gold' : 'hover:bg-white/10 text-heritage-ivory/90'
              }`}
            >
              Evaluation Metrics
            </RouterLink>

            {isAdmin && (
              <RouterLink
                to="/admin"
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive('/admin') ? 'bg-heritage-gold/20 text-heritage-gold' : 'hover:bg-white/10 text-heritage-ivory/90'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Admin
              </RouterLink>
            )}
          </div>

          {/* User Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-semibold text-heritage-ivory">{user?.username}</span>
                  <span className="text-xs text-heritage-gold font-medium">{user?.institution || 'Researcher'}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2.5 rounded-lg bg-white/10 hover:bg-heritage-terracotta text-heritage-ivory transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <RouterLink
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-heritage-ivory hover:text-heritage-gold transition-colors"
                >
                  Sign In
                </RouterLink>
                <RouterLink
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-heritage-terracotta hover:bg-heritage-gold text-heritage-ivory transition-colors shadow-sm"
                >
                  Register
                </RouterLink>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};
