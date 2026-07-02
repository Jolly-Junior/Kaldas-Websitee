import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ArrowUp, MessageSquare, Sparkles } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('');

  // 1. Initial premium loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // 2. Track scroll activities (progress + back to top)
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      
      // Toggle Back to Top button
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Coordinate dark mode application to document level
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 4. Smooth scroll-to-section navigation with custom offset
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of our fixed navigation
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // 5. Connect Treatment booking buttons
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    // Smoothly scroll to booking container
    setTimeout(() => {
      handleNavigate('booking');
    }, 100);
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div id="app-root" className={`min-h-screen ${darkMode ? 'dark bg-brand-green text-brand-ivory' : 'bg-brand-ivory text-brand-charcoal'} selection:bg-brand-gold selection:text-brand-green font-sans transition-colors duration-500`}>
      
      {/* Scroll Progress Bar */}
      <div 
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-1 bg-brand-gold z-55 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <AnimatePresence mode="wait">
        {isLoading ? (
          /* Premium Splash Screen Loader */
          <motion.div
            id="app-splash-loader"
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-55 bg-brand-green flex flex-col items-center justify-center text-brand-ivory"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4"
            >
              <span className="font-serif text-5xl md:text-6xl tracking-[0.2em] text-brand-gold">
                KALDĀS
              </span>
              <div className="flex items-center space-x-2 border-t border-brand-gold/30 pt-3">
                <Sparkles size={14} className="text-brand-gold animate-pulse" />
                <span className="font-sans text-xs tracking-[0.3em] text-brand-beige uppercase font-medium">
                  Beauty Atelier
                </span>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* Main Application Container */
          <motion.div
            id="main-app-content"
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header / Nav */}
            <Navigation 
              darkMode={darkMode} 
              toggleDarkMode={toggleDarkMode} 
              onNavigate={handleNavigate} 
            />

            {/* Visual Sections */}
            <main id="main-sections" className="relative">
              <Hero onNavigate={handleNavigate} />
              
              <Services onSelectService={handleSelectService} />
              
              <WhyChooseUs />
              
              <Gallery />
              
              <Testimonials />
              
              <Booking 
                selectedServiceId={selectedServiceId} 
                onSelectService={setSelectedServiceId} 
              />
              
              <Contact />
            </main>

            {/* Footer */}
            <Footer onNavigate={handleNavigate} />

            {/* Interactive Floating Helpers */}
            
            {/* 1. WhatsApp floating dispatch button */}
            <motion.a
              id="whatsapp-floating-btn"
              href="https://wa.me/4533124580?text=Hello!%20I%20am%2520interested%20in%20booking%20a%20luxury%20treatment%20at%20Kaldas%20Atelier."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-6 left-6 z-40 bg-brand-gold hover:bg-brand-accent-gold text-brand-green p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-brand-green/20"
              aria-label="Connect via WhatsApp"
            >
              <MessageSquare size={20} className="fill-brand-green" />
            </motion.a>

            {/* 2. Scroll Back to Top Floating button */}
            <AnimatePresence>
              {showBackToTop && (
                <motion.button
                  id="back-to-top-btn"
                  onClick={handleBackToTop}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="fixed bottom-6 right-6 z-40 glassmorphism text-brand-green dark:text-brand-gold hover:bg-brand-gold hover:text-brand-green p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-brand-gold/30"
                  aria-label="Back to Top"
                >
                  <ArrowUp size={18} />
                </motion.button>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
