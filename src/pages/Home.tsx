import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import AthleteCard from '../components/AthleteCard';
import { ArrowRight, Star, Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURED_ATHLETES = [
  {
    id: '1',
    name: 'Aryan Sharma',
    sport: 'Athletics',
    school: 'Model Senior Secondary School, Haryana',
    location: 'Rohtak, HR',
    image: 'https://images.unsplash.com/photo-1594833246320-1b250550f249?auto=format&fit=crop&q=80&w=800',
    raised: 24500,
    goal: 35000,
    achievements: ['State Gold - 400m', 'Inter-School Sports Meet 2024 Champion']
  },
  {
    id: '2',
    name: 'Anjali Kumari',
    sport: 'Boxing',
    school: 'Govt. Girls High School, Punjab',
    location: 'Patiala, PB',
    image: 'https://images.unsplash.com/photo-1549476464-37392f71752a?auto=format&fit=crop&q=80&w=800',
    raised: 12000,
    goal: 50000,
    achievements: ['Regional Bronze - Flyweight', 'Youth Nationals Qualifier']
  },
  {
    id: '3',
    name: 'Rohit Jaiswal',
    sport: 'Cricket',
    school: 'City Public School, UP',
    location: 'Lucknow, UP',
    image: 'https://images.unsplash.com/photo-1531415074941-03f6ad8899ac?auto=format&fit=crop&q=80&w=800',
    raised: 8500,
    goal: 25000,
    achievements: ['U-16 Division Captain', 'Best Bowler - District Trophy']
  }
];

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />

      {/* Trust Section */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-orange-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Verified Students</h4>
              <p className="text-sm text-slate-500">Manual verification of school IDs and sports certificates.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600">
              <Heart size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">100% Direct Impact</h4>
              <p className="text-sm text-slate-500">Funds go directly to the athlete for specific approved needs.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-purple-600">
              <Star size={24} />
              </div>
            <div>
              <h4 className="font-bold text-slate-900">Education First</h4>
              <p className="text-sm text-slate-500">Supporting athletes who maintain standard academic records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Athletes */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">FEATURED STUDENT ATHLETES</h2>
            <p className="text-slate-500 max-w-md">Meet the next generation of Indian sports stars who need your support to reach the next level.</p>
          </div>
          <Link to="/explore" className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all">
            View All Athletes <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_ATHLETES.map((athlete, index) => (
            <motion.div
              key={athlete.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AthleteCard {...athlete} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/explore" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">
            View All Athletes <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600/10 blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-none">
              EVERY RUPEE COUNTS TOWARDS A <span className="text-orange-500">CHAMPION'S</span> DREAM.
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-sans">
              Your small contribution can help a student-athlete from a rural village afford their first pair of professional running shoes or travel to a state-level championship.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/explore" className="px-8 py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all">
                Find Someone to Back
              </Link>
              <Link to="/auth" className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20">
                Join our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
