"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PatientLayout } from '@/components/layout/PatientLayout';
import { CheckCircle2, Download, Printer, ArrowRight, Clock, AlertCircle } from 'lucide-react';

type AuthMeResponse = {
    firstName: string;
    lastName: string;
    role: string;
};

type AccessLog = {
    id: string;
    accessedAt: string;
    status: string;
    professional: {
        name: string;
        prcNumber: string;
        profession: string;
    };
};

function getInitials(name: string) {
    if (!name) return "";
    return name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('') || '';
}

export default function DashboardPage() {
    const [displayName, setDisplayName] = useState('');
    const [roleLabel, setRoleLabel] = useState('');
    const [avatarInitials, setAvatarInitials] = useState('');
    const [userLoading, setUserLoading] = useState(true);
    const [greeting, setGreeting] = useState('Good day'); // Default greeting
    
    const [mounted, setMounted] = useState(false);
    const [logs, setLogs] = useState<AccessLog[]>([]);
    const [logsLoading, setLogsLoading] = useState(true);
    const [logsError, setLogsError] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // --- Dynamic Greeting Logic ---
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');

        let cancelled = false;

        const loadSessionUser = async () => {
            try {
                const response = await fetch('/api/auth/me', { cache: 'no-store' });
                if (!response.ok) throw new Error();
                const data = (await response.json()) as AuthMeResponse;
                
                if (cancelled) return;

                const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ').trim();
                setDisplayName(fullName || 'User');
                setAvatarInitials(getInitials(fullName) || 'U');
                setRoleLabel(data.role === 'PATIENT' ? 'Patient' : data.role);
            } catch {
                if (!cancelled) {
                    setDisplayName('User');
                    setAvatarInitials('U');
                }
            } finally {
                if (!cancelled) setUserLoading(false);
            }
        };

        const loadAccessLogs = async () => {
            try {
                const response = await fetch('/api/patient/access-logs');
                if (!response.ok) throw new Error("Failed to fetch logs");
                const data = await response.json();
                if (!cancelled) {
                    setLogs(data.logs || []);
                    setLogsError(false);
                }
            } catch {
                if (!cancelled) setLogsError(true);
            } finally {
                if (!cancelled) setLogsLoading(false);
            }
        };

        void loadSessionUser();
        void loadAccessLogs();

        return () => { cancelled = true; };
    }, []);

    const formatLogDate = (isoDate: string) => {
        if (!mounted) return "";
        try {
            const date = new Date(isoDate);
            return new Intl.DateTimeFormat('en-PH', {
                month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
            }).format(date).replace(',', ' ·');
        } catch { return "Unknown date"; }
    };

    const profileCompletion = 92;
    const lastUpdate = { date: 'May 09, 2026', time: '14:22', relative: '2 days ago' };
    const qrStatus = 'Active';
    const latestThree = logs.slice(0, 3);
    const veryRecent = logs[0] || null;

    return (
        <PatientLayout
            activePath="/patient/dashboard"
            displayName={userLoading ? "Loading..." : displayName}
            roleLabel={userLoading ? "" : roleLabel}
            avatarInitials={userLoading ? "" : avatarInitials}
        >
            <div className="space-y-10">
                {/* Status Banner */}
                <div className="flex items-center gap-3 rounded-2xl border border-[#d1e7dd] bg-[#f2f9f6] px-6 py-4 text-[#0f5132] shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-[#198754]" />
                    <span className="text-sm font-medium">Your medical passport is active and ready.</span>
                </div>

                {/* Header Section */}
                <div>
                    {userLoading ? (
                        <div className="space-y-3">
                            <div className="h-10 w-64 animate-pulse rounded-lg bg-neutral-100" />
                            <div className="h-5 w-48 animate-pulse rounded-lg bg-neutral-50" />
                        </div>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">
                                {greeting}, {displayName.split(' ')[0]}.
                            </h1>
                            <p className="mt-2 text-[#5c6066]">Here's the state of your medical passport.</p>
                        </>
                    )}
                </div>

                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Profile Completion</p>
                        <p className="mt-3 text-3xl font-bold text-[#1a1c1e]">{profileCompletion}%</p>
                        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                            <div className="h-full bg-[#1a1c1e] transition-all" style={{ width: `${profileCompletion}%` }} />
                        </div>
                        <Link href="/patient/profile" className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-[#1a1c1e] hover:underline">
                            Edit profile <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>

                    <div className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Last Profile Update</p>
                        <p className="mt-3 text-2xl font-bold text-[#1a1c1e]">{lastUpdate.date}</p>
                        <p className="mt-1 text-[11px] text-[#8d8374]">{lastUpdate.relative} · {lastUpdate.time}</p>
                    </div>

                    <div className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">QR Code Status</p>
                        <p className="mt-3 text-3xl font-bold text-[#1a1c1e]">{qrStatus}</p>
                        <span className="mt-3 inline-block rounded-full bg-[#d1e7dd] px-3 py-1 text-[10px] font-bold text-[#0f5132]">Permanent</span>
                    </div>

                    <div className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Recent Access</p>
                        {logsLoading ? (
                            <div className="mt-3 h-10 w-24 animate-pulse rounded bg-neutral-100" />
                        ) : logsError ? (
                            <p className="mt-3 text-sm font-bold text-red-500 uppercase tracking-tighter">Detection Failed</p>
                        ) : veryRecent ? (
                            <div key={veryRecent.id}>
                                <p className="mt-3 text-2xl font-bold text-[#1a1c1e] truncate">
                                    {veryRecent.professional?.name?.split(' ')[0] || 'Medical'}
                                </p>
                                <p className="mt-1 text-[11px] text-[#8d8374] truncate">
                                    {mounted ? formatLogDate(veryRecent.accessedAt) : "..."}
                                </p>
                            </div>
                        ) : (
                            <p className="mt-3 text-sm font-medium text-[#8d8374]">No access found</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* QR Passport Card */}
                    <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-10 shadow-sm">
                        <h3 className="text-2xl font-bold text-[#1a1c1e]">Your QR passport</h3>
                        <p className="mt-2 text-sm text-[#5c6066]">Permanent and non-expiring. Keep it accessible at all times.</p>
                        <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                            <div className="h-44 w-44 rounded-3xl bg-[#fbf8f2] p-4 ring-1 ring-neutral-100">
                                <div className="h-full w-full bg-[#1a1c1e]" style={{ maskImage: 'url("https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg")', maskSize: 'contain', WebkitMaskImage: 'url("https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg")', WebkitMaskSize: 'contain' }} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-[#1a1c1e] transition-colors hover:bg-neutral-50"><Download className="h-4 w-4" /> Download</button>
                                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-[#1a1c1e] transition-colors hover:bg-neutral-50"><Printer className="h-4 w-4" /> Print</button>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Access Logs Card */}
                    <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-10 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-[#1a1c1e]">Recent access</h3>
                            <Link href="/patient/access-logs" className="text-xs font-bold text-[#8d8374] hover:text-[#1a1c1e] transition-colors">View All</Link>
                        </div>

                        <div className="mt-8 space-y-8">
                            {logsLoading ? (
                                Array(3).fill(0).map((_, i) => (
                                    <div key={i} className="h-12 w-full animate-pulse rounded-xl bg-neutral-50" />
                                ))
                            ) : logsError ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <AlertCircle className="mb-2 h-8 w-8 text-red-200" />
                                    <p className="text-sm font-bold text-red-500 uppercase tracking-tighter">Access logs not detected</p>
                                    <p className="text-xs text-neutral-400 mt-1">Check your connection</p>
                                </div>
                            ) : latestThree.length > 0 ? (
                                latestThree.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between border-b border-neutral-50 pb-6 last:border-0 last:pb-0">
                                        <div className="max-w-[70%]">
                                            <p className="text-sm font-bold text-[#1a1c1e] truncate">{item.professional?.name}</p>
                                            <p className="text-xs text-[#8d8374]">{item.professional?.profession}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[11px] font-medium uppercase tracking-tighter text-[#8d8374]">
                                                {formatLogDate(item.accessedAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <Clock className="mb-2 h-8 w-8 text-neutral-100" />
                                    <p className="text-sm font-medium text-[#8d8374]">No access logs found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PatientLayout>
    );
}