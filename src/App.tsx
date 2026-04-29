import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AthleteDetail from './pages/AthleteDetail';
import { useAuth } from './hooks/useAuth';

// Simple placeholder components for other pages
function UnderConstruction({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tight">{title}</h1>
        <p className="text-slate-500 max-w-md mx-auto">This page is currently being optimized for the best student-athlete experience. Check back soon!</p>
      </div>
    </div>
  );
}

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/athlete/:id" element={<AthleteDetail />} />
            <Route path="/how-it-works" element={<UnderConstruction title="Process" />} />
            <Route path="/mission" element={<UnderConstruction title="Our Mission" />} />
            {/* Catch all */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        <footer className="bg-slate-900 py-20 px-6 mt-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-slate-400">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
                  AF
                </div>
                <span className="text-xl font-black tracking-tighter text-white">ATHLETEFUND</span>
              </div>
              <p className="max-w-sm mb-8 leading-relaxed">
                Empowering the next generation of Indian student-athletes through transparent, direct, and efficient micro-funding.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Platform</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/explore" className="hover:text-orange-500 transition-colors">Explore Athletes</Link></li>
                <li><Link to="/how-it-works" className="hover:text-orange-500 transition-colors">How it Works</Link></li>
                <li><Link to="/mission" className="hover:text-orange-500 transition-colors">Our Mission</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Legal & Support</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 text-center text-xs font-medium tracking-widest text-slate-600 uppercase">
            © 2024 ATHLETEFUND India. Developed for Student Excellence.
          </div>
        </footer>
      </div>
    </Router>
  );
}
