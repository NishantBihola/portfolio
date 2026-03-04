import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  const nameChars = "Nishant Bihola".split("");

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
      {/* Animated gradient orbs with parallax */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ scale: orbScale }}>
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]"
        />
      </motion.div>

      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="font-display text-[20vw] font-black uppercase tracking-tighter whitespace-nowrap select-none"
        >
          NISHANT
        </motion.span>
      </div>

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles size={14} className="text-primary" />
            </motion.div>
            <span className="text-xs font-display font-medium uppercase tracking-widest text-muted-foreground">
              Available for work
            </span>
          </motion.div>

          {/* Name with character-by-character reveal */}
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-display font-black leading-[0.85] tracking-tighter mb-4">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${char === " " ? "w-4 sm:w-6" : ""} ${
                  i < 7 ? "text-gradient" : ""
                }`}
                style={{ display: char === " " ? "inline-block" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          {/* Role line */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-4 mb-6 overflow-hidden"
          >
            <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-primary/50" />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="font-display text-sm sm:text-base font-medium uppercase tracking-[0.4em] text-primary"
            >
              UI/UX Designer · AI Engineer · Full-Stack Dev
            </motion.span>
            <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-primary/50" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body font-light leading-relaxed"
          >
            Crafting digital experiences at the intersection of design,
            artificial intelligence, and modern web development.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              as="a"
              href="#projects"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-display font-semibold text-sm uppercase tracking-widest rounded-full hover-lift glow-border"
              strength={0.4}
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-block px-8 py-4 border border-border text-foreground font-display font-semibold text-sm uppercase tracking-widest rounded-full hover:border-primary hover:text-primary transition-colors duration-300"
              strength={0.4}
            >
              Get in Touch
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs font-display uppercase tracking-[0.3em] text-muted-foreground"
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
