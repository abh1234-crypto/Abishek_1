'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gamingLaptop: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://abishek-1-ffi0.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', age: '', gamingLaptop: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to transmit message.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Communication blackout. Please check your uplink.');
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <div className="section-divider-space" />
          </div>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white uppercase tracking-widest text-shadow-glow">
            Let&apos;s Connect
          </h2>
          <p className="font-rajdhani font-bold tracking-[0.4em] text-cyan uppercase mt-4 text-sm">
            Establish a Direct Uplink
          </p>
        </motion.div>

        {/* Contact Form Box */}
        <motion.div
          className="glass-space p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl bg-void/80 backdrop-blur-xl relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Neon corner accents */}
          <div className="absolute top-0 left-0 w-12 h-1 bg-cyan shadow-cyan-glow" />
          <div className="absolute bottom-0 right-0 w-12 h-1 bg-nebula shadow-nebula-glow" />

          {status === 'success' ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="font-orbitron font-black text-2xl text-white mb-4 uppercase">Transmission Received!</h3>
              <p className="font-inter text-gray-400 max-w-sm mx-auto">
                Your message has been beamed across the cosmic void. I will respond to your uplink shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-10 font-rajdhani font-bold text-xs tracking-[0.3em] uppercase text-cyan border border-cyan/30 px-8 py-3 rounded-full hover:bg-cyan/10 transition-all"
              >
                Send Another Signal
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="relative group">
                  <label className="block font-rajdhani font-bold text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-2 transition-colors group-focus-within:text-cyan">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-void/50 border border-gray-800 rounded-lg px-4 py-4 font-inter text-white outline-none focus:border-cyan transition-all shadow-inner"
                    placeholder="Enter your name..."
                  />
                </div>

                {/* Age */}
                <div className="relative group">
                  <label className="block font-rajdhani font-bold text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-2 transition-colors group-focus-within:text-cyan">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full bg-void/50 border border-gray-800 rounded-lg px-4 py-4 font-inter text-white outline-none focus:border-cyan transition-all shadow-inner"
                    placeholder="E.g. 24"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gaming Laptop */}
                <div className="relative group">
                  <label className="block font-rajdhani font-bold text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-2 transition-colors group-focus-within:text-nebula">
                    Gaming Laptop / Specs
                  </label>
                  <input
                    type="text"
                    name="gamingLaptop"
                    required
                    value={formData.gamingLaptop}
                    onChange={handleChange}
                    className="w-full bg-void/50 border border-gray-800 rounded-lg px-4 py-4 font-inter text-white outline-none focus:border-nebula transition-all shadow-inner"
                    placeholder="E.g. RTX 4080 Super / ASUS Strix"
                  />
                </div>

                {/* Subject */}
                <div className="relative group">
                  <label className="block font-rajdhani font-bold text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-2 transition-colors group-focus-within:text-nebula">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-void/50 border border-gray-800 rounded-lg px-4 py-4 font-inter text-white outline-none focus:border-nebula transition-all shadow-inner"
                    placeholder="Collab / Inquiry / GG"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="relative group">
                <label className="block font-rajdhani font-bold text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-2 transition-colors group-focus-within:text-white">
                  Message Content
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-void/50 border border-gray-800 rounded-lg px-4 py-4 font-inter text-white outline-none focus:border-white transition-all shadow-inner resize-none"
                  placeholder="Beam your message here..."
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 font-rajdhani font-bold text-xs tracking-widest uppercase text-center animate-pulse">
                  {errorMessage}
                </p>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`btn-space font-orbitron font-black text-sm tracking-widest px-12 py-5 transform -skew-x-12 
                             ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                >
                  <span className="skew-x-12">
                    {status === 'submitting' ? 'TRANSMITTING...' : 'INITIATE UPLINK'}
                  </span>
                </button>
              </div>
            </form>
          )}

          {/* Background Ambient Glow */}
          <div className="absolute -inset-10 bg-cyan/5 blur-[100px] z-[-1] rounded-full pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
