import { motion } from "framer-motion";

const techItems = [
  "React", "TypeScript", "Python", "TensorFlow", "Figma", "Node.js",
  "Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "Three.js", "WebGL",
  "LangChain", "OpenAI", "PostgreSQL", "Docker", "AWS", "Vercel",
  "Adobe XD", "Blender", "Stable Diffusion", "GraphQL", "Prisma", "Supabase",
];

const MarqueeTicker = () => {
  const doubled = [...techItems, ...techItems];

  return (
    <div className="relative py-12 overflow-hidden border-y border-border bg-card/30 backdrop-blur-sm">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Row 1 */}
      <div className="flex animate-marquee whitespace-nowrap mb-4">
        {doubled.map((item, i) => (
          <span
            key={`a-${i}`}
            className="mx-4 font-display text-sm sm:text-base font-semibold uppercase tracking-widest text-muted-foreground/40 hover:text-primary transition-colors duration-300 cursor-default select-none"
          >
            {item}
            <span className="mx-4 text-primary/30">✦</span>
          </span>
        ))}
      </div>

      {/* Row 2 — reverse */}
      <motion.div
        className="flex whitespace-nowrap"
        style={{ animationDirection: "reverse" }}
      >
        <div className="flex animate-marquee" style={{ animationDirection: "reverse" }}>
          {doubled.map((item, i) => (
            <span
              key={`b-${i}`}
              className="mx-4 font-display text-sm sm:text-base font-semibold uppercase tracking-widest text-muted-foreground/20 hover:text-accent transition-colors duration-300 cursor-default select-none"
            >
              {item}
              <span className="mx-4 text-accent/20">◆</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MarqueeTicker;
