import { motion } from 'framer-motion';
import { MapPin, Trophy, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface AthleteCardProps {
  id: string;
  name: string;
  sport: string;
  school: string;
  location: string;
  image: string;
  raised: number;
  goal: number;
  achievements: string[];
}

export default function AthleteCard({
  id,
  name,
  sport,
  school,
  location,
  image,
  raised,
  goal,
  achievements
}: AthleteCardProps) {
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900 border border-slate-200">
            {sport}
          </span>
          <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
            Student
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900">{name}</h3>
          <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
            <MapPin size={12} />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <GraduationCap size={16} className="text-slate-400" />
          <span className="line-clamp-1">{school}</span>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Trophy size={14} className="text-orange-500" />
            <span className="line-clamp-1">{achievements[0]}</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Raised</p>
              <p className="text-lg font-black font-mono text-slate-900">₹{raised.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Goal</p>
              <p className="text-sm font-bold text-slate-600">₹{goal.toLocaleString()}</p>
            </div>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={cn(
                "h-full rounded-full",
                progress > 80 ? "bg-green-500" : progress > 40 ? "bg-orange-500" : "bg-blue-500"
              )}
            />
          </div>
        </div>

        <Link
          to={`/athlete/${id}`}
          className="block w-full py-3 bg-slate-900 text-white text-center rounded-xl font-bold hover:bg-orange-600 transition-colors"
        >
          View Story & Back
        </Link>
      </div>
    </motion.div>
  );
}
