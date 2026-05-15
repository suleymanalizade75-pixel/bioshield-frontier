import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { useLang } from '@/lib/i18n';
import {
  ArrowLeft, Trash2, ShoppingCart, Snowflake,
  Minus, Plus, CheckCircle2
} from 'lucide-react';

export default function Cart() {
  const { lang } = useLang();
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bioshield_cart') || '[]');
    setCartItems(stored);
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem('bioshield_cart', JSON.stringify(items));
  };

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    updateCart(updated);
  };

  const removeItem = (id) => {
    updateCart(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleOrder = () => {
    setOrderPlaced(true);
    localStorage.setItem('bioshield_cart', '[]');
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar cartCount={cartItems.length} />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs tracking-widest">{lang === 'EN' ? 'BACK TO PORTFOLIO' : lang === 'AZ' ? 'PORTFELƏ QAYIT' : 'ВЕРНУТЬСЯ К ПОРТФЕЛЮ'}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
              {lang === 'EN' ? 'SUPPLY ORDER' : lang === 'AZ' ? 'TƏZMİNAT SİFARİŞİ' : 'ЗАКАЗ ПОСТАВКИ'}
            </h1>
            <div className="font-mono text-[10px] tracking-[4px] text-muted-foreground mb-10">
              {lang === 'EN' ? 'COMMAND CENTER — CART' : lang === 'AZ' ? 'KOMANDA MƏRKƏZİ — SƏBƏT' : 'ЦЕНТР УПРАВЛЕНИЯ — КОРЗИНА'}
            </div>
          </motion.div>

          {orderPlaced ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-12 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-orbitron text-xl font-bold text-foreground mb-3">{lang === 'EN' ? 'ORDER CONFIRMED' : lang === 'AZ' ? 'SİFARİŞ TƏSDİQLƏNDİ' : 'ЗАКАЗ ПОДТВЕРЖДЁН'}</h2>
              <p className="font-inter text-muted-foreground mb-6">
                {lang === 'EN' ? 'Your supply order has been submitted. Cold-chain logistics are being arranged.' : lang === 'AZ' ? 'Sizin təzmiqat sifarişiniz göndərilmişdir. Soyuq zəncir logistikası təşkil olunur.' : 'Ваш заказ поставки отправлен. Организуется холодовая цепь логистики.'}
              </p>
              <Link to="/">
                <Button className="font-orbitron text-xs tracking-widest bg-primary text-primary-foreground px-8 py-5">
                  {lang === 'EN' ? 'RETURN TO PORTFOLIO' : lang === 'AZ' ? 'PORTFELƏ QAYIT' : 'ВЕРНУТЬСЯ К ПОРТФЕЛЮ'}
                </Button>
              </Link>
            </motion.div>
          ) : cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-12 text-center"
            >
              <ShoppingCart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-inter text-muted-foreground mb-6">{lang === 'EN' ? 'No items in your supply order.' : lang === 'AZ' ? 'Təzmiqat sifarişində heç bir məhsul yoxdur.' : 'В вашем заказе нет товаров.'}</p>
              <Link to="/">
                <Button className="font-orbitron text-xs tracking-widest bg-primary text-primary-foreground px-8 py-5">
                  {lang === 'EN' ? 'EXPLORE VACCINES' : lang === 'AZ' ? 'PEYVƏNDLƏRI ARAŞDIR' : 'ИЗУЧИТЬ ВАКЦИНЫ'}
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="glass rounded-xl p-5 flex items-center gap-5"
                    >
                      <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingCart className="w-6 h-6 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[9px] tracking-[3px] text-primary">{item.species?.toUpperCase()}</div>
                        <h3 className="font-orbitron text-sm font-bold text-foreground truncate">{item.name}</h3>
                        <div className="font-mono text-xs text-muted-foreground">${item.price?.toFixed(2)} / unit</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded bg-secondary flex items-center justify-center hover:bg-secondary/80"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-orbitron text-sm font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded bg-secondary flex items-center justify-center hover:bg-secondary/80"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="font-orbitron text-sm font-bold text-foreground w-20 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Summary */}
              <div>
                <div className="glass rounded-xl p-6 sticky top-28">
                  <h3 className="font-orbitron text-sm font-bold text-foreground tracking-wide mb-6">
                    {lang === 'EN' ? 'ORDER SUMMARY' : lang === 'AZ' ? 'SİFARİŞ XÜLASƏSI' : 'ИТОГОВАЯ СВОДКА'}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{lang === 'EN' ? 'Subtotal' : lang === 'AZ' ? 'Ara cəmi' : 'Подитог'}</span>
                      <span className="text-foreground font-medium">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{lang === 'EN' ? 'Cold-Chain Shipping' : lang === 'AZ' ? 'Soyuq Zəncir Göndərişi' : 'Доставка холодовой цепи'}</span>
                      <span className="text-primary font-medium">{lang === 'EN' ? 'Calculated at checkout' : lang === 'AZ' ? 'Ödəmə zamanı hesablanır' : 'Рассчитывается при оформлении'}</span>
                    </div>
                    <div className="border-t border-border/50 pt-3 flex justify-between">
                      <span className="font-orbitron text-sm font-bold text-foreground">{lang === 'EN' ? 'TOTAL' : lang === 'AZ' ? 'CƏMI' : 'ИТОГО'}</span>
                      <span className="font-orbitron text-xl font-bold text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Cold-Chain badge */}
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10 mb-6">
                    <Snowflake className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-mono text-[10px] text-primary tracking-wider">
                      {lang === 'EN' ? 'COLD-CHAIN GUARANTEE — 2-8°C TRANSIT' : lang === 'AZ' ? 'SOYUQ ZƏNCİR ZƏMANƏTİ — 2-8°C TRANZIT' : 'ГАРАНТИЯ ХОЛОДОВОЙ ЦЕПИ — 2-8°C ТРАНЗИТ'}
                    </span>
                  </div>

                  <Button
                    onClick={handleOrder}
                    className="w-full font-orbitron text-xs tracking-widest bg-primary text-primary-foreground py-6 glow-pulse hover:bg-primary/90"
                  >
                    {lang === 'EN' ? 'PLACE SUPPLY ORDER' : lang === 'AZ' ? 'TƏZMİNAT SİFARİŞİNİ VERİN' : 'РАЗМЕСТИТЬ ЗАКАЗ ПОСТАВКИ'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}