'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { NonFatalDiagnosticLog } from '@/lib/alyx-schema';

interface DiagnosticContextValue {
  logs: NonFatalDiagnosticLog[];
  pushNonFatalLog: (
    level: NonFatalDiagnosticLog['level'],
    source: string,
    message: string,
    stackDigest?: string
  ) => void;
  ignoreLog: (id: string) => void;
  ignoreAllLogs: () => void;
  clearLogs: () => void;
  copyDevGeniusSlurp: () => Promise<boolean>;
  triggerSimulatedNonFatalBreak: () => void;
}

const DiagnosticContext = createContext<DiagnosticContextValue | null>(null);

const INITIAL_LOGS: NonFatalDiagnosticLog[] = [
  {
    id: 'diag-boot-1',
    timestamp: '14:01:52',
    level: 'PROVIDER_SYNC',
    source: 'AlyxProviderStack::Hydration',
    message:
      'ALYX_BIN_V1 vault & Alexander 190-IQ Dossier mounted into isolated React Provider tree.',
    stackDigest: 'ProviderTree -> NonFatalErrorBoundary -> ViewPanel1 & ViewPanel2',
    ignoredByAlexander: false,
  },
];

export function useAlyxDiagnostics() {
  const ctx = useContext(DiagnosticContext);
  if (!ctx) {
    throw new Error('useAlyxDiagnostics must be used within AlyxProviderStack');
  }
  return ctx;
}

interface BoundaryProps {
  children: React.ReactNode;
  zoneName: string;
  onCaughtError: (source: string, error: Error, componentStack?: string) => void;
}

interface BoundaryState {
  hasError: boolean;
  lastErrorMessage: string | null;
}

/**
 * Non-Fatal Isolating Error Boundary
 * Catches runtime render errors, converts them into ignorable non-fatal diagnostic slurp logs,
 * and allows instant in-place self-healing recovery so the app never white-screens.
 */
export class AlyxNonFatalErrorBoundary extends React.Component<BoundaryProps, BoundaryState> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = { hasError: false, lastErrorMessage: null };
  }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return {
      hasError: true,
      lastErrorMessage: error?.message || 'Unknown render exception isolated',
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onCaughtError(
      `ErrorBoundary[${this.props.zoneName}]`,
      error,
      errorInfo.componentStack || undefined
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-3 m-2 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-amber-300">
              [{this.props.zoneName}] Non-Fatal Render Exception Isolated:
            </span>{' '}
            <span className="font-mono">{this.state.lastErrorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, lastErrorMessage: null })}
            className="px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 font-medium whitespace-nowrap shrink-0"
          >
            Ignore &amp; Resume Zone
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function AlyxProviderStack({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<NonFatalDiagnosticLog[]>(INITIAL_LOGS);

  const pushNonFatalLog = useCallback(
    (
      level: NonFatalDiagnosticLog['level'],
      source: string,
      message: string,
      stackDigest?: string
    ) => {
      const now = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setLogs((prev) => [
        {
          id: `diag-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          timestamp: now,
          level,
          source,
          message,
          stackDigest,
          ignoredByAlexander: false,
        },
        ...prev.slice(0, 49),
      ]);
    },
    []
  );

  // Intercept unhandled window errors & promise rejections as non-fatal slurp payloads
  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      pushNonFatalLog(
        'NONFATAL_WARN',
        event.filename ? `WindowError[${event.filename.split('/').pop()}]` : 'WindowError',
        event.message || 'Unhandled runtime warning intercepted',
        event.error?.stack ? String(event.error.stack).slice(0, 360) : undefined
      );
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reasonMsg =
        event.reason instanceof Error
          ? event.reason.message
          : String(event.reason || 'Unhandled async rejection');
      const reasonStack =
        event.reason instanceof Error && event.reason.stack
          ? String(event.reason.stack).slice(0, 360)
          : undefined;
      pushNonFatalLog('ZOD_SLURP', 'UnhandledPromiseRejection', reasonMsg, reasonStack);
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleRejection);
    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [pushNonFatalLog]);

  const ignoreLog = useCallback((id: string) => {
    setLogs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ignoredByAlexander: true } : item))
    );
  }, []);

  const ignoreAllLogs = useCallback(() => {
    setLogs((prev) => prev.map((item) => ({ ...item, ignoredByAlexander: true })));
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const copyDevGeniusSlurp = useCallback(async () => {
    const slurpBundle = {
      slurpHeader: 'ALYX_DEV_GENIUS_DIAGNOSTIC_SLURP_V1',
      capturedAt: new Date().toISOString(),
      partner: 'Alexander (190 IQ / 160 SQ / 145 EQ)',
      totalLogs: logs.length,
      nonFatalEvents: logs,
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(slurpBundle, null, 2));
      return true;
    } catch {
      return false;
    }
  }, [logs]);

  const triggerSimulatedNonFatalBreak = useCallback(() => {
    pushNonFatalLog(
      'BOUNDARY_CAUGHT',
      'ViewPanel2::ShaderTelemetrySubroutine',
      'Non-fatal WebGL/SVG frame interpolation jitter detected (delta +4.2ms). Auto-recovered by ProviderStack.',
      'at KawaiiLerpOscillator (ViewPanel1Telemetry.tsx:174:11)\nat AlyxNonFatalErrorBoundary (AlyxProviderStack.tsx:68:5)'
    );
  }, [pushNonFatalLog]);

  return (
    <DiagnosticContext.Provider
      value={{
        logs,
        pushNonFatalLog,
        ignoreLog,
        ignoreAllLogs,
        clearLogs,
        copyDevGeniusSlurp,
        triggerSimulatedNonFatalBreak,
      }}
    >
      <AlyxNonFatalErrorBoundary
        zoneName="RootWorkspaceProvider"
        onCaughtError={(source, err, stack) =>
          pushNonFatalLog('BOUNDARY_CAUGHT', source, err.message, stack)
        }
      >
        {children}
      </AlyxNonFatalErrorBoundary>
    </DiagnosticContext.Provider>
  );
}
