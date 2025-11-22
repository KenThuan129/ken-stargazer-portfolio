'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Send, Copy, Check, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { MagneticButton } from '../magnetic-button';

const socialLinks = [
  { icon: Github, href: 'https://github.com/KenThuan129', label: 'GitHub', color: '#ffffff' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/caelus-nguyen', label: 'LinkedIn', color: '#0077b5' },
  { icon: Instagram, href: 'https://www.instagram.com/caelus_nguyen_2003', label: 'Instagram', color: '#e4405f' },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [emailCopied, setEmailCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const email = 'ken.stargazer.12092003@gmail.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-24 md:py-32 px-4 md:px-8 min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-4"
          >
            Let&apos;s Connect
          </motion.h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-body">
            Have a project in mind? Let&apos;s work together to bring it to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-heading font-bold text-white mb-6">
                Get In Touch
              </h3>
              <p className="text-white/80 font-body leading-relaxed mb-6">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              {/* Email */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 glass-light rounded-xl glow-pink-hover">
                  <Mail className="w-6 h-6 text-[#ff6b9d]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/60 font-body mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${email}`}
                      className="text-white font-body hover:text-[#00d9ff] transition-colors"
                    >
                      {email}
                    </a>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={copyEmail}
                      className="p-2 glass-light rounded-lg hover:bg-[#9d4edd]/20 transition-colors"
                      aria-label="Copy email"
                    >
                      {emailCopied ? (
                        <Check className="w-4 h-4 text-[#00d9ff]" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/60" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm text-white/60 font-body mb-4">Follow Me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 glass rounded-xl glow-purple-hover transition-all duration-300"
                        style={{
                          borderColor: `${social.color}40`,
                        }}
                        aria-label={social.label}
                      >
                        <Icon
                          className="w-5 h-5 transition-colors"
                          style={{ color: social.color }}
                        />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-body font-medium text-white/80 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 glass-light rounded-xl border border-white/10 focus:border-[#9d4edd] focus:outline-none focus:ring-2 focus:ring-[#9d4edd]/20 text-white font-body placeholder:text-white/40 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-body font-medium text-white/80 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 glass-light rounded-xl border border-white/10 focus:border-[#9d4edd] focus:outline-none focus:ring-2 focus:ring-[#9d4edd]/20 text-white font-body placeholder:text-white/40 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-body font-medium text-white/80 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 glass-light rounded-xl border border-white/10 focus:border-[#9d4edd] focus:outline-none focus:ring-2 focus:ring-[#9d4edd]/20 text-white font-body placeholder:text-white/40 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 glass-light rounded-xl border border-[#00d9ff]/50 bg-[#00d9ff]/10"
                >
                  <p className="text-[#00d9ff] font-body text-sm">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 glass-light rounded-xl border border-[#ff6b9d]/50 bg-[#ff6b9d]/10"
                >
                  <p className="text-[#ff6b9d] font-body text-sm">
                    ✗ Failed to send message. Please try again or email me directly.
                  </p>
                </motion.div>
              )}

              <MagneticButton strength={0.5}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { scale: 1.05 }}
                  whileTap={isSubmitting ? {} : { scale: 0.95 }}
                  className={`w-full px-8 py-4 glass rounded-full font-heading font-semibold text-white bg-gradient-to-r from-[#ff6b9d] to-[#9d4edd] hover:from-[#c44569] hover:to-[#7b2cbf] glow-pink-hover transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

