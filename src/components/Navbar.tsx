import { PROFILE } from '../data/portfolioData';

export function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
      <rect x="3" y="3" width="12" height="12" fill="#14201A" />
      <circle cx="23" cy="9" r="6" fill="#FF5A1F" />
      <rect
        x="3"
        y="19"
        width="26"
        height="10"
        rx="5"
        fill="none"
        stroke="#14201A"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-mist/90 backdrop-blur-md text-ink border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="flex items-center gap-3 font-bold whitespace-nowrap shrink-0"
        >
          <Logo />
          <span className="text-lg tracking-tight">{PROFILE.name}</span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {[
            ['work', 'Work'],
            ['projects', 'Projects'],
            ['stack', 'Stack'],
            ['education', 'Education'],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="hover:text-rust transition-colors whitespace-nowrap shrink-0"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="bg-ink text-mist px-5 py-2 rounded-md text-sm font-semibold hover:bg-tang hover:text-ink transition-colors whitespace-nowrap shrink-0"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
