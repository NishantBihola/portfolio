import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Palette, Brain, Code2, Layers } from "lucide-react";
import ScrollRevealText from "./ScrollRevealText";

const skills = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive interfaces with user-centered design principles, wireframing, prototyping, and design systems.",
    tools: ["Figma", "Adobe XD", "Framer"],
  },
  {
    icon: Brain,
    title: "AI Engineering",
    description: "Building intelligent systems with machine learning, NLP, computer vision, and generative AI models.",
    tools: ["Python", "TensorFlow", "LangChain"],
  },
  {
    icon: Code2,
    title: "Full-Stack Dev",
    description: "Developing performant web applications with modern frameworks, APIs, and cloud infrastructure.",
    tools: ["React", "Node.js", "TypeScript"],
  },
  {
    icon: Layers,
    title: "Motion Design",
    description: "Bringing interfaces to life with purposeful animations, micro-interactions, and scroll-driven storytelling.",
    tools: ["Framer Motion", "GSAP", "Lottie"],
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Parallax background element */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -right-40 top-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none"
      />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Section header with line animation */}
        <div className="mb-20">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] bg-primary mb-6"
          />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-xs font-medium uppercase tracking-[0.3em] text-primary mb-4 block"
          >
            About
          </motion.span>
          <ScrollRevealText className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight max-w-3xl">
            A multidisciplinary creative building the future of digital experiences and innovation.
          </ScrollRevealText>
        </div>

        {/* Skills grid with staggered reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start gap-5 relative z-10">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  <skill.icon size={24} />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-xl mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                    {skill.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.map((tool, ti) => (
                      <motion.span
                        key={tool}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.15 + ti * 0.05 }}
                        className="text-xs font-display font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-border"
        >
          {[
            { number: "50+", label: "Projects Completed" },
            { number: "3+", label: "Years Experience" },
            { number: "25+", label: "Happy Clients" },
            { number: "10+", label: "Awards Won" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              className="text-center"
            >
              <span className="font-display text-3xl sm:text-4xl font-black text-gradient block mb-1">
                {stat.number}
              </span>
              <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
