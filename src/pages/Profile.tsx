import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { generateAthleteStory } from '../services/geminiService';
import { Sparkles, Save, Trophy, MapPin, School, Target } from 'lucide-react';

export default function Profile() {
  const { profile, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    school: '',
    location: '',
    image: '',
    bio: '',
    achievements: '',
    goal: 0,
    background: '' // Used for AI story generation
  });

  useEffect(() => {
    async function loadAthleteData() {
      if (user) {
        const docRef = doc(db, 'athletes', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...formData,
            ...data,
            achievements: data.achievements?.join('\n') || ''
          });
        } else if (profile) {
          setFormData(prev => ({
            ...prev,
            name: profile.displayName,
          }));
        }
        setLoading(false);
      }
    }
    loadAthleteData();
  }, [user, profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    
    try {
      await setDoc(doc(db, 'athletes', user.uid), {
        ...formData,
        athleteId: user.uid,
        achievements: formData.achievements.split('\n').filter(a => a.trim()),
        goal: Number(formData.goal),
        raised: formData.goal > 0 ? 0 : 0, // In real app, we'd preserve existing raised
        status: 'active',
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(), // In real app, only on create
      }, { merge: true });
      alert('Campaign saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving campaign.');
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateStory = async () => {
    if (!formData.name || !formData.sport || !formData.background) {
      alert('Please fill in Name, Sport, and Background info first.');
      return;
    }
    setGenerating(true);
    try {
      const story = await generateAthleteStory({
        name: formData.name,
        sport: formData.sport,
        achievements: formData.achievements.split('\n'),
        goal: `₹${formData.goal} for my training and education`,
        background: formData.background
      });
      setFormData(prev => ({ ...prev, bio: story }));
    } catch (error) {
      alert('AI Story generation failed. Please try manual writing.');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="pt-32 text-center font-bold">Loading your profile...</div>;

  return (
    <div className="pt-24 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Your Athlete Campaign</h1>
          <p className="text-slate-500">Manifest your dream and share it with the world.</p>
        </header>

        <form onSubmit={handleSave} className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <School className="text-orange-600" size={20} /> BASIC INFO
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">Full Name</label>
                  <input 
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 font-bold"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">Main Sport</label>
                  <input 
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 font-bold"
                    value={formData.sport}
                    onChange={e => setFormData({...formData, sport: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">School / Academy</label>
                  <input 
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 font-bold"
                    value={formData.school}
                    onChange={e => setFormData({...formData, school: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">Location (City, State)</label>
                  <input 
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 font-bold"
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Trophy className="text-orange-600" size={20} /> ACHIEVEMENTS
                </h3>
              </div>
              <textarea 
                className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 min-h-[120px] font-medium"
                placeholder="List your sports achievements (one per line)..."
                value={formData.achievements}
                onChange={e => setFormData({...formData, achievements: e.target.value})}
              />
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Target className="text-orange-600" size={20} /> YOUR STORY
                </h3>
                <button
                  type="button"
                  onClick={handleGenerateStory}
                  disabled={generating}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-all disabled:opacity-50"
                >
                  <Sparkles size={16} />
                  {generating ? 'Generating...' : 'AI Generate Story'}
                </button>
              </div>
              
              <div className="mb-4 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">Your Background (Input for AI storyteller)</label>
                <textarea 
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 min-h-[100px] text-sm"
                  placeholder="Tell me about your family, your journey, and why you need these funds..."
                  value={formData.background}
                  onChange={e => setFormData({...formData, background: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">The Campaign Story (Public)</label>
                <textarea 
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 min-h-[200px] leading-relaxed"
                  placeholder="This is what potential donors will read. You can write it yourself or use the AI generator."
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-tighter">Funding Goal</h3>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">Amount Needed (₹)</label>
                <input 
                  type="number"
                  className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 font-black text-2xl font-mono"
                  value={formData.goal}
                  onChange={e => setFormData({...formData, goal: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Photo</h3>
              <div className="aspect-square bg-slate-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-200">
                {formData.image ? (
                  <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center p-4">
                    <p className="text-xs font-bold text-slate-400">Profile Image URL</p>
                  </div>
                )}
              </div>
              <input 
                placeholder="Paste Unsplash URL..."
                className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-xs font-medium"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={saving}
              className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-bold text-xl flex items-center justify-center gap-3 hover:bg-orange-600 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-xl"
            >
              <Save size={24} />
              {saving ? 'Saving...' : 'PUBLISH CAMPAIGN'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
