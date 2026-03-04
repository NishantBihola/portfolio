"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import projectAiDashboard from "@/assets/project-ai-dashboard.jpg";
import projectFintechApp from "@/assets/project-fintech-app.jpg";
import projectGenArt from "@/assets/project-gen-art.jpg";
import projectEcommerce from "@/assets/project-ecommerce.jpg";

const projects = [
  {
    title: "AI Dashboard",
    category: "Full-Stack · AI",
    description: "Real-time analytics dashboard powered by machine learning models for predictive insights.",
    fullDescription: "This project integrates TensorFlow-based predictive models with a React frontend, giving users interactive charts and real-time alerts for KPIs.",
    tags: ["React", "Python", "TensorFlow"],
    image: projectAiDashboard,
  },
  {
    title: "FinTech Mobile App",
    category: "UI/UX · Mobile",
    description: "Complete redesign of a digital banking experience, increasing user engagement by 40%.",
    fullDescription: "Redesigned the entire banking app workflow with user-centered principles and implemented features like transaction insights, budgeting tools, and biometric login.",
    tags: ["Figma", "React Native", "Node.js"],
    image: projectFintechApp,
  },
  {
    title: "Generative Art Platform",
    category: "AI · Creative",
    description: "Web platform enabling artists to create unique artworks using generative AI models.",
    fullDescription: "Implemented a Next.js platform with Stable Diffusion backend. Artists can generate, save, and sell AI-generated art while customizing styles and prompts.",
    tags: ["Next.js", "Stable Diffusion", "WebGL"],
    image: projectGenArt,
  },
  {
    title: "E-Commerce Redesign",
    category: "UI/UX · Full-Stack",
    description: "End-to-end redesign and development of a luxury brand's online store.",
    fullDescription: "Full-stack solution using TypeScript, Tailwind, and Stripe for checkout. Focused on conversion optimization and mobile-first experience.",
    tags: ["TypeScript", "Tailwind", "Stripe"],
    image: projectEcommerce,
  },
];

const ProjectCard = ({ project, i }: { project: typeof projects[0]; i: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-border overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Project image with parallax */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ y: imgY }}
          className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Hover overlay with links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex gap-3">
            <motion.div
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="p-4 rounded-full bg-background/90 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={20} />
            </motion.div>
            <motion.a
              href="https://github.com/nishant-bihola"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              className="p-4 rounded-full bg-background/90 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
            </motion.a>
          </div>
        </motion.div>

        {/* Project number */}
        <span className="absolute top-4 right-4 font-display text-sm font-bold text-foreground/20 group-hover:text-primary/40 transition-colors">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Info */}
      <div className="p-6 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <span className="text-xs font-display font-medium uppercase tracking-widest text-primary mb-2 block">
              {project.category}
            </span>
            <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-2 rounded-full border border-border group-hover:border-primary group-hover:text-primary transition-all duration-300 group-hover:rotate-45"
          >
            <ArrowUpRight size={16} />
          </motion.div>
        </div>

        <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Expanded description */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mb-4 text-muted-foreground text-sm font-body leading-relaxed"
            >
              {project.fullDescription}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-display font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
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
            Projects
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight max-w-3xl"
          >
            Selected <span className="text-gradient">work</span>.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;