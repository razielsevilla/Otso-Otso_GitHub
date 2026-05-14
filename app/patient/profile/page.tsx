"use client";

import { useEffect, useState } from 'react';
import { PatientLayout } from '@/components/layout/PatientLayout';
import { Trash2, Plus, AlertTriangle, ChevronUp, ChevronDown, Save, Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // State for collapsible sections
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    basic: false,
    allergies: false,
    medications: false,
    contacts: false,
    notes: false
  });

  const showNotification = (type: 'success' | 'error', text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/patient/profile');
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
        } else {
          showNotification('error', "Failed to load profile");
        }
      } catch (err) {
        showNotification('error', "Connection error");
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  // Handlers for dynamic lists (Add/Remove)
  const addItem = (field: string, defaultValue: object) => {
    setProfile({
      ...profile,
      [field]: [...(profile[field] || []), defaultValue]
    });
  };

  const removeItem = (field: string, index: number) => {
    const newList = [...profile[field]];
    newList.splice(index, 1);
    setProfile({ ...profile, [field]: newList });
  };

  const updateListItem = (field: string, index: number, key: string, value: string) => {
    const newList = [...profile[field]];
    newList[index] = { ...newList[index], [key]: value };
    setProfile({ ...profile, [field]: newList });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/patient/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profile,
          heightCm: profile.heightCm?.toString(),
          weightKg: profile.weightKg?.toString(),
        }),
      });

      if (res.ok) {
        showNotification('success', "Profile updated successfully");
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      showNotification('error', "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <PatientLayout activePath="/patient/profile">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-[#8d8374]">
          <Loader2 className="h-10 w-10 animate-spin" />
          <p className="text-sm font-medium">Fetching records...</p>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout activePath="/patient/profile">
      <div className="mx-auto max-w-5xl space-y-8 pb-20 px-4">
        
        {/* Notification Banner */}
        {notification && (
          <div className={`fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-6 py-4 shadow-2xl animate-in fade-in slide-in-from-top-4 ${
            notification.type === 'success' ? 'bg-[#1a1c1e] text-white' : 'bg-red-600 text-white'
          }`}>
            {notification.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5" />}
            <span className="text-sm font-bold">{notification.text}</span>
          </div>
        )}

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#1a1c1e]">My Medical Profile</h1>
            <p className="mt-2 text-sm text-[#8d8374]">
              {profile.lastUpdated 
                ? `Last updated ${new Date(profile.lastUpdated).toLocaleString('en-PH', { dateStyle: 'long', timeStyle: 'short' })}`
                : "Profile incomplete"}
            </p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-2xl bg-[#1a1c1e] px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </button>
        </div>

        <div className="space-y-6">
          {/* 1. Basic Medical Information */}
          <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 shadow-sm">
            <button onClick={() => toggleSection('basic')} className="flex w-full items-center justify-between border-b border-neutral-100 pb-6 outline-none">
              <h2 className="text-xl font-bold text-[#1a1c1e]">Basic Medical Information</h2>
              {collapsedSections.basic ? <ChevronDown className="h-5 w-5 text-[#8d8374]" /> : <ChevronUp className="h-5 w-5 text-[#8d8374]" />}
            </button>

            {!collapsedSections.basic && (
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Blood Type</label>
                  <select 
                    value={profile.bloodType || ''} 
                    onChange={(e) => setProfile({...profile, bloodType: e.target.value})}
                    className="w-full rounded-2xl border border-neutral-200 bg-[#fbf8f2] px-5 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#1a1c1e]/5"
                  >
                    <option value="">Select type...</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Organ Donor</label>
                  <div className="flex items-center gap-6 py-4">
                    {[true, false].map((val) => (
                      <label key={val.toString()} className="flex items-center gap-2 text-sm font-medium text-[#1a1c1e] cursor-pointer">
                        <input 
                          type="radio" 
                          checked={profile.isOrganDonor === val}
                          onChange={() => setProfile({...profile, isOrganDonor: val})}
                          className="h-4 w-4 accent-[#1a1c1e]" 
                        />
                        {val ? 'Yes' : 'No'}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Height (cm)</label>
                  <input 
                    type="number" 
                    value={profile.heightCm || ''} 
                    onChange={(e) => setProfile({...profile, heightCm: e.target.value})}
                    className="w-full rounded-2xl border border-neutral-200 bg-[#fbf8f2] px-5 py-4 text-sm font-medium outline-none" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#8d8374]">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={profile.weightKg || ''} 
                    onChange={(e) => setProfile({...profile, weightKg: e.target.value})}
                    className="w-full rounded-2xl border border-neutral-200 bg-[#fbf8f2] px-5 py-4 text-sm font-medium outline-none" 
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. Allergies */}
          <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 shadow-sm">
            <button onClick={() => toggleSection('allergies')} className="flex w-full items-center justify-between border-b border-neutral-100 pb-6 outline-none">
              <h2 className="text-xl font-bold text-[#1a1c1e]">Allergies</h2>
              {collapsedSections.allergies ? <ChevronDown className="h-5 w-5 text-[#8d8374]" /> : <ChevronUp className="h-5 w-5 text-[#8d8374]" />}
            </button>

            {!collapsedSections.allergies && (
              <div className="mt-8 space-y-4 animate-in fade-in duration-300">
                {profile.allergies?.map((allergy: any, index: number) => (
                  <div key={index} className="flex flex-wrap items-end gap-4 rounded-[1.5rem] border border-neutral-100 bg-[#fbf8f2]/50 p-5">
                    <div className="min-w-[200px] flex-1 space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#8d8374]">Allergen</label>
                      <input 
                        type="text" 
                        value={allergy.name || ''} 
                        onChange={(e) => updateListItem('allergies', index, 'name', e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none" 
                      />
                    </div>
                    <div className="min-w-[200px] flex-1 space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#8d8374]">Reaction</label>
                      <input 
                        type="text" 
                        value={allergy.reaction || ''} 
                        onChange={(e) => updateListItem('allergies', index, 'reaction', e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none" 
                      />
                    </div>
                    <button onClick={() => removeItem('allergies', index)} className="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-400 hover:text-red-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('allergies', { name: '', reaction: '' })}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-neutral-300 px-4 py-3 text-sm font-bold text-[#8d8374] hover:bg-neutral-50"
                >
                  <Plus className="h-4 w-4" /> Add Another Allergy
                </button>
              </div>
            )}
          </div>

          {/* 3. Medications */}
          <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 shadow-sm">
            <button onClick={() => toggleSection('medications')} className="flex w-full items-center justify-between border-b border-neutral-100 pb-6 outline-none">
              <h2 className="text-xl font-bold text-[#1a1c1e]">Current Medications</h2>
              {collapsedSections.medications ? <ChevronDown className="h-5 w-5 text-[#8d8374]" /> : <ChevronUp className="h-5 w-5 text-[#8d8374]" />}
            </button>
            {!collapsedSections.medications && (
              <div className="mt-8 space-y-6 animate-in fade-in duration-300">
                {profile.medications?.map((med: any, index: number) => (
                  <div key={index} className="flex flex-wrap items-end gap-4 rounded-[1.5rem] border border-neutral-100 bg-[#fbf8f2]/50 p-5">
                    <div className="min-w-[200px] flex-1 space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#8d8374]">Medication</label>
                      <input 
                        type="text" 
                        value={med.name || ''} 
                        onChange={(e) => updateListItem('medications', index, 'name', e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none" 
                      />
                    </div>
                    <div className="min-w-[200px] flex-1 space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#8d8374]">Dosage</label>
                      <input 
                        type="text" 
                        value={med.dosage || ''} 
                        onChange={(e) => updateListItem('medications', index, 'dosage', e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none" 
                      />
                    </div>
                    <button onClick={() => removeItem('medications', index)} className="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('medications', { name: '', dosage: '' })}
                  className="flex items-center gap-2 rounded-xl border border-dashed border-neutral-300 px-4 py-3 text-sm font-bold text-[#8d8374] hover:bg-neutral-50"
                >
                  <Plus className="h-4 w-4" /> Add Another Medication
                </button>
              </div>
            )}
          </div>

          {/* 4. Emergency Contacts */}
          <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 shadow-sm">
            <button onClick={() => toggleSection('contacts')} className="flex w-full items-center justify-between border-b border-neutral-100 pb-6 outline-none">
              <h2 className="text-xl font-bold text-[#1a1c1e]">Emergency Contacts</h2>
              {collapsedSections.contacts ? <ChevronDown className="h-5 w-5 text-[#8d8374]" /> : <ChevronUp className="h-5 w-5 text-[#8d8374]" />}
            </button>
            {!collapsedSections.contacts && (
              <div className="mt-8 space-y-4 animate-in fade-in duration-300">
                {profile.emergencyContacts?.map((contact: any, index: number) => (
                  <div key={index} className="flex flex-wrap items-end gap-4 rounded-[1.5rem] border border-neutral-100 bg-[#fbf8f2]/50 p-5">
                    <div className="min-w-[200px] flex-1 space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#8d8374]">Name</label>
                      <input 
                        type="text" 
                        value={contact.name || ''} 
                        onChange={(e) => updateListItem('emergencyContacts', index, 'name', e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none" 
                      />
                    </div>
                    <div className="min-w-[200px] flex-1 space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-[#8d8374]">Phone</label>
                      <input 
                        type="text" 
                        value={contact.mobile || ''} 
                        onChange={(e) => updateListItem('emergencyContacts', index, 'mobile', e.target.value)}
                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none" 
                      />
                    </div>
                    <button onClick={() => removeItem('emergencyContacts', index)} className="flex h-11 w-11 items-center justify-center rounded-xl text-neutral-400 hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => addItem('emergencyContacts', { name: '', mobile: '' })}
                  className="flex items-center gap-2 rounded-xl border border-dashed border-neutral-300 px-4 py-3 text-sm font-bold text-[#8d8374] hover:bg-neutral-50"
                >
                  <Plus className="h-4 w-4" /> Add Another Contact
                </button>
              </div>
            )}
          </div>

          {/* 5. Additional Notes */}
          <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 shadow-sm">
            <button onClick={() => toggleSection('notes')} className="flex w-full items-center justify-between border-b border-neutral-100 pb-6 outline-none">
              <h2 className="text-xl font-bold text-[#1a1c1e]">Additional Notes</h2>
              {collapsedSections.notes ? <ChevronDown className="h-5 w-5 text-[#8d8374]" /> : <ChevronUp className="h-5 w-5 text-[#8d8374]" />}
            </button>
            {!collapsedSections.notes && (
              <div className="mt-8 animate-in fade-in duration-300">
                <textarea
                  placeholder="Anything else first responders should know..."
                  value={profile.notes || ''}
                  onChange={(e) => setProfile({...profile, notes: e.target.value})}
                  className="min-h-[120px] w-full rounded-2xl border border-neutral-200 bg-[#fbf8f2]/50 p-6 text-sm outline-none focus:ring-2 focus:ring-[#1a1c1e]/5"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
}