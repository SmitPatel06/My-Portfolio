import Link from "next/link";
import { projects } from "../data/portfolio";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 py-16 text-slate-100 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">
              Projects
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
              All Projects
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              A collection of software, web, and data-focused projects that
              reflect my technical skills and problem-solving approach.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-100 transition hover:bg-teal-400/20"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1 hover:border-teal-400/30 hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-semibold text-white">
                  {project.title}
                </h2>
                <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-teal-300">
                  Project
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
      </div>
    </main>
  );
}
