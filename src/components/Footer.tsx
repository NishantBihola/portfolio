"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer className="border-t border-border py-16 relative overflow-hidden" ref={ref}>
      {/* Large background name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.03 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="font-display text-[15vw] font-black uppercase tracking-tighter whitespace-nowrap select-none">
          NISHANT
        </span>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-6 mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl sm:text-3xl font-bold text-gradient"
          >
            Nishant Bihola
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-muted-foreground font-body text-center max-w-md"
          >
            UI/UX Designer · AI Engineer · Full-Stack Developer
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border"
        >
          <span className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} Nishant Bihola — All rights reserved
          </span>
          <span className="text-xs text-muted-foreground font-body">
            Designed & Built with passion
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;