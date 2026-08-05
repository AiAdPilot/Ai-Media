import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Flame, 
  Target, 
  Zap, 
  Layers,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Hello! I'm your AdPilot AI Advertising Strategist. How can I help optimize your Meta Facebook & Instagram campaigns today? You can ask me to generate direct-response ad copy, audit CPMs/ROAS, or write 3-second pattern interrupt video hooks.",
      time: '10:00 AM'
    },
    {
      sender: 'user',
      text: "What are the top 3 direct response hooks for a high-ticket eCommerce product ($199 Wireless Earbuds)?",
      time: '10:01 AM'
    },
    {
      sender: 'ai',
      text: `Here are 3 high-converting 3-second pattern-interrupt video hooks tailored for your $199 Aura Earbuds:

1. **The Negative Anti-Feature Hook**: "Stop buying $300 earbuds that die in 4 hours. Here's what audiophiles are actually switching to in 2026."
2. **The Visual Demonstration Hook**: [Holds noise-canceling earbud next to a roaring jet engine sound] "Watch what happens when I turn on active noise cancellation right here."
3. **The Price-to-Value Comparison**: "Why pay $350 for brand name noise-canceling when you get 36-hour battery and studio drivers for under $200?"`,
      time: '10:01 AM'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const quickPrompts = [
    'Audit my campaign budget allocation',
    'Write 5 Instagram Reel video hooks',
    'How do I lower cold traffic CPMs?',
    'Create a MOFU retargeting ad angle'
  ];

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: timeNow }]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Based on Meta Ads Advantage+ data and current eCommerce benchmark rates, here is my strategic recommendation for "${userText}":\n\n- **Targeting**: Scale CBO budget across Advantage+ Placements (IG Reels 45%, FB Feed 35%).\n- **Messaging**: Focus heavily on problem-agitation hooks in the first 3 seconds.\n- **ROAS Threshold**: Keep daily scaling at +20% as long as Cost Per Purchase remains under $32.00.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase">
              Gemini 2.5 Strategy Engine Online
            </span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            AI Advertising Copilot
          </h1>
          <p className="text-xs text-slate-500">
            Real-time campaign diagnostic, ad copy generator, and Meta Ads policy advisor.
          </p>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          title="Clear Chat History"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => {
              setInputQuery(prompt);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-400 text-slate-700 text-xs font-medium transition-all whitespace-nowrap shadow-2xs shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] min-h-[450px] flex flex-col justify-between space-y-6">
        <div className="space-y-6 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white font-body'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-800 font-body'
                }`}
              >
                <div className="flex items-center justify-between gap-4 font-mono text-[10px] opacity-60">
                  <span>{msg.sender === 'user' ? 'You' : 'AdPilot AI'}</span>
                  <span>{msg.time}</span>
                </div>

                <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>

                {msg.sender === 'ai' && (
                  <div className="pt-2 flex items-center justify-end border-t border-slate-200/60">
                    <button
                      onClick={() => handleCopy(msg.text, idx)}
                      className="text-[11px] font-mono text-slate-500 hover:text-slate-900 flex items-center gap-1"
                    >
                      {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIdx === idx ? 'Copied' : 'Copy Response'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-xs text-slate-500 font-mono animate-pulse">
                AdPilot AI is analyzing campaign signals...
              </div>
            </div>
          )}
        </div>

        {/* Query Input Box */}
        <form onSubmit={handleSend} className="relative pt-4 border-t border-slate-100">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask AdPilot AI to generate copy, audit ROAS, or review targeting..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all font-body"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="absolute right-2 top-1/2 translate-y-[-2px] p-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-lg transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
