import { PROFILE } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="bg-mist text-ink py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between gap-4 text-sm">
        <span className="font-bold">{PROFILE.name}</span>
        <span className="mono text-xs">clean data, clean design</span>
      </div>
    </footer>
  );
}
