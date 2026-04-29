import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Heart, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      if (user) {
        // This query requires a composite index if we use multiple conditions + order
        // For simplicity, we'll fetch then filter or use simple query
        const q = query(
          collection(db, 'donations'), 
          where('donorId', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => doc.data());
        setDonations(list);
        setLoading(false);
      }
    }
    fetchDonations();
  }, [user]);

  if (loading) return <div className="pt-32 text-center font-bold">Loading dashboard...</div>;

  const totalGiven = donations.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="pt-24 pb-20 px-6 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em] mb-2">Backer Dashboard</h2>
            <h1 className="text-4xl font-black tracking-tight uppercase">WELCOME BACK, {profile?.displayName?.split(' ')[0]}</h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Heart size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Impact Score</p>
                <p className="text-xl font-black font-mono">₹{totalGiven.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="text-orange-600" size={20} /> RECENT CONTRIBUTIONS
              </h3>
              
              {donations.length > 0 ? (
                <div className="space-y-4">
                  {donations.map((donation, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-xl overflow-hidden">
                          {/* Profile small image could go here */}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Contribution to Student</p>
                          <p className="text-xs text-slate-500 font-medium">Ref: {donation.athleteId.substring(0, 8)}...</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black font-mono text-orange-600">₹{donation.amount}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Success</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400 font-bold mb-4">You haven't backed any athletes yet.</p>
                  <Link to="/explore" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-orange-600">
                    Explore Athletes <ArrowRight size={18} />
                  </Link>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 blur-3xl" />
              <TrendingUp className="text-orange-500 mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-4 tracking-tighter">WHY YOUR SUPPORT MATTERS</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                Student athletes in India often have to choose between their education and their dreams because of financial constraints. Your micro-donations bridge that gap.
              </p>
              <Link to="/mission" className="font-bold text-orange-500 hover:text-orange-400 text-sm">
                Learn more about our mission →
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
