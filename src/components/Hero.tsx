import { motion } from 'framer-motion';
import { ArrowRight, Trophy, GraduationCap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 px-6">
      {/* Background Marquee Text */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] select-none flex flex-col justify-center">
        <h1 className="text-[20vw] font-black leading-none font-sans">CHAMPION</h1>
        <h1 className="text-[20vw] font-black leading-none font-sans self-end">STUDENT</h1>
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-30"
        >
          <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full w-fit mb-6 text-sm font-medium">
            <GraduationCap size={16} />
            <span>Empowering Student Excellence</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 text-slate-900">
            FUELING THE <br />
            <span className="text-orange-600">STUDENT</span> <br />
            <span className="relative">
              CHAMPION
              <motion.span 
                className="absolute -bottom-2 left-0 h-2 bg-orange-600/30 w-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-lg mb-10 leading-relaxed font-sans">
            Directly support India's most promising student-athletes. 
            Help them balance education and sports with micro-funding for gear, training, and competition.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link 
              to="/explore"
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all group hover:scale-105 active:scale-95"
            >
              Support an Athlete <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/auth"
              className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-xl font-bold hover:border-slate-900 transition-all hover:scale-105 active:scale-95"
            >
              Register as Athlete
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold font-mono">150+</span>
              <span className="text-xs uppercase tracking-widest font-medium">Athletes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold font-mono">₹45L+</span>
              <span className="text-xs uppercase tracking-widest font-medium">Raised</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold font-mono">12+</span>
              <span className="text-xs uppercase tracking-widest font-medium">States</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:ml-12"
        >
          {/* Main Hero Image - Made smaller and contained */}
          <div className="relative z-20 w-full max-w-sm mx-auto aspect-[4/5] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700">
            <img 
              src="https://images.unsplash.com/photo-1594833246320-1b250550f249?auto=format&fit=crop&q=80&w=800" 
              alt="Young Indian Student Athlete"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-green-400">Live Campaign</span>
              </div>
              <h3 className="text-2xl font-bold">Aryan S. Sharma</h3>
              <p className="text-sm opacity-80 mb-4">State Level Athletics (U-17)</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span>₹24,500 raised</span>
                  <span>70%</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '70%' }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="h-full bg-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
          >
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Next Goal</p>
              <p className="text-sm font-bold">National Trials</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-4 -left-10 z-30 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 backdrop-blur-sm bg-white/90"
          >
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-lg font-black font-mono">₹4,200</p>
              <p className="text-[10px] uppercase font-bold text-slate-500">Avg. Micro-Donation</p>
            </div>
          </motion.div>

          {/* Decorative shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
