import React, { useState, useCallback } from 'react';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useEvaluation } from '@/hooks/useEvaluation';
import Modal from '@/components/ui/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import StatusFeedback, { FeedbackType } from '@/components/ui/StatusFeedback';
import type { CenterType } from '@/types';

interface ExamSectionProps {
  onEvaluationComplete?: () => void;
}

const OXYGEN_OPTIONS = [
  "5 minutes of conscious breathing (Body)",
  "Write 1 unfiltered raw truth (Heart)",
  "Do 1 real survival calculation (Head)"
];

const ExamSection: React.FC<ExamSectionProps> = ({ onEvaluationComplete }) => {
  const [bleeding, setBleeding] = useState<CenterType | ''>('');
  const [sacrifice, setSacrifice] = useState<CenterType | ''>('');
  const [oxygen, setOxygen] = useState<string[]>([]);
  const [synthesis, setSynthesis] = useState('');

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<{
    message: React.ReactNode;
    type: FeedbackType;
  } | null>(null);

  const closeFeedback = useCallback(() => setStatusFeedback(null), []);

  const { analyze, loading: analyzing } = useAnalysis();
  const { saveEvaluation, saving } = useEvaluation(onEvaluationComplete);

  const handleOxygenChange = (option: string) => {
    setOxygen(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleAcceptReality = async () => {
    if (!bleeding || !sacrifice) {
      setStatusFeedback({
        message: 'You must diagnose the wound and choose a sacrifice.',
        type: 'error'
      });
      return;
    }

    const analysis = await analyze({
      type: 'misery',
      bleeding,
      sacrifice,
      oxygen
    });

    setAiAnalysis(analysis);
    setIsModalOpen(true);
  };

  const handleAnalyzeSynthesis = async () => {
    if (!synthesis.trim()) {
      setStatusFeedback({
        message: 'Empty input. Share your truth to receive guidance.',
        type: 'error'
      });
      return;
    }

    const feedback = await analyze({
      type: 'synthesis',
      synthesis
    });

    setAiAnalysis(feedback);
    setIsModalOpen(true);
  };

  const handleSaveEvaluation = async () => {
    if (!bleeding || !sacrifice || !synthesis.trim()) {
      setStatusFeedback({
        message: 'Incomplete reality. Ensure diagnosis, sacrifice, and synthesis are set.',
        type: 'error'
      });
      return;
    }

    const result = await saveEvaluation({
      bleeding,
      sacrifice,
      oxygen,
      synthesis,
      aiAnalysis
    });

    if (result.success) {
      setBleeding('');
      setSacrifice('');
      setOxygen([]);
      setSynthesis('');
      setAiAnalysis(null);
      setStatusFeedback({
        message: `Reality accepted. +${result.xpGained} XP earned.`,
        type: 'success'
      });
    } else {
      setStatusFeedback({
        message: 'The abyss rejected your sacrifice. Try again.',
        type: 'error'
      });
    }
  };

  const loading = analyzing || saving;

  return (
    <>
      {statusFeedback && (
        <StatusFeedback
          message={statusFeedback.message}
          type={statusFeedback.type}
          onClose={closeFeedback}
        />
      )}

      {isModalOpen && aiAnalysis && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="SRAP-AI DIAGNOSIS"
          icon="🎯"
        >
          <div className="prose prose-invert max-w-none">
            <p className="whitespace-pre-line leading-relaxed text-gray-200">
              {aiAnalysis}
            </p>
          </div>
        </Modal>
      )}

      <section className="py-12 px-6 max-w-4xl mx-auto" id="exam-form">
        <h2 className="text-3xl font-black text-center mb-8 text-red-500 tracking-tighter uppercase">
          🎯 SRAP EXAM - RAW REALITY
        </h2>
        
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-red-900 shadow-2xl shadow-red-900/10">
          <div className="text-center mb-10">
            <div className="breathing-crudo w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-red-500/20 shadow-inner" aria-hidden="true">
              <span className="text-3xl">💀</span>
            </div>
            <p className="text-gray-400 italic mb-4 max-w-2xl mx-auto text-lg">
              "Enlightenment is not perpetual peace. It is knowing that fear in the chest,
              mental calculation and trembling in the hands are the normal orchestra of being alive."
            </p>
            <p className="text-yellow-500 font-bold tracking-widest uppercase text-sm">
              Wisdom is not letting any center drown the others.
            </p>
          </div>

          {loading && (
            <div className="my-10" role="status" aria-live="polite">
              <LoadingSpinner message={saving ? 'SAVING REALITY...' : 'DECODING ABYSS...'} />
            </div>
          )}

          <div className="space-y-8">
            {/* Step 1: Diagnosis */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-black text-red-500 mb-2 uppercase flex items-center gap-2">
                <span className="bg-red-500 text-black px-2 py-0.5 text-sm rounded">1</span>
                RAW DIAGNOSIS
              </h3>
              <p className="text-gray-400 mb-6 text-sm">Which of the three centers is bleeding MOST today?</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="group" aria-label="Center selection">
                {[
                  { id: 'head' as CenterType, label: 'Head', icon: '🧠', ringColor: 'ring-blue-500', bgColor: 'bg-blue-900/30' },
                  { id: 'heart' as CenterType, label: 'Heart', icon: '💔', ringColor: 'ring-red-500', bgColor: 'bg-red-900/30' },
                  { id: 'body' as CenterType, label: 'Body', icon: '🦶', ringColor: 'ring-green-500', bgColor: 'bg-green-900/30' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBleeding(item.id)}
                    aria-pressed={bleeding === item.id}
                    className={`flex flex-col items-center justify-center p-6 ${item.bgColor} rounded-xl cursor-pointer transition-all duration-300 ring-2 focus:outline-none focus:ring-offset-4 focus:ring-offset-black ${bleeding === item.id ? item.ringColor + ' scale-105 shadow-lg shadow-black/50' : 'ring-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'}`}
                  >
                    <span className="text-3xl mb-3" aria-hidden="true">{item.icon}</span>
                    <span className="font-black text-gray-200 uppercase tracking-wider">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sacrifice */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-black text-red-500 mb-2 uppercase flex items-center gap-2">
                <span className="bg-red-500 text-black px-2 py-0.5 text-sm rounded">2</span>
                CONSCIOUS SACRIFICE
              </h3>
              <label htmlFor="sacrifice-select" className="block text-gray-400 mb-6 text-sm">
                Which center has to give in TODAY so the other two survive?
              </label>

              <select
                id="sacrifice-select"
                value={sacrifice}
                onChange={e => setSacrifice(e.target.value as CenterType)}
                className="w-full bg-black/50 text-white p-4 rounded-xl border border-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all appearance-none cursor-pointer font-bold"
              >
                <option value="">Choose today's sacrifice...</option>
                <option value="head">Head: Accept chaos, stop controlling</option>
                <option value="heart">Heart: Postpone dreams, accept reality</option>
                <option value="body">Body: Ignore fatigue, keep moving</option>
              </select>
            </div>

            {/* Step 3: Oxygen */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-black text-red-500 mb-2 uppercase flex items-center gap-2">
                <span className="bg-red-500 text-black px-2 py-0.5 text-sm rounded">3</span>
                SURVIVAL OXYGEN
              </h3>
              <p className="text-gray-400 mb-6 text-sm">What minimal action can give oxygen to the most drowned center?</p>

              <div className="space-y-3" role="group" aria-label="Oxygen actions">
                {OXYGEN_OPTIONS.map(opt => (
                  <label
                    key={opt}
                    className={`flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all border ${oxygen.includes(opt) ? 'bg-red-950/30 border-red-500 shadow-inner' : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'}`}
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={oxygen.includes(opt)}
                        onChange={() => handleOxygenChange(opt)}
                        className="peer w-6 h-6 opacity-0 absolute cursor-pointer"
                      />
                      <div className="w-6 h-6 border-2 border-gray-600 rounded-md peer-checked:bg-red-500 peer-checked:border-red-500 transition-all flex items-center justify-center text-black font-bold">
                        {oxygen.includes(opt) && '✓'}
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${oxygen.includes(opt) ? 'text-white' : 'text-gray-400'}`}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Integration */}
            <div className="mt-12 p-8 bg-gradient-to-br from-red-950/20 to-black border border-red-900/50 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl font-black">SRAP</span>
                </div>

                <h3 className="text-2xl font-black text-yellow-500 mb-2 uppercase tracking-tight flex items-center gap-2">
                    <span className="text-3xl">💎</span> RAW INTEGRATION
                </h3>
                <label htmlFor="synthesis-text" className="block text-gray-400 mb-6 text-sm italic">
                    Combine your truths into a single survival statement.
                </label>

                <textarea 
                    id="synthesis-text"
                    value={synthesis}
                    onChange={e => setSynthesis(e.target.value)}
                    placeholder='Example: "Today the body bleeds most. I will sacrifice mental control (head) to give 10 minutes of rest to the body. The heart will wait until tomorrow."'
                    className="w-full h-40 bg-black/60 border border-yellow-900/50 rounded-2xl p-6 text-white focus:outline-none resize-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium placeholder:text-gray-700 leading-relaxed shadow-inner"
                ></textarea>
                
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={handleAcceptReality}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg shadow-red-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-tighter"
                  >
                    💀 DECODE WOUND
                  </button>
                  <button
                    onClick={handleAnalyzeSynthesis}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-black py-4 px-6 rounded-xl transition-all shadow-lg shadow-yellow-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-tighter"
                  >
                    🔬 ANALYZE TRUTH
                  </button>
                  <button
                    onClick={handleSaveEvaluation}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-tighter"
                  >
                    💾 SEAL REALITY
                  </button>
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExamSection;
