import { useEffect, useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { supabase } from '../../lib/supabase';
import './TricentricIntegration.css';

interface Props {
  kofiUrl: string; // URL of your digital product on Kofi
}

export default function TricentricIntegration({ kofiUrl }: Props) {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id);
    });
  }, []);

  const { refreshProfile } = useProfile(userId);

  const [breathingPhase, setBreathingPhase] = useState<'inhale'|'hold'|'exhale'>('inhale');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Clear intervals
  useEffect(() => {
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [intervalId]);

  const toggleBreathing = () => {
    const circle = document.querySelector('.breathing-circle') as HTMLElement;
    if (!intervalId) {
      const id = setInterval(() => {
        setBreathingPhase(prev => {
          if (prev === 'inhale') {
            if (circle) circle.style.transform = 'scale(1.2)';
            return 'hold';
          } else if (prev === 'hold') {
            return 'exhale';
          } else {
            if (circle) circle.style.transform = 'scale(1)';
            return 'inhale';
          }
        });
      }, 4000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const finalizePractice = async () => {
    if (!userId) {
      alert("Please log in to save your progress.");
      return;
    }

    setLoading(true);
    try {
      // In a real production scenario, we'd wait for a webhook from Kofi.
      // For now, we simulate the 'unlock' and award XP for the practice.

      const { error: profileError } = await supabase.rpc('increment_xp', {
        amount: 50,
        u_id: userId
      });

      if (profileError) throw profileError;

      // Unlock 'Tricentric Earthquake' Achievement
      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('title', 'Tricentric Earthquake')
        .single();

      if (achievement) {
        await supabase.from('user_achievements').upsert({
          user_id: userId,
          achievement_id: achievement.id
        });
      }

      await refreshProfile();

      alert("Practice finalized and progress saved! Redirecting to Kofi for the digital version.");
      window.open(kofiUrl, '_blank');
    } catch (err) {
      console.error(err);
      alert("Error saving progress. But the reality is still there.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tricentric-integration p-6 max-w-6xl mx-auto bg-gray-900 rounded-2xl border border-purple-900 my-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-white bg-gradient-to-r from-blue-400 via-red-400 to-green-400 bg-clip-text text-transparent">🎯 Tricentric Integration</h2>

      <p className="text-center text-gray-400 mb-8 italic">
        "Wisdom is not about suppressing voices, but about directing the internal choir."
      </p>

      {/* Head, Heart, Body */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { name: 'HEAD', color: 'blue', icon: '🧠', desc: 'Thought • Logic • Analysis' },
          { name: 'HEART', color: 'red', icon: '💖', desc: 'Emotion • Intuition • Values' },
          { name: 'BODY', color: 'green', icon: '🦶', desc: 'Sensation • Instinct • Somatic Wisdom' }
        ].map((center) => (
          <div key={center.name} className={`centro-card ${center.name.toLowerCase()}-card rounded-2xl p-6 border-2 border-transparent hover:border-${center.color}-500 transition-all`}>
            <div className="text-center mb-4">
              <div className="text-5xl mb-2">{center.icon}</div>
              <h3 className={`font-bold text-xl text-${center.color}-400`}>{center.name}</h3>
              <p className="text-xs text-gray-500 uppercase">{center.desc}</p>
            </div>
            <textarea
              className={`w-full h-32 p-3 rounded-lg bg-black bg-opacity-40 text-white border border-${center.color}-900 focus:border-${center.color}-500 outline-none resize-none`}
              placeholder={`What does your ${center.name.toLowerCase()} think / feel / sense?...`}
            />
          </div>
        ))}
      </div>

      {/* Breathing / interactive practice */}
      <div className="bg-gray-800 rounded-2xl p-8 mb-8 text-center border border-gray-700">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">🌬️ Conscious Breathing Practice</h3>
        <div className="breathing-circle w-32 h-32 bg-gradient-to-br from-blue-400 to-green-400 rounded-full mx-auto mb-6 flex items-center justify-center transition-transform duration-[4000ms] ease-in-out">
          <span className="text-4xl">🌊</span>
        </div>
        <div className="mb-6 text-gray-300">
            {breathingPhase === 'inhale' && "Inhale deeply (4s)"}
            {breathingPhase === 'hold' && "Hold breath (4s)"}
            {breathingPhase === 'exhale' && "Exhale slowly (4s)"}
        </div>
        <button
          onClick={toggleBreathing}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-all mb-4"
        >
          {intervalId ? 'Stop Practice' : 'Start Practice'}
        </button>
      </div>

      {/* Synthesis & Kofi Link */}
      <div className="bg-gradient-to-r from-blue-900 via-red-900 to-green-900 rounded-2xl p-8 text-center border border-yellow-600">
        <h3 className="text-2xl font-bold mb-4 text-white">🔄 Integrative Synthesis</h3>
        <textarea
            className="w-full h-24 bg-black bg-opacity-50 border border-yellow-500 rounded-lg p-4 text-white focus:outline-none mb-6 resize-none"
            placeholder="Integrate the three voices here..."
        />
        <button
          onClick={finalizePractice}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'SAVING...' : 'CLAIM DIGITAL VERSION ON KOFI'}
        </button>
      </div>
    </div>
  );
}
