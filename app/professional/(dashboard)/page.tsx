"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Stethoscope, QrCode, AlertCircle, User, Clock, CheckCircle2 } from 'lucide-react';
import LunasLoader from '@/components/ui/loader';

type AuthMeResponse = {
    firstName: string;
    lastName: string;
    role: string;
};

type ScanLog = {
    id: string;
    scannedAt: string;
    status: string;
    patient: {
        name: string;
        uuid: string;
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

export default function ProfessionalDashboardPage() {
    const [displayName, setDisplayName] = useState('');
    const [avatarInitials, setAvatarInitials] = useState('');
    const [userLoading, setUserLoading] = useState(true);
    const [greeting, setGreeting] = useState('Good day');
    const [mounted, setMounted] = useState(false);
    const [recentScans, setRecentScans] = useState<ScanLog[]>([]);
    const [scansLoading, setScansLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');

        let cancelled = false;

        const loadDashboardData = async () => {
            try {
                const authRes = await fetch('/api/auth/me', { cache: 'no-store' });

                if (cancelled) return;

                if (authRes.ok) {
                    const data = (await authRes.json()) as AuthMeResponse;
                    const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ').trim();
                    setDisplayName(fullName || 'Professional');
                    setAvatarInitials(getInitials(fullName) || 'P');
                }

            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                if (!cancelled) {
                    setUserLoading(false);
                    setScansLoading(false);
                }
            }
        };

        void loadDashboardData();

        return () => { cancelled = true; };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fbf8f2] to-[#f2eae0]">
            {userLoading ? (
                <div className="flex h-screen w-full items-center justify-center">
                    <LunasLoader />
                </div>
            ) : (
                <div className="space-y-10 px-6 py-10 md:px-16 lg:px-20 animate-in fade-in duration-700">
                    {/* Header Section */}
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">
                            {greeting}, {displayName.split(' ')[0]}.
                        </h1>
                        <p className="mt-2 text-[#5c6066]">Welcome to your medical portal. Access patient records securely.</p>
                    </div>

                    {/* Quick Action Cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Scan Patient QR */}
                        <Link href="/professional/scan">
                            <div className="group cursor-pointer rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:shadow-md hover:border-neutral-300">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Quick Action</p>
                                        <p className="mt-3 text-lg font-bold text-[#1a1c1e]">Scan QR Code</p>
                                        <p className="mt-2 text-xs text-[#8d8374]">Access patient medical records</p>
                                    </div>
                                    <QrCode className="h-6 w-6 text-[#1a1c1e] opacity-40 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </Link>

                        {/* Emergency View */}
                        <Link href="/professional/emergency-view">
                            <div className="group cursor-pointer rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:shadow-md hover:border-neutral-300">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Emergency</p>
                                        <p className="mt-3 text-lg font-bold text-[#1a1c1e]">Emergency Access</p>
                                        <p className="mt-2 text-xs text-[#8d8374]">View critical records</p>
                                    </div>
                                    <AlertCircle className="h-6 w-6 text-[#1a1c1e] opacity-40 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </Link>

                        {/* Profile */}
                        <Link href="/professional/(dashboard)/profile">
                            <div className="group cursor-pointer rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm transition-all hover:shadow-md hover:border-neutral-300">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Account</p>
                                        <p className="mt-3 text-lg font-bold text-[#1a1c1e]">Your Profile</p>
                                        <p className="mt-2 text-xs text-[#8d8374]">Manage your details</p>
                                    </div>
                                    <User className="h-6 w-6 text-[#1a1c1e] opacity-40 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Info Banner */}
                    <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-blue-900">Secure Patient Access</h3>
                                <p className="mt-1 text-sm text-blue-700">All patient records accessed through this portal are encrypted and logged for compliance. Your access is monitored for patient privacy.</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-10 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-[#1a1c1e]">Getting Started</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1c1e] text-white font-bold text-sm">
                                    1
                                </div>
                                <div>
                                    <p className="font-bold text-[#1a1c1e]">Scan a Patient's QR Code</p>
                                    <p className="text-sm text-[#8d8374] mt-1">Use the QR scanner to quickly access a patient's medical passport</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1c1e] text-white font-bold text-sm">
                                    2
                                </div>
                                <div>
                                    <p className="font-bold text-[#1a1c1e]">Review Medical Information</p>
                                    <p className="text-sm text-[#8d8374] mt-1">Access the patient's medical history, allergies, medications, and emergency contacts</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1c1e] text-white font-bold text-sm">
                                    3
                                </div>
                                <div>
                                    <p className="font-bold text-[#1a1c1e]">Update Your Profile</p>
                                    <p className="text-sm text-[#8d8374] mt-1">Keep your professional information and credentials up to date</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
