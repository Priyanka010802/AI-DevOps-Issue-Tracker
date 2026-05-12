import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Send, Cpu, Sparkles, ShieldCheck } from 'lucide-react';

const Message = ({ type, text, sender }) => (
  <div className={`flex gap-4 p-4 ${sender === 'ai' ? 'bg-primary-600/5' : ''}`}>
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
      sender === 'ai' ? 'bg-primary-600 text-white' : 'bg-dark-600 text-gray-400'
    }`}>
      {sender === 'ai' ? <Sparkles size={16} /> : <TerminalIcon size={16} />}
    </div>
    <div className="space-y-2 flex-1">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {sender === 'ai' ? 'Nexus AI' : 'Operative'}
        </span>
        {sender === 'ai' && <ShieldCheck size={12} className="text-primary-500" />}
      </div>
      <p className={`text-sm leading-relaxed ${sender === 'ai' ? 'text-gray-200' : 'text-gray-400'}`}>
        {text}
      </p>
    </div>
  </div>
);

const AIChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Identity verified. AI Systems online. How can I assist with your DevOps operations today?' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: `Analyzing query: "${input}". Based on current cluster metrics, I recommend checking the rollout status of the 'auth-api' deployment. There's a 78% probability that the recent config-map update is causing the crash-loop.` 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Cpu className="text-primary-500" size={24} />
            AI Operations Console
          </h1>
          <p className="text-gray-500 text-sm">Neural link established with cluster <span className="terminal-text">nexus-prod-01</span></p>
        </div>
        <div className="flex items-center gap-2 bg-dark-800 px-3 py-1 rounded-full border border-white/5">
          <div className="w-2 h-2 bg-devops-green rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Core Active</span>
        </div>
      </div>

      <div className="flex-1 glass overflow-hidden flex flex-col mb-4">
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {messages.map(msg => (
            <Message key={msg.id} {...msg} />
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-dark-800/50 border-t border-white/10">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask about deployments, logs or troubleshooting..."
              className="w-full bg-dark-700 border border-white/10 rounded-xl py-4 pl-4 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all placeholder:text-gray-600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-all"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            {['Explain logs', 'Analyze deployment', 'Check health'].map(tag => (
              <button 
                key={tag}
                type="button"
                onClick={() => setInput(tag)}
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-white/5 hover:bg-white/10 text-gray-500 hover:text-gray-300 rounded transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
