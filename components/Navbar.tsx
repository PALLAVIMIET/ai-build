import { motion } from 'framer-motion';
import { Search, User, LogIn, Menu, X, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'Mission', path: '/mission' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
      isScrolled ? "py-4 bg-white/80 backdrop-blur-md shadow-sm" : "py-6 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black group-hover:bg-orange-600 transition-colors">
            AF
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-orange-600 transition-colors">ATHLETEFUND</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-bold uppercase tracking-widest hover:text-orange-600 transition-colors",
                location.pathname === link.path ? "text-orange-600 border-b-2 border-orange-600" : "text-slate-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/explore" className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
            <Search size={22} />
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link 
                to={profile?.role === 'athlete' ? '/profile' : '/dashboard'} 
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all text-sm"
              >
                <User size={18} />
                <span>Account</span>
              </Link>
              <button 
                onClick={logout}
                className="p-2.5 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600 transition-all text-sm">
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl p-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-lg font-bold text-slate-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-[1px] bg-slate-100" />
          {user ? (
            <div className="flex flex-col gap-4">
              <Link
                to={profile?.role === 'athlete' ? '/profile' : '/dashboard'}
                className="flex items-center justify-center gap-2 px-5 py-4 bg-slate-100 text-slate-900 rounded-xl font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} />
                <span>My Account</span>
              </Link>
              <button
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 px-5 py-4 text-red-500 font-bold"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center justify-center gap-2 px-5 py-4 bg-slate-900 text-white rounded-xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LogIn size={20} />
              <span>Sign In</span>
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}
