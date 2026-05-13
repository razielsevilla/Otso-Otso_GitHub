import { Activity, ShieldAlert } from 'lucide-react';

import { AdminLayout } from "@/components/layout/AdminLayout";
import { MetricCard } from "@/components/ui/MetricCard";

const metrics = [
  { label: 'Patients', value: '12,840', trend: '+213 this week', trendDirection: 'up' as const },
  { label: 'Verified Experts', value: '487', trend: '9 pending review', trendDirection: 'up' as const },
  { label: 'QR Scans (24h)', value: '1,322', trend: '3 emergency', trendDirection: 'up' as const },
  { label: 'Uptime', value: '99.98%', trend: '30-day rolling', trendDirection: 'up' as const },
];

const pendingVerifications = [
  { name: 'Dr. Andrea Lim', title: 'Cardiologist', prcId: 'PRC 0091223' },
  { name: 'Nurse Karl Vergara', title: 'RN', prcId: 'PRC 0144812' },
  { name: 'Dr. Mateo Santos', title: 'Pediatrician', prcId: 'PRC 0078902' },
];

const recentEvents = [
  { emphasis: 'Emergency scan', detail: 'scan/MP-2026-00428 · 12:09' },
  { emphasis: 'Expert verified', detail: 'Dr. R. Cruz · 11:42' },
  { emphasis: 'Failed login', detail: 'admin@lunas.app · 10:01' },
  { emphasis: 'DB backup ok', detail: '03:00' },
];

export default function OverviewPage() {
  return (
    <AdminLayout activePath="/overview">
      <section className="min-h-full bg-[#FDF9F3] p-12">
        <header className="mb-8 space-y-2">
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-[#0D152B]">System overview</h1>
          <p className="text-2xl text-[#2f3f5a]">Live signals across the Lunas platform.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              trend={metric.trend}
              trendDirection={metric.trendDirection}
              className="rounded-[22px] border-neutral-200 bg-[#FDF9F3]"
            />
          ))}
        </div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          <article className="rounded-[24px] border border-neutral-200 bg-[#FDF9F3] p-8 xl:col-span-2">
            <div className="mb-7 flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              <h2 className="font-serif text-[2.05rem] font-semibold tracking-tight text-[#0D152B]">Pending verifications</h2>
            </div>

            <ul className="divide-y divide-neutral-200">
              {pendingVerifications.map((item) => (
                <li key={item.prcId} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-[1.95rem] font-semibold leading-none text-[#0D152B] md:text-[2rem]">{item.name}</p>
                    <p className="mt-2 text-lg text-[#35507a]">
                      {item.title} · {item.prcId}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-full border border-neutral-300 bg-[#FDF9F3] px-6 py-2 text-base font-medium text-[#0D152B] transition hover:bg-white"
                  >
                    Review
                  </button>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[24px] border border-neutral-200 bg-[#FDF9F3] p-8">
            <div className="mb-7 flex items-center gap-3">
              <Activity className="h-5 w-5 text-emerald-500" />
              <h2 className="font-serif text-[2.05rem] font-semibold tracking-tight text-[#0D152B]">Recent system events</h2>
            </div>

            <ul className="space-y-5 text-lg text-[#324564]">
              {recentEvents.map((event) => (
                <li key={event.emphasis} className="leading-relaxed">
                  <span className="font-semibold text-[#0D152B]">{event.emphasis}</span>
                  <span> · {event.detail}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </AdminLayout>
  );
}