"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Send, CheckCircle } from "lucide-react";
import MagneticButton from "./MagneticButton";
import ScrollRevealText from "./ScrollRevealText";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/nishant-bihola" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/nishantsinh-bihola-8bb500321/" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  // Handles form submission via mailto:
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    // Create mailto link
    const mailtoLink = `mailto:nishant15bihola@gmail.com?subject=New message from ${encodeURIComponent(
      name
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open user's email client
    window.location.href = mailtoLink;

    // Show submitted animation
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    form.reset();
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-[2px] bg-primary mb-6"
            />
            <span className="font-display text-xs font-medium uppercase tracking-[0.3em] text-primary mb-4 block">
              Contact
            </span>
            <ScrollRevealText className="text-4xl sm:text-5xl font-display font-bold leading-tight mb-6">
              Let's create something extraordinary together.
            </ScrollRevealText>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground font-body leading-relaxed mb-10"
            >
              Have a project in mind? I'm always open to collaborating on
              innovative ideas. Drop me a message or connect on GitHub or LinkedIn.
            </motion.p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((social, i) => (
                <MagneticButton
                  key={social.label}
                  as="a"
                  href={social.href}
                  className="p-3 rounded-xl border border-border hover:border-primary hover:text-primary transition-all duration-200 block"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.5}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <social.icon size={20} />
                  </motion.div>
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <label className="block text-xs font-display font-medium uppercase tracking-widest text-muted-foreground mb-2">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-foreground font-body text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300"
                    placeholder={`Your ${field.label.toLowerCase()}`}
                  />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focused === field.name ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
                  />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block text-xs font-display font-medium uppercase tracking-widest text-muted-foreground mb-2">
                Message
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  required
                  rows={4}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-foreground font-body text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focused === "message" ? 1 : 0 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-widest rounded-xl glow-border transition-all duration-200 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                {submitted ? (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;