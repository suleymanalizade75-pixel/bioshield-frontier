import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { useLang } from '@/lib/i18n';
import {
  ArrowLeft, ShoppingCart, Thermometer, Syringe,
  Shield, Clock, Package, Loader2, FileText
} from 'lucide-react';

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { t, lang } = useLang();
  const pd = t.product_detail;

  // Reset scroll position on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: vaccine, isLoading } = useQuery({
    queryKey: ['vaccine', id],
    queryFn: async () => {
      const list = await base44.entities.Vaccine.filter({ id });
      return list[0];
    },
    enabled: !!id,
  });

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('bioshield_cart') || '[]');
    const existing = cart.find(item => item.id === vaccine.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...vaccine, quantity });
    }
    localStorage.setItem('bioshield_cart', JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const timelineSteps = [
    { day: 0, pct: 0 },
    { day: 7, pct: 30 },
    { day: 14, pct: 65 },
    { day: 30, pct: 90 },
    { day: vaccine?.immunity_days || 60, pct: vaccine?.efficacy_rate || 97 },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!vaccine) {
    return (
      <div className="min-h-screen bg-background font-inter">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
          <p className="text-muted-foreground font-mono text-sm tracking-widest">{pd.notFound}</p>
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-xs tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            {pd.backToPortfolio}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs tracking-widest">{pd.backToPortfolio}</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Image & Document Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass rounded-2xl overflow-hidden aspect-square flex items-center justify-center mb-6">
                {vaccine.image_url ? (
                  <img src={vaccine.image_url} alt={vaccine.name} className="w-full h-full object-cover" />
                ) : (
                  <Syringe className="w-24 h-24 text-muted-foreground/20" />
                )}
              </div>

              {/* Document Buttons Grid */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/257824f37_1Presentation_EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-pulse flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-all duration-300 font-orbitron text-xs tracking-widest font-bold"
                >
                  <FileText className="w-4 h-4" />
                  {pd.presentation}
                  </a>
                  <details className="glow-pulse group">
                  <summary className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-all duration-300 font-orbitron text-xs tracking-widest font-bold cursor-pointer list-none">
                   <FileText className="w-4 h-4" />
                   {pd.taqdimat}
                  </summary>
                  <div className="absolute bg-card border border-primary/50 rounded-lg p-2 mt-2 z-50 w-56 shadow-lg">
                   <a
                     href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/f94438054_2Presentation_Az.pdf"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block px-3 py-2 text-xs text-primary hover:bg-primary/10 rounded transition-colors"
                   >
                     {pd.taqdimatOld}
                   </a>
                   <a
                     href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/22fab22e9_FirstDefenseTri-ShieldSlides_AZ.pdf"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block px-3 py-2 text-xs text-primary hover:bg-primary/10 rounded transition-colors"
                   >
                     {pd.taqdimatNew}
                   </a>
                  </div>
                  </details>
                  {vaccine.code === 'FD-001' ? (
                    <a
                      href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/c017cb6aa_10PreparatnildilmdindairtlimatFirstDefenceBolus.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-pulse flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-all duration-300 font-orbitron text-xs tracking-widest font-bold"
                    >
                      <FileText className="w-4 h-4" />
                      {pd.instructions}
                    </a>
                  ) : (
                    <a
                      href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/2f4d99387_4Instructions_AZ.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-pulse flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-all duration-300 font-orbitron text-xs tracking-widest font-bold"
                    >
                      <FileText className="w-4 h-4" />
                      {pd.instructions}
                    </a>
                  )}
                  <details className="glow-pulse group">
                  <summary className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition-all duration-300 font-orbitron text-xs tracking-widest font-bold cursor-pointer list-none">
                   <FileText className="w-4 h-4" />
                   {pd.certificates}
                  </summary>
                  <div className="absolute bg-card border border-primary/50 rounded-lg p-2 mt-2 z-50 w-48 shadow-lg">
                   <a
                     href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/b3f982dd7_Tri-ShieldUSDALicenseSertifikat.pdf"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block px-3 py-2 text-xs text-primary hover:bg-primary/10 rounded transition-colors"
                   >
                     {pd.usdaLicense}
                   </a>
                   <a
                     href="https://media.base44.com/files/public/69fe23b93c8a4ad0ed092450/1de96e7ce_CanadaCFIAImportPermit2023Sertifikat.pdf"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block px-3 py-2 text-xs text-primary hover:bg-primary/10 rounded transition-colors"
                   >
                     {pd.canadaPermit}
                   </a>
                  </div>
                  </details>
              </div>
            </motion.div>

            {/* Right - Details */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="font-mono text-[10px] tracking-[3px] bg-primary/10 text-primary border-primary/20 mb-4">
                {vaccine.species?.toUpperCase()}
              </Badge>
              <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                {vaccine.name}
              </h1>
              <p className="font-inter text-muted-foreground leading-relaxed mb-8">
                {(pd.vaccineDescriptions && pd.vaccineDescriptions[vaccine.code]) || vaccine.description || `Advanced protection against ${vaccine.disease || 'target pathogens'}. Clinically proven with ${vaccine.efficacy_rate || 95}% efficacy rate.`}
              </p>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                   { icon: Syringe, label: pd.dosage, value: vaccine.dosage || '2ml IM' },
                   { icon: Thermometer, label: pd.storage, value: vaccine.storage_temp || '2-8°C' },
                   { icon: Shield, label: pd.efficacy, value: `${vaccine.efficacy_rate || 95}%` },
                   { icon: Clock, label: pd.immunity, value: `${vaccine.immunity_days || 14} ${pd.days}` },
                   { icon: Package, label: pd.packSize, value: `${vaccine.units_per_pack || 10} ${pd.doses}` },
                 ].map((spec) => (
                  <div key={spec.label} className="glass rounded-lg p-4">
                    <spec.icon className="w-4 h-4 text-primary mb-2" />
                    <div className="font-mono text-[9px] tracking-[3px] text-muted-foreground">{spec.label}</div>
                    <div className="font-orbitron text-sm font-bold text-foreground">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="glass rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground tracking-widest">{pd.unitPrice}</div>
                    <div className="font-orbitron text-3xl font-bold text-foreground">AZN {vaccine.price}</div>
                  </div>
                </div>

                {/* Quantity & Cart */}
                <div className="mb-4">
                  <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-3">{pd.quantity}</div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg bg-secondary text-foreground flex items-center justify-center font-bold hover:bg-secondary/80 transition-colors"
                    >
                      −
                    </button>
                    <span className="font-orbitron text-lg font-bold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg bg-secondary text-foreground flex items-center justify-center font-bold hover:bg-secondary/80 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className={`w-full font-orbitron text-xs tracking-widest py-6 rounded-lg transition-all ${
                    addedToCart
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-primary text-primary-foreground glow-pulse hover:bg-primary/90'
                  }`}
                >
                  <ShoppingCart className="mr-2 w-4 h-4" />
                  {addedToCart ? pd.addedToCart : pd.addToCart}
                </Button>
              </div>

              {/* Protection Timeline */}
              <div>
                <h3 className="font-orbitron text-sm font-bold text-foreground mb-4 tracking-wide">
                  {pd.immunityBuildUp}
                </h3>
                <div className="space-y-3">
                  {timelineSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="font-mono text-[10px] text-muted-foreground w-16">{pd.day} {step.day}</div>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${step.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.2, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                        />
                      </div>
                      <div className="font-mono text-xs text-primary w-10 text-right">{step.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}