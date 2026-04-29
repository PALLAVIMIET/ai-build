import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import AthleteCard from '../components/AthleteCard';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

import { cn } from '../lib/utils';

const SPORTS = ['All', 'Athletics', 'Boxing', 'Cricket', 'Wrestling', 'Hockey', 'Kabaddi'];

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [athletes, setAthletes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const athletesRef = collection(db, 'athletes');
    const q = query(athletesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const athleteList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAthletes(athleteList);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredStudents = athletes.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.sport?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === 'All' || student.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tight">EXPLORE ATHLETES</h1>
          <p className="text-slate-500 max-w-xl">Search by name, sport, or school to find a student-athlete you'd like to support.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-grow leading-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search by name, sport, or school..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
            {SPORTS.map(sport => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={cn(
                  "px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all border",
                  selectedSport === sport 
                    ? "bg-slate-900 text-white border-slate-900" 
                    : "bg-white text-slate-600 border-slate-100 hover:border-slate-300"
                )}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredStudents.map((athlete) => (
              <motion.div
                layout
                key={athlete.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <AthleteCard {...athlete} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold mb-2">No student-athletes found matching your criteria.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedSport('All');}}
              className="text-orange-600 font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
