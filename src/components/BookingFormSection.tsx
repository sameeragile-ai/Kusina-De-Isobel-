import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Phone, Mail, User, Clock, Utensils, Send, CheckCircle2 } from 'lucide-react';

interface FormState {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: string;
  enquiryType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  time?: string;
}

export const BookingFormSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '12:00',
    partySize: '2 people',
    enquiryType: 'Table Booking',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address for confirmation';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a preferred time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * HANDLESUBMIT: Front-end reservation handler.
   * To connect to an email or webhook service later (e.g. Resend, EmailJS, Formspree, Twilio),
   * simply send formData to your endpoint here.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable dispatch
    await new Promise(resolve => setTimeout(resolve, 1100));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '12:00',
      partySize: '2 people',
      enquiryType: 'Table Booking',
      message: '',
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <section
      id="booking"
      className="relative py-24 sm:py-32 wall-gradient-panel text-[#F7F1E3] overflow-hidden"
      aria-labelledby="booking-heading"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8FCFB0]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0E3B2E] rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D9A441]/40 bg-black/40 text-xs font-mono text-[#F6DC8E] uppercase tracking-widest mb-3">
            <span>05</span>
            <span>·</span>
            <span>Table Reservations & Enquiries</span>
          </div>

          <h2 id="booking-heading" className="font-heading text-4xl sm:text-6xl text-[#F7F1E3] tracking-tight">
            Save Your Seat.
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#F7F1E3]/85 max-w-xl mx-auto">
            Book a table for breakfast, lunch, or our evening grill and sharing feast.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="rounded-3xl bg-[#121A16]/95 border border-[#D9A441]/35 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 sm:py-12 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#8FCFB0]/20 border-2 border-[#8FCFB0] flex items-center justify-center text-[#D8F26A] mb-5">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <h3 className="font-heading text-3xl sm:text-4xl text-[#F6DC8E] mb-2">
                  Table Request Received!
                </h3>

                <p className="text-sm sm:text-base text-[#F7F1E3]/85 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. We have noted your request for{' '}
                  <strong className="text-[#8FCFB0]">{formData.partySize}</strong> on{' '}
                  <strong className="text-[#8FCFB0]">{formData.date} at {formData.time}</strong>.
                  We’ll confirm your seat via phone or email shortly!
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-[#8FCFB0] font-mono mb-8 max-w-sm w-full text-left space-y-1">
                  <div>Type: {formData.enquiryType}</div>
                  <div>Phone: {formData.phone}</div>
                  <div>Email: {formData.email}</div>
                  {formData.message && <div>Note: &ldquo;{formData.message}&rdquo;</div>}
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-brass-gradient text-[#121A16] font-semibold text-sm hover:opacity-95 transition-opacity"
                >
                  Make Another Reservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-name" className="text-xs font-semibold uppercase tracking-wider text-[#F6DC8E] mb-2 flex items-center gap-1.5 font-mono">
                      <User className="w-3.5 h-3.5" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/15 text-[#F7F1E3] placeholder-white/30 text-base focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] focus:outline-none transition-all"
                    />
                    {errors.name && <span className="text-xs text-[#FF8E8E] mt-1.5 font-medium">{errors.name}</span>}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-phone" className="text-xs font-semibold uppercase tracking-wider text-[#F6DC8E] mb-2 flex items-center gap-1.5 font-mono">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact Phone *</span>
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      placeholder="e.g. 07747 123456"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/15 text-[#F7F1E3] placeholder-white/30 text-base focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] focus:outline-none transition-all"
                    />
                    {errors.phone && <span className="text-xs text-[#FF8E8E] mt-1.5 font-medium">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col sm:col-span-2">
                    <label htmlFor="booking-email" className="text-xs font-semibold uppercase tracking-wider text-[#F6DC8E] mb-2 flex items-center gap-1.5 font-mono">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      placeholder="e.g. eleanor@example.co.uk"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/15 text-[#F7F1E3] placeholder-white/30 text-base focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] focus:outline-none transition-all"
                    />
                    {errors.email && <span className="text-xs text-[#FF8E8E] mt-1.5 font-medium">{errors.email}</span>}
                  </div>

                  {/* Date */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-date" className="text-xs font-semibold uppercase tracking-wider text-[#F6DC8E] mb-2 flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Date *</span>
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/15 text-[#F7F1E3] text-base focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] focus:outline-none transition-all"
                    />
                    {errors.date && <span className="text-xs text-[#FF8E8E] mt-1.5 font-medium">{errors.date}</span>}
                  </div>

                  {/* Time */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-time" className="text-xs font-semibold uppercase tracking-wider text-[#F6DC8E] mb-2 flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Time *</span>
                    </label>
                    <input
                      id="booking-time"
                      type="time"
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/15 text-[#F7F1E3] text-base focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] focus:outline-none transition-all"
                    />
                    {errors.time && <span className="text-xs text-[#FF8E8E] mt-1.5 font-medium">{errors.time}</span>}
                  </div>

                  {/* Party Size */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-size" className="text-xs font-semibold uppercase tracking-wider text-[#F6DC8E] mb-2 flex items-center gap-1.5 font-mono">
                      <Users className="w-3.5 h-3.5" />
                      <span>Party Size</span>
                    </label>
                    <select
                      id="booking-size"
                      value={formData.partySize}
                      onChange={e => setFormData({ ...formData, partySize: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#18231E] border border-white/15 text-[#F7F1E3] text-base focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] focus:outline-none transition-all"
                    >
                      <option value="1 person">1 person</option>
                      <option value="2 people">2 people</option>
                      <option value="3 people">3 people</option>
                      <option value="4 people">4 people</option>
                      <option value="5-6 people">5–6 people</option>
                      <option value="7+ people (Large Group)">7+ people (Large Group)</option>
                    </select>
                  </div>

                  {/* Enquiry Type */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-enquiry" className="text-xs font-semibold uppercase tracking-wider text-[#F6DC8E] mb-2 flex items-center gap-1.5 font-mono">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Enquiry Type</span>
                    </label>
                    <select
                      id="booking-enquiry"
                      value={formData.enquiryType}
                      onChange={e => setFormData({ ...formData, enquiryType: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#18231E] border border-white/15 text-[#F7F1E3] text-base focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] focus:outline-none transition-all"
                    >
                      <option value="Table Booking">Standard Table Booking</option>
                      <option value="Sharing Platter">Sharing Platter (Thu, Fri, Sat)</option>
                      <option value="Private Celebration">Private Celebration / Party</option>
                    </select>
                  </div>
                </div>

                {/* Message / Dietary */}
                <div className="flex flex-col">
                  <label htmlFor="booking-message" className="text-xs font-semibold uppercase tracking-wider text-[#F6DC8E] mb-2 font-mono">
                    Special Requests or Dietary Requirements (Optional)
                  </label>
                  <textarea
                    id="booking-message"
                    rows={3}
                    placeholder="Let us know if you need high chairs, have allergies, or are celebrating a special occasion..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-[#F7F1E3] placeholder-white/30 text-base focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl font-bold text-base text-[#121A16] bg-brass-gradient shadow-lg hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#121A16] border-t-transparent rounded-full animate-spin" />
                      <span>Securing Your Request...</span>
                    </div>
                  ) : (
                    <>
                      <span>Submit Table Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[#8FCFB0]/70 font-sans">
                  We reply promptly. For same-day tables within 2 hours, call us directly on{' '}
                  <a href="tel:+447747223705" className="text-[#F6DC8E] font-medium underline">
                    +44 7747 223705
                  </a>.
                </p>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
