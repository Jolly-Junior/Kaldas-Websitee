import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ darkMode, toggleDarkMode, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center glass-nav ${
          isScrolled 
            ? 'shadow-md border-b border-brand-gold/25 bg-white/50 dark:bg-brand-green/60' 
            : 'shadow-xs border-b border-brand-gold/15'
        }`}
      >
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <button 
            id="nav-logo"
            onClick={() => handleItemClick('home')} 
            className="flex items-center space-x-2 text-left cursor-pointer group"
          >
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-brand-gold dark:text-brand-gold group-hover:text-brand-beige transition-colors duration-300">
              KALDĀS
            </span>
            <div className="flex flex-col border-l border-brand-gold/30 pl-2 leading-none">
              <span className="font-sans text-[10px] tracking-widest text-brand-gold uppercase font-semibold">
                BEAUTY ATELIER
              </span>
              <span className="font-sans text-[8px] tracking-[0.15em] text-brand-beige dark:text-brand-beige uppercase font-light">
                EST. 2011
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <div className="flex space-x-8">
              {menuItems.map((item) => (
                <button
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="font-sans text-sm tracking-wide font-medium text-brand-gold dark:text-brand-gold hover:text-brand-beige dark:hover:text-brand-beige cursor-pointer transition-colors duration-300 relative py-1 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Dark Mode and CTA */}
            <div className="flex items-center space-x-6 border-l border-brand-gold/30 pl-6">
              <button
                id="desktop-dark-toggle"
                onClick={toggleDarkMode}
                className="text-brand-gold dark:text-brand-gold hover:text-brand-beige dark:hover:text-brand-beige p-2 rounded-full cursor-pointer transition-colors duration-300"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={19} /> : <Moon size={19} />}
              </button>

              <button
                id="desktop-book-btn"
                onClick={() => handleItemClick('booking')}
                className="bg-brand-gold hover:bg-brand-beige text-brand-green font-sans text-xs tracking-widest uppercase font-semibold px-6 py-3 rounded-full shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              id="mobile-dark-toggle"
              onClick={toggleDarkMode}
              className="text-brand-gold dark:text-brand-gold hover:text-brand-beige p-2 rounded-full cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-gold dark:text-brand-gold hover:text-brand-beige p-2 focus:outline-hidden cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-brand-ivory dark:bg-brand-green pt-28 px-8 flex flex-col justify-between pb-10 lg:hidden"
          >
            <div className="flex flex-col space-y-6">
              {menuItems.map((item, index) => (
                <motion.button
                  id={`mobile-nav-link-${item.id}`}
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleItemClick(item.id)}
                  className="font-serif text-3xl font-medium text-left text-brand-green dark:text-brand-ivory hover:text-brand-gold dark:hover:text-brand-gold cursor-pointer py-2 border-b border-brand-charcoal/10 dark:border-brand-ivory/10"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col space-y-4">
              <button
                id="mobile-book-btn"
                onClick={() => handleItemClick('booking')}
                className="w-full text-center bg-brand-green dark:bg-brand-gold text-brand-ivory dark:text-brand-green hover:bg-brand-gold dark:hover:bg-brand-ivory font-sans text-sm tracking-widest uppercase font-semibold py-4 rounded-full transition-all duration-300"
              >
                Book Appointment
              </button>
              
              <div className="text-center text-xs tracking-wider text-brand-charcoal/40 dark:text-brand-ivory/40 uppercase">
                Kaldas Beauty Atelier
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
