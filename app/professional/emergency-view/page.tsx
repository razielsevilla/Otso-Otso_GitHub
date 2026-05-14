"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type PatientData = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  bloodType: string;
  organDonor: boolean;
  allergies: Array<{
    allergen: string;
    reaction: string;
    severity: string;
  }>;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
  drugInteractions: Array<{
    drug1: string;
    drug2: string;
    severity: string;
    description: string;
  }>;
  surgeries: Array<{
    procedure: string;
    datePerformed: string;
    hospital: string;
    notes: string;
  }>;
};

export default function EmergencyView() {
  const router = useRouter();
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  useEffect(() => {
    // Read patient data from sessionStorage (set by PIN entry page)
    const data = sessionStorage.getItem('emergencyPatientData');
    if (data) {
      try {
        setPatientData(JSON.parse(data));
      } catch (error) {
        console.error('Failed to parse patient data:', error);
        router.push('/professional/dashboard');
      }
    } else {
      // No data, redirect back
      router.push('/professional/dashboard');
    }
  }, [router]);

  if (!patientData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading emergency data...</div>
      </div>
    );
  }

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(patientData.birthDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-10 sm:py-10">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 shadow-2xl shadow-slate-950/40 backdrop-blur-xl ring-1 ring-white/10">
          <div className="rounded-t-[2rem] border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800 p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-red-300 ring-1 ring-red-500/20">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" /> EMERGENCY ACCESS
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {patientData.firstName} {patientData.lastName}
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">
                  Professional access granted. Review critical patient information and proceed with urgent care.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 text-left text-sm sm:grid-cols-3 sm:text-right">
                <div className="rounded-3xl bg-white/5 px-4 py-3 text-slate-100">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Age</div>
                  <div className="mt-2 text-2xl font-semibold">{age}</div>
                </div>
                <div className="rounded-3xl bg-white/5 px-4 py-3 text-slate-100">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Blood Type</div>
                  <div className="mt-2 text-2xl font-semibold">{patientData.bloodType}</div>
                </div>
                <div className="rounded-3xl bg-white/5 px-4 py-3 text-slate-100">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Organ Donor</div>
                  <div className="mt-2 text-2xl font-semibold">{patientData.organDonor ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-8">
            <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <article className="rounded-3xl bg-slate-900/80 p-6 shadow-lg shadow-black/20 ring-1 ring-white/10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                      <path d="M12 1.75c-5.627 0-10.25 4.623-10.25 10.25 0 5.888 6.512 10.687 10.077 11.567a1.25 1.25 0 0 0 1.146 0c3.565-.88 10.077-5.679 10.077-11.567 0-5.627-4.623-10.25-10.25-10.25Z" />
                      <path d="M12 7.75v6" strokeLinecap="round" />
                      <path d="M9 10.75h6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Patient snapshot</p>
                    <p className="text-lg font-semibold text-white">Critical summary</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Medical alert</p>
                    <p className="mt-2 text-sm text-slate-200">Review life-threatening allergies first. Avoid contraindicated medications.</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Status</p>
                    <p className="mt-2 text-sm text-slate-200">Access logged. Emergency contacts notified. Records are live.</p>
                  </div>
                </div>
              </article>

              <aside className="rounded-3xl bg-slate-900/85 p-6 shadow-lg shadow-black/20 ring-1 ring-white/10">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Quick facts</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
                    <span className="text-sm text-slate-300">Patient ID</span>
                    <span className="text-sm font-semibold text-white">{patientData.id.slice(0, 8)}…</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
                    <span className="text-sm text-slate-300">Allergy count</span>
                    <span className="text-sm font-semibold text-white">{patientData.allergies.length}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-white/5 px-4 py-3">
                    <span className="text-sm text-slate-300">Medication count</span>
                    <span className="text-sm font-semibold text-white">{patientData.medications.length}</span>
                  </div>
                </div>
              </aside>
            </section>

            <section className="rounded-3xl bg-slate-900/85 p-6 shadow-lg shadow-black/20 ring-1 ring-white/10">
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Allergies</p>
                  <h2 className="text-2xl font-semibold text-white">Critical reactions</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> Life-threatening
                </div>
              </div>
              {patientData.allergies.length === 0 ? (
                <p className="text-slate-400">No known allergies recorded for this patient.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {patientData.allergies.map((allergy, index) => (
                    <div
                      key={index}
                      className={`rounded-3xl border p-5 ${
                        allergy.severity === 'LIFE_THREATENING'
                          ? 'border-red-500/40 bg-red-500/10'
                          : allergy.severity === 'SEVERE'
                          ? 'border-orange-400/30 bg-orange-400/10'
                          : 'border-slate-700 bg-slate-950/70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-lg font-semibold text-white">{allergy.allergen}</p>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${
                          allergy.severity === 'LIFE_THREATENING'
                            ? 'bg-red-500/15 text-red-200'
                            : allergy.severity === 'SEVERE'
                            ? 'bg-orange-500/15 text-orange-200'
                            : 'bg-slate-700 text-slate-200'
                        }`}
                        >{allergy.severity.replace('_', ' ')}</span>
                      </div>
                      <p className="mt-3 text-slate-300">{allergy.reaction}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl bg-slate-900/85 p-6 shadow-lg shadow-black/20 ring-1 ring-white/10">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Medications</p>
                    <h2 className="text-2xl font-semibold text-white">Current prescriptions</h2>
                  </div>
                </div>
                {patientData.medications.length === 0 ? (
                  <p className="text-slate-400">No current medications listed.</p>
                ) : (
                  <div className="space-y-4">
                    {patientData.medications.map((med, index) => (
                      <div key={index} className="rounded-3xl bg-white/5 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-lg font-semibold text-white">{med.name}</p>
                          <span className="rounded-full bg-slate-700 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                            {med.frequency}
                          </span>
                        </div>
                        <p className="mt-2 text-slate-300">{med.dosage}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-3xl bg-slate-900/85 p-6 shadow-lg shadow-black/20 ring-1 ring-white/10">
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Drug Interactions</p>
                  <h2 className="text-2xl font-semibold text-white">Interaction risk</h2>
                </div>
                {patientData.drugInteractions.length === 0 ? (
                  <p className="text-slate-400">No known drug interactions recorded.</p>
                ) : (
                  <div className="space-y-4">
                    {patientData.drugInteractions.map((interaction, index) => (
                      <div key={index} className={`rounded-3xl border p-4 ${
                        interaction.severity === 'HIGH'
                          ? 'border-red-500/30 bg-red-500/10'
                          : interaction.severity === 'MODERATE'
                          ? 'border-yellow-500/30 bg-yellow-500/10'
                          : 'border-slate-700 bg-slate-950/80'
                      }`}>
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-white">{interaction.drug1} + {interaction.drug2}</p>
                          <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${
                            interaction.severity === 'HIGH'
                              ? 'bg-red-500/20 text-red-200'
                              : interaction.severity === 'MODERATE'
                              ? 'bg-yellow-500/20 text-yellow-200'
                              : 'bg-slate-700 text-slate-200'
                          }`}
                          >{interaction.severity}</span>
                        </div>
                        <p className="mt-3 text-slate-300">{interaction.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-3xl bg-slate-900/85 p-6 shadow-lg shadow-black/20 ring-1 ring-white/10">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Surgical history</p>
                  <h2 className="text-2xl font-semibold text-white">Procedures & records</h2>
                </div>
              </div>
              {patientData.surgeries.length === 0 ? (
                <p className="text-slate-400">No surgical history available.</p>
              ) : (
                <div className="space-y-4">
                  {patientData.surgeries.map((surgery, index) => (
                    <div key={index} className="rounded-3xl bg-white/5 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-lg font-semibold text-white">{surgery.procedure}</p>
                        <span className="rounded-full bg-slate-700 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                          {new Date(surgery.datePerformed).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-slate-300">{surgery.hospital}</p>
                      {surgery.notes && <p className="mt-3 text-slate-400 text-sm">{surgery.notes}</p>}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <div className="rounded-[1.75rem] bg-red-900/95 px-6 py-6 text-center text-white shadow-lg shadow-red-950/40 ring-1 ring-red-400/20">
              <p className="text-base font-semibold uppercase tracking-[0.24em] text-red-100/90">EMERGENCY VIEW — ACCESS LOGGED — CONTACTS NOTIFIED</p>
              <p className="mt-3 max-w-2xl mx-auto text-sm text-red-200/90">All actions are recorded in the audit trail and patient contacts were notified immediately for rapid follow-up.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}