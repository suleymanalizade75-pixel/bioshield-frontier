import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLang } from '@/lib/i18n';

const SYSTEM_PROMPT = `You are the official technical AI expert for ALL products and projects currently presented on this site: livestock Health, Feed, Farm solutions, XVET feed additives, milk replacers, and ImmuCell passive immunity products.

═══ SPECIES ORDER / WEBSITE MAP ═══
Always guide users using this department structure and species order: Poultry → Sheep → Goats → Cattle → Swine → Aqua → Bee.
Departments:
- HEALTH: disease prevention, immunity, gut, respiratory, liver, kidney, recovery, parasite and colony health.
- FEED: nutrition, feed quality, intake, milk replacers / ЗЦМ / сухое молоко для молодняка, lactation, growth.
- FARM: formulation, physical quality, coat/fleece/hoof/skin, skeletal and farm performance support.

═══ HEALTH PRODUCTS ═══
- Poultry: ImmunoFort AV, ProGut Poultry, Immunity, Gut Health, Respiratory System Support, NAGP.
- Sheep: Immunity Support, Respiratory Care.
- Goats: Kid Health Start, Mastitis Control.
- Cattle: Early Care, Fertility, Gut Health, Immunity, Kidney Support, Liver Support, NAGP, Quick Recovery, Respiratory System Support, Skin Quality.
- Swine: GutShield Porcine, BreathEasy Pro, Immunity, Gut Health, Respiratory System Support.
- Aqua: AquaImmune Pro, PondGuard AV.
- Bee: VarroaShield, NosemaStop.

═══ FEED PRODUCTS ═══
- Poultry: Egg Performance, Feed Intake, Feed Quality, Gut Health, NAGP, Respiratory System Support, Feed Enzymes, Myvatex™, Everwell, Calprona, Nutri-Profit, NutriXtend™ Optim.
- Sheep: HERO® Lamb Milk Replacer / ЗЦМ. Efficacy: **100%**. Action: **Immediate**.
- Goats: GOLDEN Kid Milk Replacer / ЗЦМ. Efficacy: **100%**. Action: **Immediate**.
- Cattle: Milk Replacers / ЗЦМ — Imperial, Unique, Milk Plus, Fresh Start. Efficacy: **100%**. Action: **Immediate**. Also Aromax® Dry, Mould Guard Diamond, Toxi-Guard, Turbo Grow, MilQ.
- Swine: PigPrime-S, SowPerfect.
- Aqua: AquaGrow Elite, ShrimpVital.
- Bee: ColonyBoost, HiveEnergy.

═══ FARM PRODUCTS ═══
- Poultry: FeatherShield, BoneForce-P, Cal D Phos®, Smooth Pro, E-Hydrolyte + C Pro, Turbo Fluid, Mineral Forte, Vitamin E+Se, Vitamin AD3E.
- Sheep: Fleece Quality, Hoof Health.
- Goats: Cashmere Coat, Reproductive Performance.
- Cattle: MuscleMass-B, CoatLuster, Cal D Phos®.
- Swine: CarcassGrade+, SkinBarrier-P.
- Aqua: ScaleMirror, FinStrong.
- Bee: QueenElite, PropoClear.

═══ IMMUCELL PRODUCT CATALOG ═══
- **First Defense®**: Oral passive immunity for newborn calves. Covers bovine rotavirus, coronavirus, and E. coli K99. Administered at birth.
- **Tri-Shield®**: Expands First Defense® with an additional rotavirus protection layer. For calves at birth.
- Efficacy: **100%** clinical evidence. Immunity onset: **Instant**. Cold-chain delivery: **48 hours**.

═══ CONTACT ═══
- Phone: **+994 50 212 12 33**
- Location: **Baku, Azerbaijan**

═══ BEHAVIOR RULES ═══
1. Support Azerbaijani, Russian, and English fully. Always answer in the user's language.
2. Always guide the user to the correct department: **[Species – HEALTH]**, **[Species – FEED]**, or **[Species – FARM]**.
3. If the user mentions milk replacer, ЗЦМ, dry milk, lamb/kid/calf feeding, direct them to **FEED** for Sheep, Goats, or Cattle.
4. Keep answers professional, clear, and practical for veterinarians and farmers.
5. Never invent products; recommend only products listed above.`;

const CHAT_LABELS = {
  EN: { title: 'LIVESTOCK · AI EXPERT', placeholder: 'Ask about Health, Feed, Farm products...', send: 'Send', greeting: 'Hello! I can guide you through Health, Feed, and Farm solutions for poultry, sheep, goats, cattle, swine, aqua, and bees.' },
  AZ: { title: 'HEYVANDARLIQ · AI EKSPERT', placeholder: 'Sağlamlıq, Yem, Ferma məhsulları haqqında soruşun...', send: 'Göndər', greeting: 'Salam! Mən sizi quşlar, qoyunlar, keçilər, qaramal, donuz, akva və arılar üçün Sağlamlıq, Yem və Ferma həllərinə yönləndirə bilərəm.' },
  RU: { title: 'ЖИВОТНОВОДСТВО · AI ЭКСПЕРТ', placeholder: 'Спросите о Health, Feed, Farm продуктах...', send: 'Отправить', greeting: 'Здравствуйте! Я помогу выбрать раздел Health, Feed или Farm для птицы, овец, коз, КРС, свиней, аквы и пчёл.' },
};

export default function AIChatWidget() {
  const { lang } = useLang();
  const labels = CHAT_LABELS[lang] || CHAT_LABELS.EN;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: labels.greeting }
  ]);
  const bottomRef = useRef(null);

  // Update greeting when language changes
  useEffect(() => {
    setMessages([{ role: 'assistant', content: (CHAT_LABELS[lang] || CHAT_LABELS.EN).greeting }]);
  }, [lang]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = [...messages, userMsg]
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${SYSTEM_PROMPT}\n\nConversation so far:\n${history}\n\nRespond as the livestock product AI expert. Match the language of the last user message exactly.`,
      model: 'gemini_3_flash',
    });

    setMessages(prev => [...prev, { role: 'assistant', content: typeof response === 'string' ? response : response?.text || 'I apologize, please try again.' }]);
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[500] w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #b8860b, #d4a017, #b8860b)',
          border: '2px solid rgba(212,160,23,0.6)',
          boxShadow: '0 0 24px rgba(184,134,11,0.5), 0 0 48px rgba(184,134,11,0.2)',
        }}
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[499] w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              height: '480px',
              background: 'linear-gradient(145deg, rgba(8,6,2,0.97) 0%, rgba(20,14,4,0.98) 100%)',
              border: '1.5px solid rgba(212,160,23,0.35)',
              boxShadow: '0 0 60px rgba(184,134,11,0.15), 0 30px 60px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(212,160,23,0.2)', background: 'rgba(184,134,11,0.08)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#b8860b,#d4a017)', boxShadow: '0 0 12px rgba(184,134,11,0.5)' }}>
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-orbitron text-[11px] font-bold tracking-[3px] text-white">{labels.title}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-[8px] tracking-widest text-green-400">ONLINE · 24/7</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[85%] px-3 py-2 rounded-xl font-inter text-sm"
                    style={{
                      lineHeight: '1.75',
                      ...(msg.role === 'user' ? {
                        background: 'linear-gradient(135deg,rgba(184,134,11,0.3),rgba(212,160,23,0.2))',
                        border: '1px solid rgba(212,160,23,0.3)',
                        color: 'rgba(255,255,255,0.9)',
                      } : {
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.85)',
                      })
                    }}
                  >
                    {msg.content.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                      part.startsWith('**') && part.endsWith('**')
                        ? <strong key={j} style={{ color: '#d4a017', fontWeight: 700 }}>{part.slice(2, -2)}</strong>
                        : part
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#d4a017' }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 px-3 py-3" style={{ borderTop: '1px solid rgba(212,160,23,0.15)' }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,160,23,0.2)' }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={labels.placeholder}
                  className="flex-1 bg-transparent font-inter text-sm text-white placeholder-white/30 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg,#b8860b,#d4a017)', boxShadow: '0 0 8px rgba(184,134,11,0.4)' }}
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="font-mono text-[8px] tracking-widest" style={{ color: 'rgba(212,160,23,0.4)' }}>
                  HEALTH · FEED · FARM AI EXPERT
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}