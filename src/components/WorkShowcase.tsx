import { ArrowUpRight } from 'lucide-react';
import {
  MARQUEE,
  PROFILE,
  PROJECTS,
  WORK_SHOTS,
} from '../data/portfolioData';
import { useReveal } from '../hooks/useReveal';
import { ResilientImage } from './ResilientImage';

export function MarqueeBanner() {
  return (
    <section
      className="bg-tang text-ink py-5 overflow-hidden"
      aria-label="Focus"
    >
      <div className="mq text-[clamp(22px,3vw,40px)] font-bold whitespace-nowrap">
        {[0, 1].map((k) =>
          MARQUEE.map((t) => (
            <span key={`${k}-${t}`} className="flex" aria-hidden={k === 1}>
              <span className="px-6">{t}</span>
              <span className="px-6" aria-hidden="true">
                ■
              </span>
            </span>
          ))
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${(index % 2) * 0.1}s` }}
      className="reveal group rounded-2xl bg-white p-6 border border-ink/10 hover:-translate-y-1 hover:shadow-xl transition-[transform,box-shadow]"
    >
      <figure className="relative aspect-[16/9] overflow-hidden rounded-xl bg-pine">
        <ResilientImage
          src={project.img}
          alt={project.title}
          title={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </figure>
      <p className="mono text-xs mt-5 text-rust">{project.tag}</p>
      <h3 className="text-2xl font-bold mt-2">{project.title}</h3>
      <p className="tx mt-2">{project.desc}</p>
    </article>
  );
}

export function WorkShowcase() {
  return (
    <>
      <MarqueeBanner />

      {/* Behance UI Designs Gallery */}
      <section id="work" className="bg-ink text-mist py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="lb text-peach">Behance · UI/UX, Figma</p>
              <h2 className="h2 mt-4">UI Design&apos;s</h2>
            </div>

            <div className="max-w-[40ch]">
              <p className="tx text-sage">
                Interface studies built in Figma, laid out frame by frame.
              </p>
              <a
                href={PROFILE.behanceProject}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 bg-tang text-ink px-5 py-3 rounded-md font-bold hover:-translate-y-0.5 transition-transform whitespace-nowrap shrink-0"
              >
                <span>View full project on Behance</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="snap-x mt-12 flex gap-6 overflow-x-auto pb-4">
            {WORK_SHOTS.map((shot) => (
              <a
                key={shot.label}
                href={PROFILE.behanceProject}
                target="_blank"
                rel="noopener noreferrer"
                className="group snap-start shrink-0 w-[78%] sm:w-[300px] lg:w-[290px] relative aspect-[9/16] overflow-hidden rounded-2xl bg-pine"
              >
                <ResilientImage
                  src={shot.src}
                  alt={`${shot.label} screen preview`}
                  title={shot.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent"
                />
                <span className="absolute left-4 bottom-4 lb text-mist">
                  {shot.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Projects with a Backbone */}
      <section id="projects" className="bg-mist text-ink py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="h2 max-w-[16ch]">Projects with a backbone.</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
