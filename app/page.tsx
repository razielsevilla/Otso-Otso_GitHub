const highlights = [
  'Instant QR-based access to critical medical data',
  'Encrypted patient records with role-based access',
  'Emergency workflow built for speed, clarity, and trust',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(31,122,140,0.2),_transparent_40%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_55%,_#e2e8f0_100%)] text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-aurora shadow-sm backdrop-blur">
              Lunas Emergency Medical Information System
            </span>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
                Medical information that appears the moment it matters.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                A clean, QR-powered emergency access experience for patients, professionals, and administrators.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-800"
                href="/"
              >
                View demo flow
              </a>
              <a
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-aurora hover:text-aurora"
                href="/"
              >
                Read the plan
              </a>
            </div>
            <ul className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200 bg-white/85 p-4 text-sm leading-6 text-slate-700 shadow-sm backdrop-blur">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-glow backdrop-blur-xl">
            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Emergency View</p>
              <h2 className="mt-4 text-3xl font-semibold">Maria Santos</h2>
              <p className="mt-2 text-slate-300">Blood Type: O+ • Organ Donor: Yes</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Critical Allergy</p>
                  <p className="text-lg font-medium text-rose-300">Penicillin</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Current Medication</p>
                  <p className="text-lg font-medium text-amber-300">Salbutamol</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}