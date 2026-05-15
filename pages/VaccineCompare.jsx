import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Search, ChevronDown, X } from 'lucide-react';
import ComparisonCard from '@/components/products/ComparisonCard';

const SPECIES_EMOJI = {
  'Bovine': '🐄', 'Porcine': '🐷', 'Ovine': '🐑', 'Poultry': '🐔',
  'Equine': '🐴', 'Caprine': '🐐', 'Canine': '🐕', 'Feline': '🐈',
  'Aquaculture': '🐠', 'Bees': '🐝'
};

export default function VaccineCompare() {
  const [selected, setSelected] = useState([null, null]);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(null);

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const vaccines = products.filter(p => p.category === 'Vaccines');
  const filtered = vaccines.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (index, vaccine) => {
    setSelected(prev => {
      const newSelected = [...prev];
      newSelected[index] = vaccine;
      return newSelected;
    });
    setShowDropdown(null);
    setSearch('');
  };

  const commonSpecies = selected[0] && selected[1]
    ? (selected[0].species || []).filter(s => (selected[1].species || []).includes(s))
    : [];

  const uniqueLeft = selected[0]
    ? (selected[0].species || []).filter(s => !(selected[1]?.species || []).includes(s))
    : [];

  const uniqueRight = selected[1]
    ? (selected[1].species || []).filter(s => !(selected[0]?.species || []).includes(s))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 backdrop-blur-xl border-b border-primary/10 bg-background/80"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="font-orbitron text-4xl font-bold text-foreground flex items-center gap-3 mb-2">
            <span className="text-3xl">⚖️</span> Peyvənd Müqayisəsi
          </h1>
          <p className="text-muted-foreground">Peyvənd dozaları və növ əhatəsini yan-yana müqayisə edin</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <label className="block font-orbitron text-sm font-bold text-foreground mb-3">
                {index === 0 ? 'PEYVƏNDİ SEÇİN 1' : 'PEYVƏNDİ SEÇİN 2'}
              </label>

              {selected[index] ? (
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-between">
                  <div>
                    <p className="font-orbitron font-bold text-foreground">{selected[index].name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{selected[index].species?.length || 0} species coverage</p>
                  </div>
                  <button
                    onClick={() => setSelected(prev => {
                      const newSelected = [...prev];
                      newSelected[index] = null;
                      return newSelected;
                    })}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-primary" />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(showDropdown === index ? null : index)}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-left font-orbitron text-sm text-foreground flex items-center justify-between"
                  >
                    Peyvənd seçin...
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>

                  <AnimatePresence>
                    {showDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 z-40"
                      >
                        <div className="p-4 rounded-xl border border-primary/30 bg-card shadow-2xl">
                          <input
                            type="text"
                            placeholder="Peyvəndlər axtarın..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-white/10 text-foreground placeholder-muted-foreground text-sm mb-3 focus:outline-none focus:border-primary/50"
                          />
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {filtered.map((vaccine) => (
                              <button
                                key={vaccine.id}
                                onClick={() => handleSelect(index, vaccine)}
                                className="w-full p-3 rounded-lg hover:bg-white/10 transition-all text-left border border-transparent hover:border-primary/30"
                              >
                                <p className="font-orbitron font-bold text-foreground text-sm">{vaccine.name}</p>
                                <p className="text-xs text-muted-foreground mt-1">{vaccine.species?.length || 0} növ</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Comparison View */}
        <AnimatePresence mode="wait">
          {selected[0] && selected[1] ? (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Side-by-Side Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[selected[0], selected[1]].map((vaccine, i) => (
                  <ComparisonCard key={vaccine.id} vaccine={vaccine} position={i} />
                ))}
              </div>

              {/* Detailed Comparison Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm"
              >
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <span>📊</span> Növ Əhatə Analizi
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Common Species */}
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                    <p className="font-orbitron text-sm font-bold text-green-400 mb-3">HƏR İKİSİ ({commonSpecies.length})</p>
                    <div className="space-y-2">
                      {commonSpecies.length > 0 ? (
                        commonSpecies.map(sp => (
                          <div key={sp} className="flex items-center gap-2 text-sm">
                            <span className="text-lg">{SPECIES_EMOJI[sp]}</span>
                            <span className="text-foreground">{sp}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground">Ümumi növ yoxdur</p>
                      )}
                    </div>
                  </div>

                  {/* Unique to Vaccine 1 */}
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                    <p className="font-orbitron text-sm font-bold text-blue-400 mb-3">{selected[0].name.split(' ')[0]} TƏK ({uniqueLeft.length})</p>
                    <div className="space-y-2">
                      {uniqueLeft.length > 0 ? (
                        uniqueLeft.map(sp => (
                          <div key={sp} className="flex items-center gap-2 text-sm">
                            <span className="text-lg">{SPECIES_EMOJI[sp]}</span>
                            <span className="text-foreground">{sp}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground">Unikal növ yoxdur</p>
                      )}
                    </div>
                  </div>

                  {/* Unique to Vaccine 2 */}
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <p className="font-orbitron text-sm font-bold text-purple-400 mb-3">{selected[1].name.split(' ')[0]} TƏK ({uniqueRight.length})</p>
                    <div className="space-y-2">
                      {uniqueRight.length > 0 ? (
                        uniqueRight.map(sp => (
                          <div key={sp} className="flex items-center gap-2 text-sm">
                            <span className="text-lg">{SPECIES_EMOJI[sp]}</span>
                            <span className="text-foreground">{sp}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground">Unikal növ yoxdur</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Specifications Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="overflow-x-auto p-6 rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm"
              >
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-6">📋 Ətraflı Müqayisə</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 font-orbitron font-bold text-muted-foreground">XÜSUSİYYƏT</th>
                      <th className="text-left py-3 px-4 font-orbitron font-bold text-foreground">{selected[0].name}</th>
                      <th className="text-left py-3 px-4 font-orbitron font-bold text-foreground">{selected[1].name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-semibold text-foreground">Doz Forması</td>
                      <td className="py-3 px-4 text-gray-400">{selected[0].dosage_form || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-400">{selected[1].dosage_form || 'N/A'}</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-semibold text-foreground">Effektivlik Dərəcəsi</td>
                      <td className="py-3 px-4 text-gray-400">{selected[0].efficacy_rate ? `${selected[0].efficacy_rate}%` : 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-400">{selected[1].efficacy_rate ? `${selected[1].efficacy_rate}%` : 'N/A'}</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-semibold text-foreground">Qiymət (USD)</td>
                      <td className="py-3 px-4 text-gray-400">${selected[0].price?.toFixed(2) || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-400">${selected[1].price?.toFixed(2) || 'N/A'}</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-semibold text-foreground">Növ Əhatəsi</td>
                      <td className="py-3 px-4 text-gray-400">{selected[0].species?.length || 0} növ</td>
                      <td className="py-3 px-4 text-gray-400">{selected[1].species?.length || 0} növ</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 rounded-2xl bg-card/50 border border-primary/10"
            >
              <span className="text-6xl mb-4">🔄</span>
              <h3 className="font-orbitron text-xl font-bold text-foreground mb-2">Müqayisə Üçün İki Peyvənd Seçin</h3>
              <p className="text-muted-foreground text-center max-w-sm">
                Doza, effektivlik və növ əhatəsinin ətraflı müqayisəsini görmək üçün yuxarıdakı menyulardan iki peyvənd seçin.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}