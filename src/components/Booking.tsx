import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, Ticket, Printer, CalendarPlus } from 'lucide-react';

interface BookingProps {
  selectedServiceId: string;
  onSelectService: (serviceId: string) => void;
}

export default function Booking({ selectedServiceId, onSelectService }: BookingProps) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('11:00 AM');
  const [bookingNotes, setBookingNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingError, setBookingError] = useState('');
  
  const timeSlots = [
    '09:00 AM',
    '11:05 AM', // dynamic slot or keep standard
    '01:00 PM',
    '03:00 PM',
    '05:00 PM',
    '06:30 PM'
  ];

  // Adjust standard slots list or keep
  const standardSlots = [
    '09:00 AM',
    '11:00 AM',
    '01:00 PM',
    '03:00 PM',
    '05:00 PM',
    '06:30 PM'
  ];

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !selectedServiceId || !bookingDate) {
      setBookingError('Please fill in all required fields to secure your reservation.');
      return;
    }
    setBookingError('');
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setBookingDate('');
    setBookingTime('11:00 AM');
    setBookingNotes('');
    onSelectService('');
  };

  const selectedService = SERVICES.find(s => s.id === selectedServiceId);

  return (
    <section
      id="booking"
      className="py-24 md:py-32 bg-brand-beige/25 dark:bg-brand-green/10 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div id="booking-header" className="text-center mb-16 max-w-2xl mx-auto">
          <span className="font-sans text-xs md:text-sm tracking-[0.25em] text-brand-accent-gold uppercase font-bold mb-4 block">
            SECURE YOUR VISIT
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-brand-green dark:text-brand-ivory mb-6">
            Your Beauty Journey <br />
            <span className="italic font-light text-brand-gold">Starts</span> Here
          </h2>
          <p className="font-sans text-brand-charcoal/70 dark:text-brand-ivory/70 font-light leading-relaxed">
            Select your signature ritual, choose a matching slot, and let our European trained specialists 
            reframe your natural elegance.
          </p>
        </div>

        {/* Dynamic Card Container */}
        <div className="glassmorphism rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-gold" />
          <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {!isBooked ? (
              <motion.form
                id="booking-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleBookingSubmit}
                className="space-y-6"
              >
                {/* Error Banner */}
                {bookingError && (
                  <div id="booking-error-banner" className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 font-sans text-xs font-semibold">
                    {bookingError}
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase font-semibold text-brand-charcoal/80 dark:text-brand-ivory/80 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gold" size={16} />
                      <input
                        id="book-name-input"
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Elena Vestergaard"
                        className="w-full bg-brand-beige/25 dark:bg-white/5 border border-brand-charcoal/10 dark:border-brand-ivory/15 focus:border-brand-gold dark:focus:border-brand-gold outline-hidden text-brand-charcoal dark:text-brand-ivory rounded-xl pl-12 pr-4 py-3.5 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase font-semibold text-brand-charcoal/80 dark:text-brand-ivory/80 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gold" size={16} />
                      <input
                        id="book-phone-input"
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-brand-beige/25 dark:bg-white/5 border border-brand-charcoal/10 dark:border-brand-ivory/15 focus:border-brand-gold dark:focus:border-brand-gold outline-hidden text-brand-charcoal dark:text-brand-ivory rounded-xl pl-12 pr-4 py-3.5 text-sm transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase font-semibold text-brand-charcoal/80 dark:text-brand-ivory/80 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gold" size={16} />
                      <input
                        id="book-email-input"
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="elena@vestergaard.com"
                        className="w-full bg-brand-beige/25 dark:bg-white/5 border border-brand-charcoal/10 dark:border-brand-ivory/15 focus:border-brand-gold dark:focus:border-brand-gold outline-hidden text-brand-charcoal dark:text-brand-ivory rounded-xl pl-12 pr-4 py-3.5 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Dropdown Selector */}
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase font-semibold text-brand-charcoal/80 dark:text-brand-ivory/80 mb-2">
                      Signature Treatment *
                    </label>
                    <select
                      id="book-service-select"
                      required
                      value={selectedServiceId}
                      onChange={(e) => onSelectService(e.target.value)}
                      className="w-full bg-brand-beige/25 dark:bg-brand-green/80 border border-brand-charcoal/10 dark:border-brand-ivory/15 focus:border-brand-gold dark:focus:border-brand-gold outline-hidden text-brand-charcoal dark:text-brand-ivory rounded-xl px-4 py-3.5 text-sm transition-colors"
                    >
                      <option value="" className="text-brand-charcoal bg-brand-ivory">-- Choose a Treatment --</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id} className="text-brand-charcoal bg-brand-ivory">
                          {s.name} ({s.price})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase font-semibold text-brand-charcoal/80 dark:text-brand-ivory/80 mb-2">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-gold" size={16} />
                      <input
                        id="book-date-input"
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-brand-beige/25 dark:bg-white/5 border border-brand-charcoal/10 dark:border-brand-ivory/15 focus:border-brand-gold dark:focus:border-brand-gold outline-hidden text-brand-charcoal dark:text-brand-ivory rounded-xl pl-12 pr-4 py-3.5 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Time Slot Picker */}
                  <div>
                    <label className="block font-sans text-xs tracking-wider uppercase font-semibold text-brand-charcoal/80 dark:text-brand-ivory/80 mb-2">
                      Preferred Time Slot *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          id={`time-slot-btn-${slot.replace(/\s+/g, '-').toLowerCase()}`}
                          key={slot}
                          type="button"
                          onClick={() => setBookingTime(slot)}
                          className={`py-2 px-1 rounded-lg text-xs font-sans tracking-wide font-semibold border cursor-pointer transition-all duration-300 ${
                            bookingTime === slot
                              ? 'bg-brand-green dark:bg-brand-gold text-brand-ivory dark:text-brand-green border-transparent'
                              : 'bg-brand-beige/25 dark:bg-white/5 text-brand-charcoal/70 dark:text-brand-ivory/75 border-brand-charcoal/10 dark:border-brand-ivory/10 hover:border-brand-gold'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-sans text-xs tracking-wider uppercase font-semibold text-brand-charcoal/80 dark:text-brand-ivory/80 mb-2">
                    Special Inquiries or Requests (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 text-brand-gold" size={16} />
                    <textarea
                      id="book-notes-input"
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder="e.g. skin allergies, preferred stylist, or custom lash preferences..."
                      rows={3}
                      className="w-full bg-brand-beige/25 dark:bg-white/5 border border-brand-charcoal/10 dark:border-brand-ivory/15 focus:border-brand-gold dark:focus:border-brand-gold outline-hidden text-brand-charcoal dark:text-brand-ivory rounded-xl pl-12 pr-4 py-3.5 text-sm transition-colors"
                    />
                  </div>
                </div>

                <button
                  id="booking-submit-btn"
                  type="submit"
                  className="w-full bg-brand-green dark:bg-brand-gold hover:bg-brand-accent-gold dark:hover:bg-brand-ivory text-brand-ivory dark:text-brand-green hover:text-brand-ivory dark:hover:text-brand-green font-sans text-xs tracking-widest uppercase font-bold py-4.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
                >
                  Book Secure Appointment
                </button>
              </motion.form>
            ) : (
              /* Receipt View (Apple Ticket aesthetic) */
              <motion.div
                id="booking-success-receipt"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-brand-gold/15 dark:bg-brand-gold/25 text-brand-gold rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
                </div>
                
                <span className="font-sans text-[10px] tracking-widest text-brand-accent-gold uppercase font-bold mb-2">
                  CONFIRMATION PASS
                </span>
                
                <h3 className="font-serif text-3xl font-normal text-brand-green dark:text-brand-ivory mb-6">
                  Reservation Secured!
                </h3>

                {/* Ticket Body */}
                <div className="w-full max-w-md bg-brand-beige/10 dark:bg-white/5 border border-brand-gold/25 rounded-2xl p-6 md:p-8 text-left space-y-4 relative mb-10 shadow-xs">
                  {/* Decorative cutouts for ticket aesthetic */}
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white dark:bg-brand-green rounded-full border border-brand-charcoal/5 dark:border-transparent" />
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white dark:bg-brand-green rounded-full border border-brand-charcoal/5 dark:border-transparent" />

                  <div className="flex justify-between border-b border-brand-charcoal/10 dark:border-brand-ivory/10 pb-4">
                    <div>
                      <span className="font-sans text-[9px] tracking-wider text-brand-charcoal/40 dark:text-brand-ivory/45 uppercase block">CLIENT</span>
                      <strong className="font-sans text-sm font-semibold text-brand-green dark:text-brand-ivory">{clientName}</strong>
                    </div>
                    <div className="text-right">
                      <span className="font-sans text-[9px] tracking-wider text-brand-charcoal/40 dark:text-brand-ivory/45 uppercase block">CONFIRMATION #</span>
                      <strong className="font-mono text-sm font-semibold text-brand-gold">KB-{Math.floor(100000 + Math.random() * 900000)}</strong>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <span className="font-sans text-[9px] tracking-wider text-brand-charcoal/40 dark:text-brand-ivory/45 uppercase block">TREATMENT</span>
                      <span className="font-sans text-sm font-medium text-brand-green dark:text-brand-ivory">{selectedService?.name || 'Signature Treatment'}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-sans text-[9px] tracking-wider text-brand-charcoal/40 dark:text-brand-ivory/45 uppercase block">INVESTMENT</span>
                      <span className="font-sans text-sm font-semibold text-brand-gold">{selectedService?.price || '$120 - $350'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="font-sans text-[9px] tracking-wider text-brand-charcoal/40 dark:text-brand-ivory/45 uppercase block">DATE</span>
                      <span className="font-sans text-sm font-medium text-brand-green dark:text-brand-ivory">{bookingDate}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-sans text-[9px] tracking-wider text-brand-charcoal/40 dark:text-brand-ivory/45 uppercase block">RESERVED TIME</span>
                      <span className="font-sans text-sm font-medium text-brand-green dark:text-brand-ivory">{bookingTime}</span>
                    </div>
                  </div>

                  {bookingNotes && (
                    <div className="border-t border-brand-charcoal/10 dark:border-brand-ivory/10 pt-4">
                      <span className="font-sans text-[9px] tracking-wider text-brand-charcoal/40 dark:text-brand-ivory/45 uppercase block">NOTES</span>
                      <p className="font-sans text-xs text-brand-charcoal/70 dark:text-brand-ivory/70 leading-relaxed font-light mt-1 italic">
                        "{bookingNotes}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Floating Micro CTAs */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full justify-center">
                  <button
                    id="receipt-print-btn"
                    onClick={() => window.print()}
                    className="flex items-center justify-center space-x-2 border border-brand-green/35 dark:border-brand-ivory/35 hover:border-brand-gold text-brand-green dark:text-brand-ivory hover:text-brand-gold bg-transparent font-sans text-xs tracking-widest uppercase font-bold px-6 py-3 rounded-full transition-colors cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>Print Confirmation</span>
                  </button>

                  <button
                    id="receipt-calendar-btn"
                    onClick={() => alert('Appointment added to your system Calendar.')}
                    className="flex items-center justify-center space-x-2 bg-brand-green dark:bg-brand-gold text-brand-ivory dark:text-brand-green hover:bg-brand-gold dark:hover:bg-brand-ivory font-sans text-xs tracking-widest uppercase font-bold px-6 py-3 rounded-full transition-all duration-300 cursor-pointer"
                  >
                    <CalendarPlus size={14} />
                    <span>Add to Calendar</span>
                  </button>
                </div>

                <button
                  id="receipt-reset-btn"
                  onClick={handleReset}
                  className="mt-8 text-xs font-sans tracking-widest text-brand-charcoal/50 dark:text-brand-ivory/50 uppercase font-bold hover:text-brand-gold dark:hover:text-brand-gold cursor-pointer underline"
                >
                  Book Another Appointment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
