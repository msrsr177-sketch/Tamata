
import React, { useState, useRef, useEffect } from 'react';
import { getProductRecommendations } from '../services/geminiService';
import { Product, ChatMessage } from '../types';

interface AIScoutProps {
  products: Product[];
}

const AIScout: React.FC<AIScoutProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Marhaban! I am the Tamata Scout. Looking for something specific today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showPermissionExplain, setShowPermissionExplain] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize Speech Recognition if available
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceClick = async () => {
    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    // Professional Permission UX: Explain why before triggering the system dialog
    // This is the ideal moment to handle 'One-time' permissions gracefully
    if (!localStorage.getItem('mic_explained')) {
      setShowPermissionExplain(true);
      return;
    }

    startListening();
  };

  const startListening = () => {
    try {
      setIsListening(true);
      recognitionRef.current?.start();
      localStorage.setItem('mic_explained', 'true');
    } catch (e) {
      console.error('Failed to start listening', e);
      setIsListening(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await getProductRecommendations(userMsg, products);
    setMessages(prev => [...prev, { role: 'model', text: response || "I couldn't find a perfect match. Try asking differently!" }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-zinc-200 flex flex-col h-[500px] overflow-hidden animate-slide-in-up relative">
          
          {/* Permission Explanation Overlay */}
          {showPermissionExplain && (
            <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-6">
                <i className="fa-solid fa-microphone text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Enable Voice Search</h3>
              <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                Tamata needs microphone access to let you search by voice. You can choose "Only this time" in the next step.
              </p>
              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={() => { setShowPermissionExplain(false); startListening(); }}
                  className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-200 active:scale-95 transition-all"
                >
                  Continue
                </button>
                <button 
                  onClick={() => setShowPermissionExplain(false)}
                  className="w-full py-4 bg-zinc-100 text-zinc-500 rounded-2xl font-bold active:scale-95 transition-all"
                >
                  Not now
                </button>
              </div>
            </div>
          )}

          <div className="p-4 bg-red-500 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-robot"></i>
              <span className="font-bold">Tamata AI Scout</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-red-600 p-1 rounded-lg">
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-zinc-900 text-white rounded-tr-none' 
                  : 'bg-white text-zinc-800 border border-zinc-200 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-zinc-200 px-4 py-2 rounded-2xl animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSearch} className="p-4 border-t border-zinc-100 bg-white">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask for a recommendation..."}
                  className={`w-full pl-4 pr-4 py-3 bg-zinc-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${isListening ? 'ring-2 ring-red-500 animate-pulse' : ''}`}
                />
              </div>
              
              <button 
                type="button"
                onClick={handleVoiceClick}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-90 ${isListening ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-zinc-100 text-zinc-400 hover:text-red-500'}`}
              >
                <i className={`fa-solid ${isListening ? 'fa-stop' : 'fa-microphone'}`}></i>
              </button>

              <button 
                type="submit"
                disabled={!query.trim() || isLoading}
                className="w-11 h-11 bg-zinc-900 text-white rounded-xl flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-zinc-900 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-red-500 transition-all active:scale-90 animate-bounce-slow"
        >
          <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default AIScout;
