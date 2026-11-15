import { HERO_IMAGE, HERO_ROWS, PROFILE } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

function QueryPanel() {
  return (
    <div className="stage lg:col-span-6">
      <div className="panel ground rounded-2xl bg-ink text-mist shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-pine">
          <span className="h-3 w-3 rounded-full bg-tang" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-sage" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-moss" aria-hidden="true" />
          <span className="mono text-xs ml-3 text-sage">sneha.sql</span>
        </div>

        <div className="grid sm:grid-cols-2">
          <div className="p-5 mono text-sm leading-7 border-b sm:border-b-0 sm:border-r border-pine">
            <p className="text-sage">SELECT skill, level</p>
            <p className="text-sage">FROM sneha</p>
            <p className="text-sage">WHERE craft IN</p>
            <p className="text-peach">(&apos;design&apos;,&apos;data&apos;);</p>
          </div>
          <div className="p-5">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-pine">
              <ResilientImage
                src={HERO_IMAGE}
                alt="UI wireframes on a studio display"
                title="UI Wireframes"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>

        <table className="w-full mono text-sm">
          <thead>
            <tr className="text-left text-sage border-t border-pine">
              <th className="px-5 py-2 font-normal">skill</th>
              <th className="px-5 py-2 font-normal">level</th>
            </tr>
          </thead>
          <tbody>
            {HERO_ROWS.map(([skill, level, hot], i) => (
              <tr
                key={skill}
                className="row border-t border-pine"
                style={{ animationDelay: `${0.9 + i * 0.08}s` }}
              >
                <td className="px-5 py-2">{skill}</td>
                <td className={`px-5 py-2 num ${hot ? 'text-peach' : ''}`}>
                  {level}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mono text-xs text-sage px-5 py-3 border-t border-pine">
          4 rows returned
        </p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <header
      id="top"
      className="relative min-h-[92svh] bg-mist text-ink dots overflow-hidden flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12 items-center w-full">
        <div className="lg:col-span-6 min-w-0 relative z-10">
          <p className="lb fu f1 text-moss">{PROFILE.role}</p>

          <h1 className="h1 mt-6 break-words">
            <span className="ln">
              <span>Pixels with</span>
            </span>
            <span className="ln">
              <span>
                a <span className="text-tang">schema.</span>
              </span>
            </span>
          </h1>

          <p className="tx fu f1 mt-8 max-w-[44ch]">{PROFILE.differentiator}</p>

          <div className="fu f2 mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-tang text-ink px-6 py-3 rounded-md font-bold hover:-translate-y-0.5 hover:shadow-lg transition-[transform,box-shadow] whitespace-nowrap shrink-0"
            >
              <span>Message me</span>
              <span
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>

            <a
              href="#work"
              className="inline-flex items-center px-6 py-3 rounded-md border-2 border-ink font-bold hover:bg-ink hover:text-mist transition-colors whitespace-nowrap shrink-0"
            >
              Browse projects
            </a>
          </div>
        </div>

        <QueryPanel />
      </div>
    </header>
  );
}
