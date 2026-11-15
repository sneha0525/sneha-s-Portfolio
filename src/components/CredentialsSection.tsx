import { CERTS, STACK } from '../data/portfolioData';

export function CredentialsSection() {
  return (
    <>
      {/* Stack Bento */}
      <section id="stack" className="bg-ink text-mist py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="h2">Stack</h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl bg-tang text-ink p-6 col-span-2">
              <p className="lb">Design</p>
              <p className="text-3xl font-bold mt-2">Figma, UI/UX</p>
            </div>

            {STACK.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-pine2 p-6 hover:bg-pine transition-colors"
              >
                <p className="lb text-sage">{label}</p>
                <p className="text-xl font-bold mt-2">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-sage text-ink py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="h2">Certifications</h2>
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {CERTS.map((cert, i) => (
              <div
                key={cert}
                className={`rounded-xl border-2 border-ink px-6 py-5 text-xl font-bold ${
                  i === CERTS.length - 1 ? 'bg-ink text-mist' : 'bg-mist/40'
                }`}
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="bg-mist text-ink py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <p className="font-bold leading-none text-[clamp(110px,15vw,240px)] tracking-[-.05em] num">
              7.34
            </p>
            <p className="lb mt-2">SGPA, 5th semester</p>
          </div>

          <div className="md:col-span-7 min-w-0 space-y-6">
            <h2 className="h2">Education</h2>
            <div className="pt-2 pb-6 border-b border-ink/15">
              <p className="mono text-xs text-rust mb-1">2024 to 2027</p>
              <h3 className="text-2xl font-bold">
                Bachelor of Computer Application
              </h3>
              <p className="tx mt-1">Chandigarh University</p>
            </div>

            <div>
              <p className="mono text-xs text-moss mb-1">2023 to 2024</p>
              <h3 className="text-2xl font-bold">
                Secondary Education (Commerce)
              </h3>
              <p className="tx mt-1">
                R.K Public Senior Secondary School, Ludhiana · 87.2% PSEB
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Log */}
      <section id="testimonials" className="bg-sage text-ink py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <h2 className="h2">Feedback log</h2>
          <div className="rounded-2xl bg-ink text-mist p-8 mono text-sm leading-7">
            <p className="text-sage">SELECT * FROM reviews;</p>
            <p className="mt-2">
              0 rows. Words from my first team will be added here.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
