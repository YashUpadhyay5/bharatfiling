import React, { useState } from 'react';
import { api } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  MessageSquare,
  Bot,
  PhoneCall,
  MessageCircle,
  X,
  Send,
  Calendar,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function SupportWidget({ currentStep, businessType, applicationId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ai'); // 'ai', 'whatsapp', 'call', 'callback'
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  // AI Chat state
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Namaste! I am your BharatFiling AI Assistant. Ask me anything about Company Incorporation, Income Tax (ITR), GST, MCA ROC Compliance, Accounting, or documentation. How can I assist your business today?',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Callback form state
  const [callbackPhone, setCallbackPhone] = useState(user?.phone || '');
  const [callbackSlot, setCallbackSlot] = useState('Next 30 minutes');
  const [callbackNotes, setCallbackNotes] = useState('');
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);

  const handleSendQuery = async (queryText) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userMsg = { id: `user-${Date.now()}`, sender: 'user', text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setAiLoading(true);

    try {
      const res = await api.askAIAssistant(q, currentStep, businessType, applicationId);
      if (res.success) {
        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: res.answer,
          escalate: res.escalate_suggested,
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: 'I apologize, but I could not retrieve that. Would you like to connect directly with our CA team via WhatsApp or request a callback?',
          escalate: true,
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    if (!callbackPhone) {
      showError('Please enter your phone number.');
      return;
    }

    setCallbackSubmitting(true);
    try {
      const res = await api.requestCallback({
        application_id: applicationId,
        phone: callbackPhone,
        preferred_time: callbackSlot,
        notes: callbackNotes,
      });

      if (res.success) {
        showSuccess(res.message);
        setCallbackNotes('');
        setActiveTab('ai');
      }
    } catch (err) {
      showError(err.message || 'Failed to submit callback request.');
    } finally {
      setCallbackSubmitting(false);
    }
  };

  const suggestedQuestions = [
    'Why do you need my electricity bill?',
    'What is ARN?',
    'What are HSN / SAC codes?',
    'How long does GST registration take?',
    'Is commercial office mandatory?',
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-full shadow-2xl border border-slate-700 hover:scale-105 transition-all group"
            aria-label="Open support and AI assistant"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold leading-none flex items-center gap-1">
                CA & Compliance AI <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">AI + CA Support Available</div>
            </div>
          </button>
        )}
      </div>

      {/* Support Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[420px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  BharatFiling Support Hub
                  <span className="bg-emerald-950 text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-800">
                    Online
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Ask AI · WhatsApp CA · Request Call</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-4 bg-slate-100 border-b border-slate-200 text-[11px] font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('ai')}
              className={`py-2.5 flex items-center justify-center gap-1 transition ${
                activeTab === 'ai' ? 'bg-white text-emerald-700 border-b-2 border-emerald-600' : 'hover:bg-slate-200/60'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              AI Chat
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`py-2.5 flex items-center justify-center gap-1 transition ${
                activeTab === 'whatsapp' ? 'bg-white text-emerald-700 border-b-2 border-emerald-600' : 'hover:bg-slate-200/60'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              WhatsApp
            </button>
            <button
              onClick={() => setActiveTab('call')}
              className={`py-2.5 flex items-center justify-center gap-1 transition ${
                activeTab === 'call' ? 'bg-white text-emerald-700 border-b-2 border-emerald-600' : 'hover:bg-slate-200/60'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              Call
            </button>
            <button
              onClick={() => setActiveTab('callback')}
              className={`py-2.5 flex items-center justify-center gap-1 transition ${
                activeTab === 'callback' ? 'bg-white text-emerald-700 border-b-2 border-emerald-600' : 'hover:bg-slate-200/60'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              CA Callback
            </button>
          </div>

          {/* Tab Body */}
          <div className="flex-1 overflow-y-auto p-4 max-h-[420px] bg-slate-50">
            {activeTab === 'ai' && (
              <div className="flex flex-col gap-3">
                {/* Messages List */}
                <div className="flex flex-col gap-2.5">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] shadow-xs ${
                          m.sender === 'user'
                            ? 'bg-slate-900 text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                        }`}
                      >
                        {m.text}
                      </div>

                      {/* Escalation CTA if complex */}
                      {m.escalate && (
                        <div className="mt-1.5 flex gap-2">
                          <button
                            onClick={() => setActiveTab('callback')}
                            className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg hover:bg-amber-100 transition flex items-center gap-1"
                          >
                            <Calendar className="w-3 h-3" />
                            Request CA Callback
                          </button>
                          <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            Chat on WhatsApp
                          </a>
                        </div>
                      )}
                    </div>
                  ))}

                  {aiLoading && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 w-fit">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                      Analyzing GST regulations & guidelines...
                    </div>
                  )}
                </div>

                {/* Question Chips */}
                <div className="mt-2 pt-2 border-t border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Suggested Questions:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedQuestions.map((sq, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendQuery(sq)}
                        className="text-[11px] bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 px-2.5 py-1 rounded-lg text-left transition"
                      >
                        {sq}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Direct WhatsApp Business Support</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Connect directly with a GST compliance specialist on our verified WhatsApp business account. Instant document checks and status updates.
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-left border border-slate-100 text-xs text-slate-600">
                  <div className="font-bold text-slate-800 mb-1">Available Hours:</div>
                  <div>Monday to Saturday: 9:00 AM – 8:00 PM IST</div>
                  <div className="text-emerald-600 font-semibold mt-1">Average Response: Under 3 minutes</div>
                </div>
                <a
                  href={`https://wa.me/919876543210?text=Hi%20BharatFiling%20CA%2C%20I%20have%20a%20question%20regarding%20my%20GST%20Registration${
                    applicationId ? `%20(App%20ID%3A%20${applicationId})` : ''
                  }.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp Chat &rarr;
                </a>
              </div>
            )}

            {activeTab === 'call' && (
              <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
                  <PhoneCall className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Official Helpline Phone Support</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Speak directly with our senior compliance advisory team. No complicated IVR menus.
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-xl font-black text-slate-900 tracking-wider">1800-890-8800</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Toll-Free Nationwide (All Operators)</div>
                </div>
                <a
                  href="tel:18008908800"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  Call 1800-890-8800 Now
                </a>
              </div>
            )}

            {activeTab === 'callback' && (
              <form onSubmit={handleCallbackSubmit} className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3.5">
                <div className="text-left">
                  <h4 className="font-bold text-slate-900 text-sm">Schedule a CA Callback</h4>
                  <p className="text-xs text-slate-500">
                    A Chartered Accountant will review your application and call you back.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Window</label>
                  <select
                    value={callbackSlot}
                    onChange={(e) => setCallbackSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Next 30 minutes">Next 30 minutes (Urgent)</option>
                    <option value="Today: 2:00 PM - 4:00 PM">Today: 2:00 PM - 4:00 PM</option>
                    <option value="Today: 4:00 PM - 6:00 PM">Today: 4:00 PM - 6:00 PM</option>
                    <option value="Tomorrow Morning (10:00 AM)">Tomorrow Morning (10:00 AM)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">What would you like to discuss?</label>
                  <textarea
                    rows={2}
                    value={callbackNotes}
                    onChange={(e) => setCallbackNotes(e.target.value)}
                    placeholder="e.g., Doubts regarding electricity bill in landlord name, partnership deed review"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={callbackSubmitting}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {callbackSubmitting ? 'Scheduling...' : 'Confirm CA Callback Request'}
                </button>
              </form>
            )}
          </div>

          {/* AI Input Footer (Only on AI Chat tab) */}
          {activeTab === 'ai' && (
            <div className="p-3 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuery();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask a question about Incorporation, ITR, GST, MCA..."
                  className="flex-1 px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || aiLoading}
                  className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition shrink-0"
                  aria-label="Send query"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
}
