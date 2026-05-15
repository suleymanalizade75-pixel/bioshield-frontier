import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '@/lib/i18n';

const AI_GREETINGS = {
  EN: '🐾 Hello! I\'m your veterinary product assistant. Describe your animal\'s symptoms or condition, and I\'ll recommend the most suitable products from our catalog. How can I help?',
  AZ: '🐾 Salam! Mən sizin baytarlıq müalicəsi köməkçinizəm. Heyvanınızın simptomlarını və ya vəziyyətini təsvir edin, kataloğumuzdan ən uyğun məhsulları tövsiyə edəcəyəm. Necə kömək edə bilərəm?',
  RU: '🐾 Привет! Я ваш ветеринарный ассистент. Опишите симптомы или состояние вашего животного, и я порекомендую наиболее подходящие продукты из нашего каталога. Чем я могу помочь?'
};

const AI_ERROR_MESSAGES = {
  EN: '❌ Sorry, I couldn\'t process that request. Try describing the symptoms more clearly.',
  AZ: '❌ Bağışlayın, bu sorğunu emal edə bilmədim. Simptomları daha aydın şəkildə təsvir edərək yenidən cəhd edin.',
  RU: '❌ Извините, я не смог обработать этот запрос. Попробуйте описать симптомы более чётко.'
};

export default function AIAssistant({ onClose, products }) {
  const { lang, t } = useLang();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: AI_GREETINGS[lang] || AI_GREETINGS.EN
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a veterinary product recommendation assistant. The user is describing an animal health issue and needs product recommendations.

Available products database:
${products.map(p => `- ${p.name} (${p.category}): ${p.description}. Species: ${p.species?.join(', ')}. Features: ${p.features?.join(', ')}`).join('\n')}

User query: "${userMessage}"

Provide a helpful response with specific product recommendations from the database above. Be concise and professional. Include 2-3 relevant products with brief explanations of why they would help.`,
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: AI_ERROR_MESSAGES[lang] || AI_ERROR_MESSAGES.EN
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-end p-6 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 400, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md h-[600px] rounded-2xl shadow-2xl flex flex-col"
          style={{
            background: 'linear-gradient(135deg, rgba(10,10,20,0.95) 0%, rgba(20,15,35,0.95) 100%)',
            border: '1px solid rgba(99,102,241,0.3)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-primary/20">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-orbitron font-bold text-foreground">{t.catalog_page.aiAssistant}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary/30 text-foreground rounded-br-none'
                      : 'bg-white/10 text-gray-300 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-sm text-gray-300">{lang === 'EN' ? 'Thinking...' : lang === 'AZ' ? 'Düşünülür...' : 'Думаю...'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-primary/20 space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'EN' ? 'Describe symptoms...' : lang === 'AZ' ? 'Simptomları təsvir edin...' : 'Опишите симптомы...'}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-primary/20 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-colors"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {lang === 'EN' ? 'AI recommendations based on your product catalog' : lang === 'AZ' ? 'Məhsul kataloğunuza əsaslanan AI tövsiyələri' : 'AI рекомендации на основе вашего каталога'}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}