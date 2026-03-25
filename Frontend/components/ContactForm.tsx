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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
            <a 
              href="mailto:abh21341@gmail.com" 
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-void/40 border border-cyan/20 hover:border-cyan/50 transition-all duration-300 backdrop-blur-sm shadow-inner"
            >
              <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center group-hover:bg-cyan group-hover:shadow-cyan-glow transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan group-hover:text-void transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-10 11"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
              </div>
              <span className="font-rajdhani font-bold text-xs tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors uppercase">abh21341@gmail.com</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/abishek-raj-8984473b0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-void/40 border border-nebula/20 hover:border-nebula/50 transition-all duration-300 backdrop-blur-sm shadow-inner"
            >
              <div className="w-8 h-8 rounded-full bg-nebula/10 flex items-center justify-center group-hover:bg-nebula group-hover:shadow-nebula-glow transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-nebula group-hover:text-void transition-colors" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <span className="font-rajdhani font-bold text-xs tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors uppercase">LinkedIn Profile</span>
            </a>
          </div>
          <p className="font-rajdhani font-bold tracking-[0.4em] text-cyan uppercase mt-8 text-[10px] opacity-60">
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
