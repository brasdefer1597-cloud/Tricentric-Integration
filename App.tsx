import React, { useEffect, useState } from 'react';
import HeaderSection from './components/HeaderSection';
import TruthsSection from './components/TruthsSection';
import ExamSection from './components/ExamSection';
import BreathingSection from './components/BreathingSection';
import GamificationDashboard from './components/GamificationDashboard';
import TricentricIntegration from './components/TricentricIntegration';
import { supabase } from './lib/supabase';
import { useProfile } from './hooks/useProfile';
import { useGamification } from './hooks/useGamification';

const RealityMapSection: React.FC = () => (
  <section className="py-12 px-6 max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-2xl p-8 border border-yellow-700">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">🗺️ REALITY MAP</h2>
          
          <div className="overflow-x-auto">
              <table className="w-full text-sm">
                  <thead>
                      <tr className="border-b border-yellow-600">
                          <th className="text-left py-4 text-yellow-400 min-w-[80px]">Center</th>
                          <th className="text-left py-4 text-yellow-400 min-w-[120px]">Promises You</th>
                          <th className="text-left py-4 text-yellow-400 min-w-[200px]">Reality Demands</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr className="border-b border-gray-700">
                          <td className="py-4 font-semibold text-blue-400">🧠 Head</td>
                          <td className="py-4 text-gray-300">Control</td>
                          <td className="py-4 text-gray-300">Accept chaos + act anyway</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                          <td className="py-4 font-semibold text-red-400">💓 Heart</td>
                          <td className="py-4 text-gray-300">Meaning</td>
                          <td className="py-4 text-gray-300">Tolerate emptiness + build sense</td>
                      </tr>
                      <tr>
                          <td className="py-4 font-semibold text-green-400">🦶 Body</td>
                          <td className="py-4 text-gray-300">Pleasure</td>
                          <td className="py-4 text-gray-300">Endure pain + move anyway</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </section>
);

const SacrificesSection: React.FC = () => (
    <section className="py-12 px-6 max-w-6xl mx-auto -mt-12">
      <div className="integration-cruda rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-6">⚰️ DAILY SACRIFICES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-dashed border-gray-600 rounded-lg bg-gray-800">
                  <h4 className="font-bold text-yellow-400 mb-2">❌ NO "PERFECT BALANCE"</h4>
                  <p className="text-gray-300 text-sm">
                      You will choose which center to sacrifice today. You can't have it all.
                      The question is not "how to balance?" but "whose turn is it to suffer today?"
                  </p>
              </div>
              
              <div className="p-4 border border-dashed border-gray-600 rounded-lg bg-gray-800">
                  <h4 className="font-bold text-yellow-400 mb-2">⏳ INEVITABLE DECLINE</h4>
                  <p className="text-gray-300 text-sm">
                      Your body ages, your head forgets, your heart scars poorly.
                      Every choice accelerates the wear and tear of some center.
                  </p>
              </div>
              
              <div className="p-4 border border-dashed border-gray-600 rounded-lg bg-gray-800">
                  <h4 className="font-bold text-yellow-400 mb-2">💉 SIMULTANEOUS BLEEDING</h4>
                  <p className="text-gray-300 text-sm">
                      The only real integration is accepting that sometimes you bleed from all three places at once.
                      Welcome to being alive.
                  </p>
              </div>
          </div>
      </div>
    </section>
);

function App() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [authChecked, setAuthChecked] = useState(false);

  const { profile, refreshProfile } = useProfile(userId);
  const gamificationState = useGamification(profile);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id);
      setAuthChecked(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">💀</div>
          <div className="text-gray-400">Loading SRAP...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-red-500 selection:text-white">
      <HeaderSection />

      {userId && profile && (
        <div className="max-w-6xl mx-auto px-6 -mt-8">
          <GamificationDashboard state={gamificationState} />
        </div>
      )}

      <TruthsSection />
      <RealityMapSection />
      <SacrificesSection />
      <ExamSection onEvaluationComplete={refreshProfile} />

      {/* Module 2: Tricentric Integration with Kofi Link */}
      <TricentricIntegration kofiUrl="https://ko-fi.com/s/7b0236c681" />

      <BreathingSection />
    </div>
  );
}

export default App;
