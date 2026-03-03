import React, { useState } from 'react';

const BreathingSection: React.FC = () => {
  const [activeOxygen, setActiveOxygen] = useState<string | null>(null);

  return (
    <section className="py-12 bg-black bg-opacity-50">
        <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-6">🌬️ DID IT HURT? GOOD. NOW BREATHE</h2>
            
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-red-800">
                <div className={`breathing-crudo w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-500 ${activeOxygen ? 'animate-[breathe-crudo_2s_ease-in-out_infinite]' : ''}`}>
                    <span className="text-3xl">💨</span>
                </div>
                
                <p className="text-gray-300 mb-6">
                    <strong className="text-yellow-400">DECIDE:</strong> Which of the three centers needs more oxygen TODAY?
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { id: 'head', label: 'Mental Oxygen', icon: '🧠', color: 'blue' },
                      { id: 'heart', label: 'Emotional Oxygen', icon: '💔', color: 'red' },
                      { id: 'body', label: 'Physical Oxygen', icon: '🦶', color: 'green' }
                    ].map(type => (
                      <button 
                        key={type.id}
                        onClick={() => setActiveOxygen(type.id)}
                        className={`py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-semibold bg-${type.color}-900 bg-opacity-30 hover:bg-${type.color}-800 text-${type.color}-300 ring-2 ${activeOxygen === type.id ? 'ring-yellow-400' : 'ring-transparent'}`}
                      >
                          {type.icon} {type.label}
                      </button>
                    ))}
                </div>
                
                <p className="text-sm text-gray-400 italic">
                    There is no correct answer. Only choices and their consequences.
                    Wisdom is in choosing conscious of what you are sacrificing.
                </p>
            </div>
        </div>
    </section>
  );
};

export default BreathingSection;
