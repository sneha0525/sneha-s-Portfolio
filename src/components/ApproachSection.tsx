import { WORKFLOW } from '../data/portfolioData';
import { useReveal } from '../hooks/useReveal';

export function ApproachSection() {
  const pathRef = useReveal<SVGPathElement>();

  return (
    <>
      {/* Approach: Table Shapes Screen */}
      <section id="approach" className="bg-sage text-ink py-24 md:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <svg viewBox="0 0 400 300" className="w-full" aria-hidden="true">
            <rect x="20" y="40" width="140" height="90" rx="10" fill="#14201A" />
            <rect
              x="240"
              y="170"
              width="140"
              height="90"
              rx="45"
              fill="#EEF1EA"
              stroke="#14201A"
              strokeWidth="3"
            />
            <path
              ref={pathRef}
              pathLength={1}
              className="draw"
              d="M160 85c90 0 150 20 150 85"
              fill="none"
              stroke="#FF5A1F"
              strokeWidth="6"
            />
            <text
              x="90"
              y="92"
              textAnchor="middle"
              fill="#EEF1EA"
              fontSize="18"
              fontFamily="JetBrains Mono, Menlo, monospace"
            >
              table
            </text>
            <text
              x="310"
              y="222"
              textAnchor="middle"
              fill="#14201A"
              fontSize="18"
              fontFamily="JetBrains Mono, Menlo, monospace"
            >
              screen
            </text>
          </svg>

          <div className="min-w-0">
            <p className="lb">Why hire me</p>
            <h2 className="h2 mt-4">The table shapes the screen.</h2>
            <p className="tx mt-6 max-w-[46ch]">
              When I design a list, I already know its keys, its edge cases and
              its empty state. Developers get layouts that match the data they
              actually have.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow 4-Step Block */}
      <section id="process" className="bg-mist text-ink py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="h2">Workflow</h2>
          <div className="mt-12 grid md:grid-cols-4 rounded-2xl overflow-hidden border-2 border-ink">
            {WORKFLOW.map(([title, desc], i) => {
              const dark = i === 2;
              const last = i === WORKFLOW.length - 1;
              return (
                <div
                  key={title}
                  className={`p-8 transition-colors ${
                    last ? '' : 'border-b-2 md:border-b-0 md:border-r-2 border-ink'
                  } ${dark ? 'bg-ink text-mist' : 'hover:bg-white'}`}
                >
                  <p className={`mono text-xs ${dark ? 'text-peach' : 'text-rust'}`}>
                    Step {i + 1}
                  </p>
                  <h3 className="text-2xl font-bold mt-3">{title}</h3>
                  <p className="tx mt-2">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
