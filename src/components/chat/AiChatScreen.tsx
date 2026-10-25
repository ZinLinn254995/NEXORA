import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Sparkles,
  Send,
  Video,
  Trash2,
  Bot,
  User,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedTitle?: string;
  suggestedIdea?: string;
  videoType?: string;
  timestamp: string;
}

interface AiChatScreenProps {
  onCreateProjectFromIdea: (idea: {
    title: string;
    idea: string;
    videoType?: string;
  }) => void;
}

export const AiChatScreen: React.FC<AiChatScreenProps> = ({
  onCreateProjectFromIdea,
}) => {
  const { language, t } = useLanguage();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const initialWelcomeText = t.chatWelcomeMessage;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: initialWelcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Starter prompts tailored to active language
  const starterPrompts =
    language === 'my'
      ? [
          'ပုဂံ သမိုင်းကြောင်းအကြောင်း ၆၀ စက္ကန့် ပညာပေး ဗီဒီယို ပြုလုပ်ချင်ပါသည်',
          'ကော်ဖီဆိုင် အသစ် ဖွင့်ပွဲအတွက် ၃၀ စက္ကန့် ကြော်ငြာ ဗီဒီယို စိတ်ကူးပေးပါ',
          'မနက်စောစော ထခြင်း၏ ကောင်းကျိုး ၅ ချက် အကြောင်း ဆိုရှယ်မီဒီယာ ဗီဒီယိုတို',
          'ရှေးခေတ် မြန်မာ့ လက်မှုပညာ အထည်ရက်လုပ်ခြင်း မှတ်တမ်း ဗီဒီယို စိတ်ကူး',
        ]
      : [
          'A 60-second animated explainer on how black holes work for beginners',
          'A 30-second TikTok story about an artisan baker who wakes up at 3 AM',
          'A promotional video for an eco-friendly bamboo thermos cup',
          'A 45-second inspiring mini-documentary about solar-powered rural villages',
        ];

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || loading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: 'assistant',
        text: data.reply || 'Here is an idea for your video!',
        suggestedTitle: data.suggestedTitle || textToSend.slice(0, 40),
        suggestedIdea: data.suggestedIdea || textToSend,
        videoType: data.videoType || 'education',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('Backend chat error, using client fallback:', err);
      // Helpful fallback
      const fallbackReply =
        language === 'my'
          ? `သင်ပြောသော "${textToSend}" သည် အလွန်စိတ်ဝင်စားဖွယ် ကောင်းပါသည်။\n\n• အကြံပြု ခေါင်းစဉ်: ${textToSend.slice(0, 35)}\n• အကြံပြု အခန်းများ: အဖွင့်ဆွဲဆောင်မှု၊ အဓိက အကြောင်းအရာ၊ နိဂုံးချုပ်။\n\nအောက်ပါခလုတ်ကို နှိပ်၍ ပရောဂျက်အဖြစ် ချက်ချင်း ပြောင်းလဲနိုင်ပါသည်။`
          : `That is a great direction for "${textToSend}"!\n\n• Suggested Title: ${textToSend.slice(0, 40)}\n• Format: 3-Scene Video Storyboard\n• Next Step: Let's structure the script and narration in the project workspace.`;

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant-fb`,
        sender: 'assistant',
        text: fallbackReply,
        suggestedTitle: textToSend.slice(0, 45),
        suggestedIdea: textToSend,
        videoType: 'education',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'msg-welcome-new',
        sender: 'assistant',
        text: t.chatWelcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            {t.chatHeaderTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.chatHeaderSubtitle}
          </p>
        </div>
        <button
          onClick={clearChat}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 transition-colors w-fit"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{t.chatClearConversation}</span>
        </button>
      </div>

      {/* Idea Starters Pill Row */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.chatExamplePromptsTitle}:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {starterPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-left px-3.5 py-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-cyan-500/30 text-xs text-slate-300 hover:text-cyan-300 transition-all leading-snug"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* Message History Thread */}
      <div className="rounded-xl border border-slate-800 bg-[#0c0f16] p-4 sm:p-6 min-h-[380px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-violet-500/20">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-br-none shadow-md shadow-cyan-600/20'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Action Button: Turn into Project */}
              {msg.sender === 'assistant' && msg.suggestedIdea && (
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-400 italic">
                    Ready to storyboard?
                  </span>
                  <button
                    onClick={() =>
                      onCreateProjectFromIdea({
                        title: msg.suggestedTitle || 'New Video Project',
                        idea: msg.suggestedIdea || '',
                        videoType: msg.videoType || 'education',
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-sm transition-transform hover:scale-[1.02]"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>{t.chatTurnIntoProjectBtn}</span>
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              )}

              <div
                className={`text-[10px] mt-2 ${
                  msg.sender === 'user' ? 'text-cyan-100 text-right' : 'text-slate-500'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-xs text-cyan-400 animate-pulse pl-1">
            <div className="w-8 h-8 rounded-lg bg-violet-900/40 border border-violet-700 flex items-center justify-center">
              <Bot className="w-4 h-4 text-violet-300" />
            </div>
            <span>{t.chatThinking}</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 bg-[#121622] border border-slate-800 rounded-xl p-1.5 shadow-lg focus-within:border-cyan-500/60 focus-within:ring-1 focus-within:ring-cyan-500/40 transition-all">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.chatInputPlaceholder}
          disabled={loading}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 disabled:opacity-40 disabled:pointer-events-none rounded-lg transition-all"
        >
          <span>{t.chatSendBtn}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
