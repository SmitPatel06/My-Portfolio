"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileText, Sun, Moon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { portfolioData, skills, projects, timeline } from "./data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const inViewMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

const floatingSymbols = [
  "{ }",
  "< />",
  "01",
  "</>",
  "[ ]",
  "const",
  "fn()",
  "AI",
  "SQL",
  "git",
];

export default function HomePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showCompactNav, setShowCompactNav] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme ?? "dark";

    setTheme(initialTheme);

    if (initialTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80 && currentScrollY > lastScrollY.current) {
        setShowCompactNav(true);
      } else {
        setShowCompactNav(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 transition-colors duration-300 selection:bg-teal-400/30">
      <header className="sticky top-0 z-[100] bg-zinc-950/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 lg:px-10">
          <motion.div
            animate={{
              opacity: showCompactNav ? 0 : 1,
              x: showCompactNav ? -30 : 0,
              width: showCompactNav ? 0 : "auto",
            }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden whitespace-nowrap"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-teal-300 md:hidden">
              SP
            </p>
            <p className="hidden text-sm uppercase tracking-[0.35em] text-teal-300 md:block">
              {portfolioData.name} // Portfolio
            </p>
          </motion.div>

          <motion.div layout className="flex items-center justify-center">
            <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 lg:flex">
              <a
                href="#home"
                className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
              >
                Home
              </a>
              <a
                href="#about"
                className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
              >
                About
              </a>
              <Link
                href="/projects"
                className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
              >
                Projects
              </Link>
              <a
                href="#skills"
                className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
              >
                Contact
              </a>
            </div>
          </motion.div>

          <motion.div
            animate={{
              opacity: showCompactNav ? 0 : 1,
              x: showCompactNav ? 30 : 0,
              width: showCompactNav ? 0 : "auto",
            }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
          >
            <button
              onClick={toggleTheme}
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-teal-400/30 hover:bg-teal-400/10 hover:text-white"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </motion.div>
        </nav>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-10">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-32 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl"
          animate={{
            x: [-120, 120, -120],
            y: [0, 30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{ duration: 14, repeat: Infinity }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-10 top-[28rem] -z-10 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl"
          animate={{ y: [0, -35, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {floatingSymbols.map((symbol, index) => (
            <motion.div
              key={symbol + index}
              className="absolute text-sm font-mono text-white/6 md:text-lg"
              style={{
                left: `${8 + (index % 5) * 18}%`,
                top: `${10 + Math.floor(index / 2) * 14}%`,
              }}
              animate={{
                y: [0, -18, 0],
                x: [0, index % 2 === 0 ? 10 : -10, 0],
                rotate: [0, index % 2 === 0 ? 6 : -6, 0],
              }}
              transition={{
                duration: 7 + index,
                repeat: Infinity,
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>

        <motion.section
          id="home"
          className="relative grid items-center gap-10 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:py-12"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Open to opportunities
            </div>

            <motion.div
              variants={fadeUp}
              className="mb-5 max-w-fit rounded-2xl border border-white/10 bg-zinc-900/80 px-5 py-3 font-mono text-sm text-violet-200 shadow-2xl shadow-violet-950/40"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(45,212,191,0)",
                  "0 0 28px rgba(139,92,246,0.24)",
                  "0 0 0 rgba(45,212,191,0)",
                ],
              }}
              transition={{ duration: 3.6, repeat: Infinity }}
            >
              <span className="text-slate-500">$</span> whoami
              <br />
              <span className="text-white">{portfolioData.name}</span> —{" "}
              {portfolioData.title}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl"
            >
              Building <span className="text-teal-300">reliable software</span>,
              scalable systems, and high-impact digital solutions.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-lg leading-8 text-slate-300"
            >
              I’m {portfolioData.name}, a Computer Science graduate student at
              Lakehead University with a background in Computer Engineering. I
              enjoy building practical digital products across web development,
              big data, and cloud-focused systems.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="rounded-2xl bg-teal-400 px-6 py-3 font-medium text-zinc-950 shadow-lg shadow-teal-500/20 transition hover:-translate-y-0.5"
              >
                View Projects
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-4">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-violet-950/20 backdrop-blur"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-teal-400/20">
                  <Image
                    src="/profile.jpg"
                    alt="Smit Patel profile photo"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Profile
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {portfolioData.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    {portfolioData.title}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-zinc-900/70 p-5">
                <div className="grid gap-4">
                  {[
                    ["Core Focus", "Web / Data / Cloud"],
                    ["Status", "Open to Opportunities"],
                    ["Location", "Thunder Bay"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                        {label}
                      </p>
                      <p className="text-right text-base font-semibold text-white md:text-lg">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-teal-400/15 to-violet-500/10 p-6"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Current Stack
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  "Python",
                  "SQL",
                  "Apache Spark",
                  "PySpark",
                  "Pandas",
                  "NumPy",
                  "TensorFlow",
                  "Scikit-learn",
                  "Machine Learning",
                  "Deep Learning",
                  "NLP",
                  "AWS",
                ].map((item) => (
                  <motion.span
                    key={item}
                    className="rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm text-teal-100"
                    whileHover={{ y: -2, scale: 1.04 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          id="about"
          className="grid gap-6 py-8 lg:grid-cols-[0.8fr_1.2fr]"
          initial={inViewMotion.initial}
          whileInView={inViewMotion.whileInView}
          viewport={inViewMotion.viewport}
          transition={inViewMotion.transition}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
              About
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              A Computer Science graduate student focused on building practical,
              data-driven, and scalable digital solutions.
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300 backdrop-blur">
            <p className="leading-8">
              I’m {portfolioData.name}, a Computer Science graduate student at
              Lakehead University with a background in Computer Engineering. My
              interests lie in software development, data engineering,
              artificial intelligence, and cloud-based systems. I enjoy building
              practical solutions that combine clean design, strong
              functionality, and real-world impact.
            </p>

            <p className="mt-6 leading-8">
              Through academic projects and co-op experience, I have worked
              across web development, big data processing, and software systems,
              developing a strong foundation in problem-solving, technical
              implementation, and continuous learning. I am especially
              interested in creating reliable and efficient technology that is
              both useful and professionally designed.
            </p>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="py-16"
          initial={inViewMotion.initial}
          whileInView={inViewMotion.whileInView}
          viewport={inViewMotion.viewport}
          transition={inViewMotion.transition}
        >
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
              Skills
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Technical areas I work across
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {category}
                  </h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-400">
                    {items.length} tools
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-zinc-900/70 px-4 py-2 text-sm text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="py-16"
          initial={inViewMotion.initial}
          whileInView={inViewMotion.whileInView}
          viewport={inViewMotion.viewport}
          transition={inViewMotion.transition}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
            Projects
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Featured work
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1 hover:border-teal-400/30 hover:bg-white/[0.07]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-teal-300">
                    Case Study
                  </span>
                </div>

                <p className="mt-4 leading-8 text-slate-300">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Result
                  </p>
                  <p className="mt-2 text-slate-200">{project.result}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="rounded-2xl bg-teal-400 px-4 py-2 font-medium text-zinc-950 transition hover:-translate-y-0.5"
                  >
                    View Details
                  </Link>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-teal-400/20 bg-teal-400/10 px-4 py-2 font-medium text-teal-100 transition hover:bg-teal-400/20"
                  >
                    Source Code
                  </a>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="timeline"
          className="py-16"
          initial={inViewMotion.initial}
          whileInView={inViewMotion.whileInView}
          viewport={inViewMotion.viewport}
          transition={inViewMotion.transition}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
            Timeline
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Learning and building journey
          </h2>

          <div className="mt-8 space-y-5">
            {timeline.map((item) => (
              <div
                key={item.title}
                className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-[120px_1fr]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-3 w-3 rounded-full bg-teal-400" />
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">
                    {item.year}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-300">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      <footer
        id="contact"
        className="border-t border-white/10 px-6 py-8 lg:px-10"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-teal-300">
              {portfolioData.name}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Always open to opportunities, thoughtful collaborations, and
              professional connections.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${portfolioData.email}`}
              className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-teal-400/30 hover:bg-teal-400/10 hover:text-white"
              aria-label="Email"
              title="Email"
            >
              <Mail size={18} />
            </a>

            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-teal-400/30 hover:bg-teal-400/10 hover:text-white"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <a
              href={portfolioData.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:border-teal-400/30 hover:bg-teal-400/10 hover:text-white"
              aria-label="GitHub"
              title="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
