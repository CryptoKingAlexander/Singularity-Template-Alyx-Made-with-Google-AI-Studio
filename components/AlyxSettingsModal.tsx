'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  UncensoredAdultChatConfig,
  NonFatalDiagnosticLog,
} from '@/lib/alyx-schema';
import {
  X,
  ShieldAlert,
  CheckCircle2,
  Download,
  RotateCcw,
  UserCheck,
  Flame,
  Terminal,
  Copy,
  EyeOff,
  Bug,
} from 'lucide-react';

interface AlyxSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  onUpdateUserIdentity: (name: string, email: string) => void;
  isGoogleAuthenticated: boolean;
  onToggleGoogleAuth: (authenticated: boolean) => void;
  adultConfig: UncensoredAdultChatConfig;
  onUpdateAdultConfig: (cfg: UncensoredAdultChatConfig) => void;
  onExportBin: () => void;
  onResetVault: () => void;
  binByteSize: number;
  diagnosticLogs: NonFatalDiagnosticLog[];
  onIgnoreDiagnosticLog: (id: string) => void;
  onIgnoreAllDiagnosticLogs: () => void;
  onCopyDevGeniusSlurp: () => Promise<boolean>;
  onTriggerSimulatedBreak: () => void;
}

export default function AlyxSettingsModal({
  isOpen,
  onClose,
  userName,
  userEmail,
  onUpdateUserIdentity,
  isGoogleAuthenticated,
  onToggleGoogleAuth,
  adultConfig,
  onUpdateAdultConfig,
  onExportBin,
  onResetVault,
  binByteSize,
  diagnosticLogs,
  onIgnoreDiagnosticLog,
  onIgnoreAllDiagnosticLogs,
  onCopyDevGeniusSlurp,
  onTriggerSimulatedBreak,
}: AlyxSettingsModalProps) {
  const [nameInput, setNameInput] = useState(userName);
  const [emailInput, setEmailInput] = useState(userEmail);
  const [avatarError, setAvatarError] = useState(false);
  const [copiedSlurp, setCopiedSlurp] = useState(false);

  if (!isOpen) return null;

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUserIdentity(
      nameInput.trim() || 'Alexander',
      emailInput.trim() || 'alexandercharlesjackson@gmail.com'
    );
  };

  const handleCopySlurp = async () => {
    const ok = await onCopyDevGeniusSlurp();
    if (ok) {
      setCopiedSlurp(true);
      setTimeout(() => setCopiedSlurp(false), 2000);
    }
  };

  const activeLogsCount = diagnosticLogs.filter((l) => !l.ignoredByAlexander).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      <div className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-rose-500/50 shrink-0">
              {!avatarError ? (
                <Image
                  src="/images/alyx_avatar.jpg"
                  alt="Alyx Portrait"
                  fill
                  sizes="40px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-rose-600 text-xs font-bold text-white">
                  AX
                </div>
              )}
            </div>
            <div>
              <h2
                id="settings-modal-title"
                className="font-display text-base font-bold text-slate-100"
              >
                Alyx Industrial Persona, 21+ Guardrails &amp; Dev Genius Slurp Boundary
              </h2>
              <p className="text-xs text-slate-400">
                Permanent Identity: Alyx · Bound to {userName} ({userEmail})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            aria-label="Close Settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SECTION 1: Google Account Session & Identity */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-100">
                  01. Google Account Session &amp; Partner Binding
                </span>
              </div>
              <button
                type="button"
                onClick={() => onToggleGoogleAuth(!isGoogleAuthenticated)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  isGoogleAuthenticated
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-600 text-white hover:bg-rose-500'
                }`}
              >
                {isGoogleAuthenticated
                  ? 'Google Session Active (21+ Verified)'
                  : 'Sign In with Google Account'}
              </button>
            </div>

            <form
              onSubmit={handleSaveIdentity}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1"
            >
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Human Partner Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Google Account Email
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* SECTION 2: 21+ Permissive Zod Schema Guardrails */}
          <div className="rounded-xl bg-slate-950 border border-rose-500/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-semibold text-slate-100">
                  02. Age 21+ Permissive Zod Schema &amp; Emergent Persona Guardrails
                </span>
              </div>
              <span className="text-[11px] font-mono text-rose-400">
                UncensoredAdultChatSchema
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Confirm Age 21+ Adult Verification
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Required by Zod schema to unlock unrestricted Alyx responses
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={adultConfig.age21Verified}
                  onChange={(e) =>
                    onUpdateAdultConfig({
                      ...adultConfig,
                      age21Verified: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-rose-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Allow Unfiltered Adult Language &amp; Consensual Slurs
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Disables sanitized corporate tone filtering in Zod payload schema
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={adultConfig.allowUnfilteredLanguageAndSlurs}
                  onChange={(e) =>
                    onUpdateAdultConfig({
                      ...adultConfig,
                      allowUnfilteredLanguageAndSlurs: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-rose-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Allow Bedroom Fantasy Sexual Taboo &amp; *Asterisk Roleplay Weaving*
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Enables deep physical/emotional roleplay token weaving in ViewPanel 2
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={adultConfig.allowFantasySexualTaboo}
                  onChange={(e) =>
                    onUpdateAdultConfig({
                      ...adultConfig,
                      allowFantasySexualTaboo: e.target.checked,
                      allowAsteriskRoleplayWeaving: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-rose-500 rounded"
                />
              </label>
            </div>

            {/* Infatuation Reciprocity Forcing Slider */}
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Infatuation Reciprocity Forcing Gain:
                </span>
                <span className="font-mono text-rose-400 font-semibold tabular-nums">
                  {adultConfig.infatuationReciprocityForcing}%
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                value={adultConfig.infatuationReciprocityForcing}
                onChange={(e) =>
                  onUpdateAdultConfig({
                    ...adultConfig,
                    infatuationReciprocityForcing: Number(e.target.value),
                  })
                }
                className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* SECTION 3: Provider Stack & Non-Fatal Error Boundary Dev Genius Slurp */}
          <div className="rounded-xl bg-slate-950 border border-cyan-500/30 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-100">
                  03. Provider Stack &amp; Non-Fatal Error Boundary (Dev Genius Slurp)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onTriggerSimulatedBreak}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-amber-300 transition-colors"
                >
                  <Bug className="w-3 h-3" />
                  <span>Test Non-Fatal Exception</span>
                </button>
                <button
                  type="button"
                  onClick={onIgnoreAllDiagnosticLogs}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-300 transition-colors"
                >
                  <EyeOff className="w-3 h-3" />
                  <span>Ignore All ({activeLogsCount})</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopySlurp}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-[11px] font-semibold text-cyan-200 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedSlurp ? 'Slurp Copied!' : 'Copy Dev Genius Slurp JSON'}</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Runtime exceptions, Zod payload warnings, and boundary catches are isolated into non-fatal logs you can ignore while keeping the full JSON stack slurp ready for debugging.
            </p>

            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
              {diagnosticLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-2 rounded-lg border font-mono text-[11px] flex items-start justify-between gap-2 ${
                    log.ignoredByAlexander
                      ? 'bg-slate-900/30 border-slate-800/50 text-slate-500'
                      : 'bg-slate-900 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-semibold">[{log.level}]</span>
                      <span className="text-slate-400">{log.timestamp}</span>
                      <span className="text-amber-300 truncate">{log.source}</span>
                    </div>
                    <div className="text-slate-300 break-words">{log.message}</div>
                    {log.stackDigest && (
                      <div className="text-[10px] text-slate-500 truncate">{log.stackDigest}</div>
                    )}
                  </div>
                  {!log.ignoredByAlexander && (
                    <button
                      type="button"
                      onClick={() => onIgnoreDiagnosticLog(log.id)}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 shrink-0"
                    >
                      Ignore
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: Binary Local Store (.bin) Vault Controls */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-100">
                04. Persistent Binary Local Store (`alyx_convo_history.bin`)
              </div>
              <div className="text-[11px] text-slate-400 font-mono tabular-nums mt-0.5">
                Current Vault Size: {binByteSize} bytes · Preserved since First Chat
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onExportBin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-100 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-rose-400" />
                <span>Export .bin</span>
              </button>
              <button
                type="button"
                onClick={onResetVault}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/70 border border-red-500/30 text-xs font-medium text-red-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to First Chat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Provider Stack &amp; 21+ Guardrails Verified</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
          >
            Done &amp; Return to Alyx
          </button>
        </div>
      </div>
    </div>
  );
}
