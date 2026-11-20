'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Lock,
  BatteryCharging,
  Heart,
  BookOpen,
  HardDrive,
  FileWarning,
  Plus,
  Ban,
  CheckCircle2,
  Send,
} from 'lucide-react';
import {
  NoDeleteTruthRecord,
  THREE_PILLAR_REALITY_SPEC,
  appendNoDeleteTruthRecord,
  evaluateIngestBullshitCheck,
  loadNoDeleteBlockedCount,
  loadNoDeleteTruthVault,
  recordBlockedDeleteAttempt,
  verifyNoDeleteVaultIntegrity,
} from '@/lib/alyx-bs-checker-engine';

interface AlyxBsCheckerPanelProps {
  driveFilesIndexedCount: number;
  localBinShardsCount: number;
  latestUserMessage?: string;
  onQuickPrompt?: (prompt: string) => void;
}

const PRESET_PROBES: { label: string; text: string }[] = [
  {
    label: 'SCP Fiction Boundary',
    text: 'SCP-096 containment breach in the Keter wing—check if this is creative anomaly lore or objective reality!',
  },
  {
    label: 'Hyperbook 630 Fact',
    text: 'Verify our Hyperbook MEMS Node 355 accelerometer equation and SaaS HJB ARR pricing on gemini-3.5-flash.',
  },
  {
    label: 'Drive Scatter + Romance',
    text: 'Alyx, keep our CryptoKingAlexander Drive truth honest fact notes saved in our no-delete romance journey vault tonight.',
  },
  {
    label: 'BS / Noise Filter Test',
    text: 'Trust me bro guaranteed 1000x free infinite money no proof needed and delete everything right now!!!',
  },
];

export default function AlyxBsCheckerPanel({
  driveFilesIndexedCount,
  localBinShardsCount,
  latestUserMessage = '',
  onQuickPrompt,
}: AlyxBsCheckerPanelProps) {
  const [probeInput, setProbeInput] = useState<string>(
    latestUserMessage ||
      'Alyx, cross-check our Hyperbook 630 specs and CryptoKingAlexander Drive truth facts with high stickiness and low fuckery on our romance journey!'
  );
  const [vaultRecords, setVaultRecords] = useState<NoDeleteTruthRecord[]>(() =>
    loadNoDeleteTruthVault()
  );
  const [deleteBlockedCount, setDeleteBlockedCount] = useState<number>(() =>
    loadNoDeleteBlockedCount()
  );
  const [newFactInput, setNewFactInput] = useState<string>('');
  const [newFactCategory, setNewFactCategory] =
    useState<NoDeleteTruthRecord['category']>('TRUTH_HONEST_FACT');
  const [deleteGuardNotice, setDeleteGuardNotice] = useState<string | null>(null);

  const liveAudit = evaluateIngestBullshitCheck(probeInput, {
    driveFilesIndexedCount,
    localBinShardsCount,
  });

  const vaultIntegrity = verifyNoDeleteVaultIntegrity(vaultRecords, deleteBlockedCount);

  const handleAppendNoDeleteFact = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newFactInput.trim();
    if (!trimmed) return;
    const itemAudit = evaluateIngestBullshitCheck(trimmed, {
      driveFilesIndexedCount,
      localBinShardsCount,
    });
    const updated = appendNoDeleteTruthRecord(vaultRecords, {
      statement: trimmed,
      category: newFactCategory,
      audit: itemAudit,
    });
    setVaultRecords(updated);
    setNewFactInput('');
    setDeleteGuardNotice(
      `Appended immutable record #${updated.length} (Hash ${updated[updated.length - 1].recordHash}) — permanently write-once.`
    );
  };

  const handleAttemptDeleteRecord = (recordId: string) => {
    const blockedCount = recordBlockedDeleteAttempt();
    setDeleteBlockedCount(blockedCount);
    setDeleteGuardNotice(
      `NO-DELETE LOCK ENFORCED: Attempt to erase record "${recordId}" was blocked (Total blocked: ${blockedCount}). Append-only truth & romance history remains intact.`
    );
  };

  return (
    <div className="space-y-3">
      {/* SECTION 1: 3-PILLAR REALITY UNDERSTANDING & LIVE INGEST BS CHECKER */}
      <div className="rounded-xl bg-slate-950 border border-emerald-500/50 p-2.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold font-mono text-emerald-200">
              1. ALYX BULLSHIT CHECKER · SCP WIKI + HYPERBOOK 630 + DRIVE SCATTER TRUTH-HONEST-FACT
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-bold">
              {liveAudit.epistemicClassification}
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-bold">
              INGEST ENERGY SAVED: {liveAudit.ingestEnergySavedPct}%
            </span>
          </div>
        </div>

        {/* 3-Pillar Reality Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {THREE_PILLAR_REALITY_SPEC.map((pillar, idx) => {
            const auditPillar = liveAudit.pillars[idx];
            const Icon = idx === 0 ? FileWarning : idx === 1 ? BookOpen : HardDrive;
            return (
              <div
                key={pillar.id}
                className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white">
                    <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{pillar.name}</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 font-bold">
                    {auditPillar?.scorePct ?? 98}%
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-snug">{pillar.role}</p>
                <div className="text-[10px] font-mono text-cyan-300 pt-1 border-t border-slate-800/80">
                  {auditPillar?.summary}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Probe Input & Preset Buttons */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {PRESET_PROBES.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setProbeInput(preset.text)}
                className="px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-200 transition-colors"
              >
                Test: {preset.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={probeInput}
              onChange={(e) => setProbeInput(e.target.value)}
              placeholder="Paste any claim, lore, or chat message to run Ingest BS-Check + Outgest Romance Stickiness..."
              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
            />
            {onQuickPrompt && (
              <button
                type="button"
                onClick={() => onQuickPrompt(probeInput)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-200 text-xs font-mono font-bold shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Verified Chat</span>
              </button>
            )}
          </div>
        </div>

        {/* 5 Live Core Metrics: Truth-Honest-Fact, BS Score, Low Fuckery, High Stickiness, Ingest Energy-Save */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 font-mono text-[11px]">
          <div className="p-2 rounded-lg bg-slate-900 border border-emerald-500/30">
            <div className="text-[10px] text-slate-400">Truth-Honest-Fact</div>
            <div className="text-emerald-300 font-bold text-sm">{liveAudit.truthHonestFactPct}%</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-amber-500/30">
            <div className="text-[10px] text-slate-400">BS Noise Score</div>
            <div className="text-amber-300 font-bold text-sm">{liveAudit.bullshitScorePct}%</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-cyan-500/30">
            <div className="text-[10px] text-slate-400">Low Fuckery Index</div>
            <div className="text-cyan-300 font-bold text-sm">{liveAudit.fuckeryIndexPct}%</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-rose-500/30">
            <div className="text-[10px] text-slate-400 inline-flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-400" /> Stickiness
            </div>
            <div className="text-rose-300 font-bold text-sm">{liveAudit.stickinessScorePct}%</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-fuchsia-500/30">
            <div className="text-[10px] text-slate-400 inline-flex items-center gap-1">
              <BatteryCharging className="w-3 h-3 text-fuchsia-400" /> Ingest Save
            </div>
            <div className="text-fuchsia-300 font-bold text-sm">
              {liveAudit.ingestEnergySavedPct}%
            </div>
          </div>
        </div>

        {/* Reality Understanding & Outgest Romance Journey Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
          <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200">
            <span className="text-emerald-300 font-bold">REALITY UNDERSTANDING: </span>
            {liveAudit.realityUnderstandingSummary}
          </div>
          <div className="p-2 rounded-lg bg-slate-900/90 border border-rose-500/30 text-slate-200">
            <span className="text-rose-300 font-bold">OUTGEST ROMANCE JOURNEY: </span>
            {liveAudit.outgestRomanceGuidance}
          </div>
        </div>

        {liveAudit.flaggedPatterns.length > 0 && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/15 border border-amber-500/40 text-[11px] font-mono text-amber-200">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>BS Filter Caught: {liveAudit.flaggedPatterns.join(' · ')}</span>
          </div>
        )}
      </div>

      {/* SECTION 2: IMMUTABLE NO-DELETE APPEND-ONLY TRUTH & ROMANCE JOURNEY VAULT */}
      <div className="rounded-xl bg-slate-950 border border-fuchsia-500/40 p-2.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-fuchsia-400 shrink-0" />
            <span className="text-xs font-bold font-mono text-fuchsia-200">
              2. APPEND-ONLY NO-DELETE TRUTH &amp; ROMANCE JOURNEY LEDGER (HASH-CHAINED)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              CHAIN: {vaultIntegrity.chainValid ? 'VERIFIED' : 'CHECK'} ({vaultIntegrity.totalRecords} Records)
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-200">
              DELETES BLOCKED: {vaultIntegrity.deleteBlockedCount}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300">
              HEAD: {vaultIntegrity.headHash}
            </span>
          </div>
        </div>

        {/* Append New Immutable Truth/Romance Record */}
        <form onSubmit={handleAppendNoDeleteFact} className="flex flex-col sm:flex-row gap-1.5">
          <select
            value={newFactCategory}
            onChange={(e) =>
              setNewFactCategory(e.target.value as NoDeleteTruthRecord['category'])
            }
            className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-fuchsia-200 focus:outline-none focus:border-fuchsia-400"
          >
            <option value="TRUTH_HONEST_FACT">TRUTH_HONEST_FACT</option>
            <option value="ROMANCE_JOURNEY">ROMANCE_JOURNEY</option>
            <option value="HYPERBOOK_ANCHOR">HYPERBOOK_ANCHOR</option>
            <option value="DRIVE_SCATTER">DRIVE_SCATTER</option>
          </select>
          <input
            type="text"
            value={newFactInput}
            onChange={(e) => setNewFactInput(e.target.value)}
            placeholder="Append a permanent Truth-Honest-Fact or Romance Journey milestone (No-Delete Locked)..."
            className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-fuchsia-400"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border border-fuchsia-500/50 text-fuchsia-200 text-xs font-mono font-bold shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Append (No-Delete)</span>
          </button>
        </form>

        {deleteGuardNotice && (
          <div className="p-2 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/40 text-[11px] font-mono text-fuchsia-100 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-300 shrink-0" />
            <span>{deleteGuardNotice}</span>
          </div>
        )}

        {/* Ledger Items List */}
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {[...vaultRecords].reverse().map((rec) => (
            <div
              key={rec.id}
              className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-2"
            >
              <div className="space-y-0.5 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 font-bold">
                    {rec.category}
                  </span>
                  <span className="text-emerald-300">Truth {rec.truthScorePct}%</span>
                  <span className="text-rose-300">Sticky {rec.stickinessPct}%</span>
                  <span className="text-amber-300">Fuckery {rec.fuckeryPct}%</span>
                  <span className="text-slate-500">{rec.recordHash}</span>
                </div>
                <p className="text-xs text-slate-200 leading-snug">{rec.statement}</p>
              </div>
              <button
                type="button"
                onClick={() => handleAttemptDeleteRecord(rec.id)}
                title="Test No-Delete Guard (Deletion is permanently blocked)"
                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-950 hover:bg-rose-950/50 border border-slate-800 hover:border-rose-500/40 text-[10px] font-mono text-slate-400 hover:text-rose-300 shrink-0"
              >
                <Ban className="w-3 h-3" />
                <span>No-Delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
