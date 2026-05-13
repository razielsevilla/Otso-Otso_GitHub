import { AdminLayout } from "@/components/layout/AdminLayout";

const verifications = [
  { name: 'Dr. Andrea Lim', title: 'Cardiologist', prcId: '#0091223' },
  { name: 'Nurse Karl Vergara', title: 'Registered Nurse', prcId: '#0144812' },
  { name: 'Dr. Mateo Santos', title: 'Pediatrician', prcId: '#0078902' },
];

export default function VerificationsPage() {
  return (
    <AdminLayout activePath="/expert-verifications">
      <section className="min-h-full bg-[#FDF9F3] p-12">
        <header className="mb-8 space-y-2">
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-[#0D152B]">Expert verifications</h1>
          <p className="text-2xl text-[#2f3f5a]">Review PRC license submissions.</p>
        </header>

        <div className="space-y-4">
          {verifications.map((item) => (
            <article
              key={item.prcId}
              className="flex flex-col gap-5 rounded-[24px] border border-neutral-200 bg-[#FDF9F3] px-7 py-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="font-serif text-[2rem] font-semibold leading-none text-[#0D152B]">{item.name}</h2>
                <p className="mt-2 text-lg text-[#35507a]">
                  {item.title} · PRC {item.prcId}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full border border-neutral-300 bg-[#FDF9F3] px-6 py-2 text-base font-medium text-[#0D152B] transition hover:bg-white"
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="rounded-full bg-[#0D152B] px-6 py-2 text-base font-semibold text-white transition hover:bg-[#162448]"
                >
                  Approve
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}