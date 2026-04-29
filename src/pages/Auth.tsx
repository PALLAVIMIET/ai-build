import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogIn, GraduationCap, Heart, CheckCircle2 } from 'lucide-react';

export default function Auth() {
  const { user, profile, signInWithGoogle, createProfile, loading } = useAuth();
  const [roleSelection, setRoleSelection] = useState<'athlete' | 'donor' | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      alert('Failed to sign in. Please try again.');
    }
  };

  const handleRoleSelection = async (role: 'athlete' | 'donor') => {
    await createProfile(role);
    navigate(role === 'athlete' ? '/profile' : '/explore');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If signed in but no profile yet
  if (user && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100"
        >
          <h2 className="text-3xl font-black mb-2 tracking-tight text-center">WELCOME!</h2>
          <p className="text-slate-500 text-center mb-10">How would you like to join the AthleteFund community today?</p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelection('athlete')}
              className="w-full p-6 bg-white border-2 border-slate-100 hover:border-orange-600 rounded-2xl transition-all group text-left flex items-start gap-4"
            >
              <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">I am a Student Athlete</h4>
                <p className="text-sm text-slate-500">I want to create a campaign and raise funds for my sports career.</p>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelection('donor')}
              className="w-full p-6 bg-white border-2 border-slate-100 hover:border-blue-600 rounded-2xl transition-all group text-left flex items-start gap-4"
            >
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Heart size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">I am a Backer / Donor</h4>
                <p className="text-sm text-slate-500">I want to support promising student athletes with micro-donations.</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // If signed in and has profile, redirect
  if (user && profile) {
    navigate(profile.role === 'athlete' ? '/profile' : '/explore');
    return null;
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
        <img 
          src="https://images.unsplash.com/photo-1594833246320-1b250550f249?auto=format&fit=crop&q=80&w=1200" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
          alt="Athlete"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-20 left-20 right-20 text-white">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500 mb-4">Empowering Excellence</p>
          <h1 className="text-6xl font-black mb-8 leading-[0.9] tracking-tighter">THE FUTURE OF <br />INDIAN SPORTS <br />STARTS HERE.</h1>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" size={20} />
              <span className="font-medium">Direct funding for student-athletes</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" size={20} />
              <span className="font-medium">Manual verification for high trust</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500" size={20} />
              <span className="font-medium">AI-powered storytelling tools</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-white">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          <div className="mb-12">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-6">
              AF
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tight">JOIN THE CLUB.</h2>
            <p className="text-slate-500 leading-relaxed font-sans">
              Sign in with your Google account to start supporting student athletes or to begin your own funding journey.
            </p>
          </div>

          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white border-2 border-slate-100 rounded-2xl font-bold hover:border-slate-900 transition-all group"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            <span>Continue with Google</span>
          </button>

          <p className="mt-8 text-xs text-slate-400 text-center font-medium leading-relaxed uppercase tracking-widest">
            By continuing, you agree to AthleteFund's <br /> Terms of Excellence & Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
