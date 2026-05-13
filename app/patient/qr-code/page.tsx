"use client";

import { useEffect, useState } from 'react';
import { Download, Printer, RefreshCcw } from 'lucide-react';

import { PatientLayout } from '@/components/layout/PatientLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import LunasLoader from '@/components/ui/loader';

type QrResponse = {
  qrUuid: string;
  qrImageBase64: string;
};

export default function PatientQrCodePage() {
  const [qrCode, setQrCode] = useState<QrResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadQrCode = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/patient/qr', { cache: 'no-store' });
        const data = (await response.json()) as Partial<QrResponse> & { error?: string };

        if (!response.ok) {
          throw new Error(data.error || 'Unable to load QR code.');
        }

        if (!cancelled) {
          setQrCode({ qrUuid: data.qrUuid ?? '', qrImageBase64: data.qrImageBase64 ?? '' });
          setError(null);
        }
      } catch (fetchError: any) {
        if (!cancelled) {
          setError(fetchError.message || 'Unable to load QR code.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadQrCode();

    return () => {
      cancelled = true;
    };
  }, []);

  const downloadQrCode = () => {
    if (!qrCode?.qrImageBase64) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${qrCode.qrImageBase64}`;
    link.download = 'lunas-qr-code.png';
    link.click();
  };

  const printQrCode = () => window.print();

  const refreshQrCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/patient/qr', { cache: 'no-store' });
      const data = (await response.json()) as Partial<QrResponse> & { error?: string };
      if (!response.ok) throw new Error(data.error || 'Unable to load QR code.');
      setQrCode({ qrUuid: data.qrUuid ?? '', qrImageBase64: data.qrImageBase64 ?? '' });
    } catch (refreshError: any) {
      setError(refreshError.message || 'Unable to load QR code.');
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Full Page Loading State (Outside the Card)
  if (isLoading) {
    return (
      <PatientLayout activePath="/patient/qr-code">
        <div className="flex h-[60vh] w-full items-center justify-center">
          <LunasLoader />
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout activePath="/patient/qr-code">
      <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">My QR Code</h1>
            <p className="mt-2 text-sm text-[#8d8374]">Your permanent emergency access code.</p>
          </div>
          <Badge variant="success">Permanent</Badge>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
            <Button variant="outline" className="mt-4 block" onClick={refreshQrCode}>Try Again</Button>
          </div>
        ) : qrCode ? (
          <Card className="overflow-hidden rounded-[2.5rem] border-neutral-200 shadow-sm">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-2xl font-bold">Emergency passport QR</CardTitle>
              <CardDescription>Use this QR code to open your medical record in emergency situations.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
                <div className="flex items-center justify-center rounded-[2.5rem] bg-[#fbf8f2] p-12 ring-1 ring-neutral-100">
                  <img
                    src={`data:image/png;base64,${qrCode.qrImageBase64}`}
                    alt="Patient QR code"
                    className="h-auto w-full max-w-[320px] rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl"
                  />
                </div>

                <div className="flex flex-col justify-center space-y-4">
                  <div className="rounded-2xl border border-neutral-200 bg-[#fbf8f2] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Passport UUID</p>
                    <p className="mt-2 break-all font-mono text-xs font-semibold text-[#1a1c1e]">{qrCode.qrUuid}</p>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button 
                      className="w-full h-12 rounded-xl bg-[#1a1c1e] text-white" 
                      onClick={downloadQrCode}
                    >
                      <Download className="mr-2 h-4 w-4" /> Download PNG
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-12 rounded-xl" 
                      onClick={printQrCode}
                    >
                      <Printer className="mr-2 h-4 w-4" /> Print Passport
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="w-full h-12 rounded-xl" 
                      onClick={refreshQrCode}
                    >
                      <RefreshCcw className="mr-2 h-4 w-4" /> Refresh Code
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </PatientLayout>
  );
}