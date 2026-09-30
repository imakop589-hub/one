import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, CheckCheck, Headphones } from 'lucide-react';

interface LiveChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  isCartOpen?: boolean;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  isOpen,
  onClose,
  onToggle,
  isCartOpen = false,
}) => {
  const [messages, setMessages] = useState<{ sender: 'agent' | 'user'; text: string; time: string }[]>([
    {
      sender: 'agent',
      text: 'Hello! I am Denn from Hostxeon 24/7 customer support. How can I help you with your domain, web hosting or checkout today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg = {
      sender: 'user' as const,
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Dynamic instant response
    setTimeout(() => {
      let reply = "Great question! Our Web Hosting includes free SSL hosting, domain name setup, custom email boxes, and 24/7 support with a 15-day money-back guarantee.";
      if (userText.toLowerCase().includes('price') || userText.toLowerCase().includes('cost')) {
        reply = "Our Starter and Professional web hosting plans start at just £1.99/month with 1-year prepaid subscription! Domains start at just £0.99.";
      } else if (userText.toLowerCase().includes('wordpress') || userText.toLowerCase().includes('wp')) {
        reply = "Yes! We offer 1-click Managed WordPress installations along with automated core updates and speed caching.";
      } else if (userText.toLowerCase().includes('email')) {
        reply = "Professional domain email (e.g. you@yourbrand.com) with spam protection and Webmail is included with all hosting packages!";
      } else if (userText.toLowerCase().includes('checkout') || userText.toLowerCase().includes('pay')) {
        reply = "You can pay securely via Credit Card (Visa/Mastercard), PayPal, Klarna, or Direct Debit with 256-bit SSL encryption.";
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'agent',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

  // When cart drawer is open on the right side, shift chat button to the LEFT side so it never collides!
  const positionClass = isCartOpen
    ? 'bottom-5 left-5'
    : 'bottom-5 right-5';

  return (
    <div 
      className={`fixed z-50 transition-all duration-300 ease-in-out ${positionClass}`}
      id="live-chat-container"
    >
      {/* Trigger floating button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="bg-[#008a45] hover:bg-[#062c21] text-white p-4 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-white/40"
          id="floating-chat-trigger"
          title="Chat with 24/7 Support"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#fed000] rounded-full ring-2 ring-[#008a45] animate-pulse"></span>
          </div>
          <span className="text-xs font-bold hidden sm:inline">24/7 Chat Support</span>
        </button>
      )}

      {/* Live Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-3xl w-80 sm:w-96 shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5 duration-200 ${
          isCartOpen ? 'origin-bottom-left' : 'origin-bottom-right'
        }`}>
          {/* Header */}
          <div className="bg-[#062c21] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-sm text-white">
                  D
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#4ade80] rounded-full ring-2 ring-[#062c21]"></span>
              </div>
              <div>
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <span>Denn • 24/7 Support</span>
                </div>
                <div className="text-[10px] text-emerald-200/80">Typically replies in seconds</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              id="close-live-chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f8faf9] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-[#008a45] text-white rounded-br-xs'
                      : 'bg-white text-gray-800 border border-gray-200/80 shadow-2xs rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[9px] text-gray-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about hosting or checkout..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#008a45]"
            />
            <button
              type="submit"
              className="bg-[#fed000] hover:bg-[#ebbe00] text-gray-950 p-2 rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
