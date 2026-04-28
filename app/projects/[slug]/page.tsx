import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../data/portfolio";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-16 text-slate-100 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/projects"
          className="inline-flex items-center rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-100 transition hover:bg-teal-400/20"
        >
          ← Back to Projects
        </Link>

        <p className="mt-10 text-sm uppercase tracking-[0.35em] text-teal-300">
          {project.type || "Project"}
        </p>

        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
          {project.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-teal-400 px-5 py-3 font-medium text-zinc-950 transition hover:-translate-y-0.5"
          >
            Source Code
          </a>

          {project.arxiv && (
            <a
              href={project.arxiv}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
            >
              arXiv Paper
            </a>
          )}

          {project.ccn && (
            <a
              href={project.ccn}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
            >
              CCN Paper
            </a>
          )}

          <Link
            href="/projects"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
          >
            Back to Projects
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Result
          </p>
          <p className="mt-3 text-slate-200">{project.result}</p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Overview
          </p>
          <p className="mt-3 leading-8 text-slate-300">
            This project highlights practical experience in research,
            experimentation, and building machine learning systems with modern
            tools and frameworks. It demonstrates both implementation depth and
            performance evaluation across multiple configurations.
          </p>
        </div>
      </div>
    </main>
  );
}