import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/lib/supabase';

interface Props {
  kofiUrl: string;
}

const CENTERS = [
  {
    id: 'head',
    name: 'HEAD',
    icon: '🧠',
    desc: 'Thought • Logic • Analysis',
    cardClasses: 'hover:border-blue-500 focus-within:border-blue-500',
    titleClasses: 'text-blue-400',
    textareaClasses: 'border-blue-900 focus:border-blue-500',
  },
  {
    id: 'heart',
    name: 'HEART',
    icon: '💖',
    desc: 'Emotion • Intuition • Values',
    cardClasses: 'hover:border-red-500 focus-within:border-red-500',
    titleClasses: 'text-red-400',
    textareaClasses: 'border-red-900 focus:border-red-500',
  },
  {
    id: 'body',
    name: 'BODY',
    icon: '🦶',
    desc: 'Sensation • Instinct • Somatic Wisdom',
    cardClasses: 'hover:border-green-500 focus-within:border-green-500',
    titleClasses: 'text-green-400',
    textareaClasses: 'border-green-900 focus:border-green-500',
  },
] as const;

export default function TricentricIntegration({ kofiUrl }: Props) {
  const [userId, setUserId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id);
    });
  }, []);

  const { refreshProfile } = useProfile(userId);

  useEffect(
    () => () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    },
    [intervalId],
  );

  const toggleBreathing = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setBreathingPhase((prev) => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 2000);
      setIntervalId(id);
      return;
    }

    clearInterval(intervalId);
    setIntervalId(null);
    setBreathingPhase('inhale');
  };

  const finalizePractice = async () => {
    if (!userId) {
      setFeedback({ message: 'Please log in to save your progress.', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const { error: profileError } = await supabase.rpc('increment_xp', {
        amount: 50,
        u_id: userId,
      });

      if (profileError) {
        throw profileError;
      }

      const { data: achievement } = await supabase
        .from('achievements')
        .select('id')
        .eq('title', 'Tricentric Earthquake')
        .single();

      if (achievement) {
        await supabase.from('user_achievements').upsert({
          user_id: userId,
          achievement_id: achievement.id,
        });
      }

      await refreshProfile();

      setFeedback({
        message: 'Practice finalized and progress saved! Redirecting to Ko-fi...',
        type: 'success',
      });
      setTimeout(() => window.open(kofiUrl, '_blank'), 1500);
    } catch (err) {
      console.error(err);
      setFeedback({ message: 'Error saving progress. But the reality is still there.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tricentric-integration p-6 max-w-6xl mx-auto bg-gray-900 rounded-2xl border border-purple-900 my-12 relative">
      {feedback && (
        <div
          role="status"
          className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl border animate-in fade-in slide-in-from-top-4 duration-300 ${
            feedback.type === 'success' ? 'bg-green-600 border-green-400 text-white' : 'bg-red-600 border-red-400 text-white'
          }`}
        >
          <div className="flex items-center gap-3 font-bold">
            <span>{feedback.type === 'success' ? '✅' : '⚠️'}</span>
            {feedback.message}
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center mb-6 text-white bg-gradient-to-r from-blue-400 via-red-400 to-green-400 bg-clip-text text-transparent">
        <span aria-hidden="true">🎯</span> Tricentric Integration
      </h2>

      <p className="text-center text-gray-400 mb-8 italic">
        "Wisdom is not about suppressing voices, but about directing the internal choir."
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {CENTERS.map((center) => (
          <div
            key={center.name}
            className={`centro-card rounded-2xl p-6 border-2 border-transparent transition-all ${center.cardClasses}`}
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-2" role="img" aria-label={`${center.name} icon`}>{center.icon}</div>
              <h3 id={`title-${center.id}`} className={`font-bold text-xl ${center.titleClasses}`}>{center.name}</h3>
              <p className="text-xs text-gray-500 uppercase">{center.desc}</p>
            </div>
            <textarea
              aria-labelledby={`title-${center.id}`}
              className={`w-full h-32 p-3 rounded-lg bg-black bg-opacity-40 text-white border outline-none resize-none ${center.textareaClasses}`}
              placeholder={`What does your ${center.name.toLowerCase()} think / feel / sense?...`}
            />
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 mb-8 text-center border border-gray-700">
        <h3 className="text-xl font-bold text-yellow-400 mb-4"><span aria-hidden="true">🌬️</span> Conscious Breathing Practice</h3>
        <div
          role="img"
          aria-label={`Breathing exercise: currently ${breathingPhase}`}
          className={`breathing-circle w-32 h-32 bg-gradient-to-br from-blue-400 to-green-400 rounded-full mx-auto mb-6 flex items-center justify-center transition-transform duration-[2000ms] ease-in-out ${
            breathingPhase === 'inhale' ? 'scale-100' : breathingPhase === 'hold' ? 'scale-125' : 'scale-110'
          }`}
        >
          <span className="text-4xl" aria-hidden="true">🌊</span>
        </div>
        <div className="mb-6 text-gray-300" role="status" aria-live="polite">
          {breathingPhase === 'inhale' && 'Inhale deeply (2s)'}
          {breathingPhase === 'hold' && 'Hold breath (2s)'}
          {breathingPhase === 'exhale' && 'Exhale slowly (2s)'}
        </div>
        <button
          onClick={toggleBreathing}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-all mb-4"
        >
          {intervalId ? 'Stop Practice' : 'Start Practice'}
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-900 via-red-900 to-green-900 rounded-2xl p-8 text-center border border-yellow-600">
        <h3 id="synthesis-title" className="text-2xl font-bold mb-4 text-white">
          <span aria-hidden="true">🔄</span> Integrative Synthesis
        </h3>
        <textarea
          aria-labelledby="synthesis-title"
          className="w-full h-24 bg-black bg-opacity-50 border border-yellow-500 rounded-lg p-4 text-white focus:outline-none mb-6 resize-none"
          placeholder="Integrate the three voices here..."
        />
        <button
          onClick={finalizePractice}
          disabled={loading}
          aria-label="Claim digital version on Ko-fi (opens in new tab)"
          className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'SAVING...' : 'CLAIM DIGITAL VERSION ON KOFI'}
        </button>
      </div>
    </div>
  );
}
