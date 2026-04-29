import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { MapPin, Trophy, GraduationCap, Heart, Share2, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AthleteDetail() {
  const { id } = useParams();
  const [athlete, setAthlete] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);
  const [amount, setAmount] = useState(500);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchAthlete() {
      if (id) {
        const docRef = doc(db, 'athletes', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAthlete(docSnap.data());
        }
        setLoading(false);
      }
    }
    fetchAthlete();
  }, [id]);

  const handleDonate = async () => {
    if (!user) {
      alert('Please sign in to donate.');
      return;
    }
    if (!athlete || !id) return;
    
    setDonating(true);
    try {
      // 1. Create donation record
      await addDoc(collection(db, 'athletes', id, 'donations'), {
        donorId: user.uid,
        donorName: user.displayName,
        amount: Number(amount),
        athleteId: id,
        timestamp: serverTimestamp()
      });

      // 2. Update athlete raised amount
      await updateDoc(doc(db, 'athletes', id), {
        raised: increment(Number(amount)),
        updatedAt: serverTimestamp()
      });

      alert(`Success! You've backed ${athlete.name} with ₹${amount}.`);
      // Refresh local state
      setAthlete({ ...athlete, raised: athlete.raised + Number(amount) });
    } catch (error) {
      console.error(error);
      alert('Payment simulation failed.');
    } finally {
      setDonating(false);
    }
  };

  if (loading) return <div className="pt-32 text-center font-bold">Loading athlete profile...</div>;
  if (!athlete) return <div className="pt-32 text-center font-bold">Athlete not found.</div>;

  const progress = Math.min((athlete.raised / athlete.goal) * 100, 100);

  return (
    <div className="pt-24 pb-20 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden bg-slate-100 shadow-2xl mb-8 relative">
            <img 
               src={athlete.image} 
               alt={athlete.name} 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 flex gap-3">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest text-slate-900 shadow-xl border border-white/20">
                {athlete.sport}
              </span>
              <span className="px-4 py-2 bg-orange-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">
                Verified Student
              </span>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
              <Trophy className="text-orange-600" size={24} /> Achievements
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {athlete.achievements?.map((ach: string, i: number) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-[2rem] border border-slate-100 font-bold text-slate-700">
                  <CheckCircle2 className="text-orange-500 shrink-0" size={20} />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           className="space-y-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-400 font-bold tracking-widest text-xs uppercase">
               <MapPin size={14} /> {athlete.location}
            </div>
            <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-[0.9]">
              {athlete.name}
            </h1>
            <div className="flex items-center gap-3 text-lg font-bold text-slate-500">
              <GraduationCap className="text-slate-400" size={24} />
              {athlete.school}
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Raised so far</p>
                <p className="text-4xl font-black font-mono text-slate-900">₹{athlete.raised.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Target Goal</p>
                <p className="text-xl font-black font-mono text-slate-400">₹{athlete.goal.toLocaleString()}</p>
              </div>
            </div>

            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden mb-8">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.4)]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[500, 1000, 5000].map(val => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={cn(
                    "py-4 rounded-2xl font-black font-mono transition-all border-2",
                    amount === val ? "bg-slate-900 text-white border-slate-900 scale-105" : "bg-white text-slate-600 border-slate-100 hover:border-slate-300"
                  )}
                >
                  ₹{val}
                </button>
              ))}
            </div>

            <button 
               onClick={handleDonate}
               disabled={donating}
               className="w-full py-6 bg-orange-600 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-orange-700 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-xl shadow-orange-600/20"
            >
              <Heart size={24} fill="currentColor" />
              {donating ? 'Processing...' : 'BACK THIS ATHLETE'}
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight">The Story</h3>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-sans whitespace-pre-wrap">
              {athlete.bio}
            </div>
          </div>

          <div className="flex gap-4 border-t border-slate-100 pt-8 mt-12">
            <button className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-slate-100 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              <Share2 size={20} />
              <span>Share Story</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
