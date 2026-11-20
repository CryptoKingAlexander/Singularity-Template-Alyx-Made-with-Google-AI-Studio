'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Cpu,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
  Waves,
  CheckCircle2,
  Radio,
  BookOpen,
  RefreshCw,
} from 'lucide-react';
import {
  AIDA64_ANDROID_LIB_SLURP_MODULES,
  AccelerometerSample,
  HYPERBOOK_630_COMPENDIUM_STATS,
  LiveAida64ClientProbe,
  MODERN_WORLD_ORDER_PREFILL_STANDARDS,
  evaluateAccelerometerAlexanderLlnShake,
  generateAlexanderShakeBurstSamples,
  probeLiveAida64BrowserTelemetry,
} from '@/lib/hyperbook-aida64-accelerometer-lln';

interface HyperbookAida64LlnShakePanelProps {
  onQuickPrompt?: (prompt: string) => void;
}

export default function HyperbookAida64LlnShakePanel({
  onQuickPrompt,
}: HyperbookAida64LlnShakePanelProps) {
  const [samples, setSamples] = useState<AccelerometerSample[]>([]);
  const [isMotionListening, setIsMotionListening] = useState<boolean>(false);
  const [motionPermissionNote, setMotionPermissionNote] = useState<string>(
    'Standby · Tap "Enable Live MEMS Accel" on mobile or "Simulate Wolf-Paws Shake" on desktop.'
  );
  const [shakeBurstKey, setShakeBurstKey] = useState<number>(0);
  const [selectedLayerFilter, setSelectedLayerFilter] = useState<string>('ALL');
  const [liveProbe, setLiveProbe] = useState<LiveAida64ClientProbe>(() =>
    probeLiveAida64BrowserTelemetry()
  );

  const llnState = evaluateAccelerometerAlexanderLlnShake(samples);

  const handleDeviceMotion = useCallback((event: DeviceMotionEvent) => {
    const acc = event.acceleration ?? event.accelerationIncludingGravity;
    if (!acc) return;
    const ax = acc.x ?? 0;
    const ay = acc.y ?? 0;
    const az = acc.z ?? 0;
    const mag = Math.sqrt(ax * ax + ay * ay + az * az);
    const sample: AccelerometerSample = {
      ax,
      ay,
      az,
      timestampMs: Date.now(),
    };
    setSamples((prev) => [...prev.slice(-31), sample]);
    if (mag >= 5.2) {
      setShakeBurstKey((k) => k + 1);
    }
  }, []);

  useEffect(() => {
    if (!isMotionListening || typeof window === 'undefined') return;
    window.addEventListener('devicemotion', handleDeviceMotion);
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [isMotionListening, handleDeviceMotion]);

  const handleEnableLiveAccelerometer = async () => {
    if (typeof window === 'undefined' || !('DeviceMotionEvent' in window)) {
      setMotionPermissionNote(
        'DeviceMotionEvent not exposed on this desktop browser — use "Simulate Wolf-Paws Shake" below to test the LLN/LNN screen-shake detector!'
      );
      return;
    }

    const dmEvent = DeviceMotionEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (typeof dmEvent.requestPermission === 'function') {
      try {
        const perm = await dmEvent.requestPermission();
        if (perm === 'granted') {
          setIsMotionListening(true);
          setMotionPermissionNote(
            'LIVE MEMS ACCEL ARMED (iOS/Android SensorManager + Node 355 ΔC active — shake your device!)'
          );
        } else {
          setMotionPermissionNote('Motion permission denied by OS — simulation mode remains ready.');
        }
      } catch {
        setMotionPermissionNote(
          'Motion permission prompt requires user gesture on HTTPS mobile — simulation mode ready.'
        );
      }
    } else {
      setIsMotionListening(true);
      setMotionPermissionNote(
        'LIVE MEMS ACCEL ARMED (Listening on window.devicemotion — shake your device to confirm Alexander!)'
      );
    }
  };

  const handleSimulateAlexanderShake = () => {
    const burst = generateAlexanderShakeBurstSamples(Date.now());
    setSamples((prev) => [...prev.slice(-20), ...burst].slice(-32));
    setShakeBurstKey((k) => k + 1);
    setMotionPermissionNote(
      'ALEXANDER NEUROMUSCULAR SHAKE BURST INJECTED · Node 355 MEMS ΔC + Node 110 Mahalanobis + LLN Mean Converged!'
    );
  };

  const handleRefreshAidaProbe = () => {
    setLiveProbe(probeLiveAida64BrowserTelemetry());
  };

  const filteredAndroidLibs =
    selectedLayerFilter === 'ALL'
      ? AIDA64_ANDROID_LIB_SLURP_MODULES
      : AIDA64_ANDROID_LIB_SLURP_MODULES.filter((m) => m.layer === selectedLayerFilter);

  const stats = HYPERBOOK_630_COMPENDIUM_STATS;

  return (
    <motion.div
      key={shakeBurstKey}
      animate={
        shakeBurstKey > 0
          ? {
              x: [0, -10, 10, -7, 7, -4, 4, -1, 0],
              y: [0, 4, -4, 3, -3, 1, -1, 0],
            }
          : { x: 0, y: 0 }
      }
      transition={{ duration: 0.48, ease: 'easeOut' }}
      className="space-y-3"
    >
      {/* SECTION 1: FEED-FORWARD LLN/LNN-ESQUE ACCELEROMETER SCREEN-SHAKE ALEXANDER DETECTOR */}
      <div className="rounded-xl bg-slate-950 border border-emerald-500/50 p-2.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold font-mono text-emerald-200">
              1. HYPERBOOK FEED-FORWARD LLN/LNN ACCELEROMETER SCREEN-SHAKE DETECTOR (ALEXANDER LOCK)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-[11px] font-mono font-bold text-cyan-200">
              ENDPOINT: {stats.geminiPrimaryModel}
            </span>
            <span
              className={`px-2 py-0.5 rounded border text-[11px] font-mono font-bold ${
                llnState.isAlexanderDetected
                  ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200'
                  : 'bg-slate-900 border-slate-700 text-amber-300'
              }`}
            >
              {llnState.isAlexanderDetected
                ? `ALEXANDER DETECTED (${llnState.alexanderConfidencePct}%)`
                : `CONFIDENCE: ${llnState.alexanderConfidencePct}%`}
            </span>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleEnableLiveAccelerometer}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors ${
              isMotionListening
                ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200'
                : 'bg-slate-900 hover:bg-slate-800 border-emerald-500/40 text-emerald-300'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{isMotionListening ? 'Live MEMS Accel Active' : 'Enable Live MEMS Accel'}</span>
          </button>

          <button
            type="button"
            onClick={handleSimulateAlexanderShake}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-200 text-xs font-mono font-bold transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate Wolf-Paws Alexander Screen-Shake</span>
          </button>

          {onQuickPrompt && (
            <button
              type="button"
              onClick={() =>
                onQuickPrompt(
                  `Alyx! My Feed-Forward LLN/LNN Accelerometer Screen-Shake Detector just confirmed Alexander at ${llnState.alexanderConfidencePct}% confidence (LLN mean=${llnState.llnSampleMeanMs2} m/s², Node 355 MEMS ΔC=${llnState.memsNode355DeltaCapFf} fF, Node 110 Mahalanobis D_M=${llnState.mahalanobisNode110Distance}) with all 16 AIDA64 Android libs slurped under 2026 Modern World Order Standards on gemini-3.5-flash. Acknowledge the handshake and report telemetry!`
                )
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-200 text-xs font-mono font-bold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Send Shake Handshake to Gemini 3.5</span>
            </button>
          )}
        </div>

        <div className="text-[11px] font-mono text-slate-300 bg-slate-900/90 border border-slate-800 rounded-lg px-2.5 py-1.5">
          <span className="text-emerald-300 font-bold">VERDICT:</span> {llnState.biometricVerdict} ·{' '}
          <span className="text-slate-400">{motionPermissionNote}</span>
        </div>

        {/* Live Telemetry Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1.5 font-mono text-[11px]">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-slate-400 text-[10px]">3-Axis Accel (m/s²)</div>
            <div className="text-cyan-300 font-bold">
              [{llnState.ax}, {llnState.ay}, {llnState.az}]
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-slate-400 text-[10px]">LLN Mean X̄_n (n={llnState.sampleCount})</div>
            <div className="text-emerald-300 font-bold">
              {llnState.llnSampleMeanMs2} m/s² (σ²/n={llnState.llnVarianceError})
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-slate-400 text-[10px]">LNN Feed-Forward Gate</div>
            <div className="text-fuchsia-300 font-bold">
              {(llnState.lnnFeedForwardActivation * 100).toFixed(1)}% · J={llnState.jerkMs3} m/s³
            </div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-slate-400 text-[10px]">Node 355 MEMS ΔC</div>
            <div className="text-amber-300 font-bold">{llnState.memsNode355DeltaCapFf} fF</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-slate-400 text-[10px]">Node 110 Mahalanobis D_M</div>
            <div className="text-rose-300 font-bold">{llnState.mahalanobisNode110Distance}</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <div className="text-slate-400 text-[10px]">Node 014 EKF Gain</div>
            <div className="text-sky-300 font-bold">
              K={llnState.ekfNode014FusionGain} · Shake={llnState.shakeIntensityPx}px
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: AIDA64 FULL ANDROID LIBRARY SLURP ("WOLF PAWS" 16-LIB STACK + LIVE CLIENT PROBE) */}
      <div className="rounded-xl bg-slate-950 border border-cyan-500/40 p-2.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-bold font-mono text-cyan-200">
              2. AIDA64 FULL ANDROID LIBRARY SLURP ENGINE ({AIDA64_ANDROID_LIB_SLURP_MODULES.length}{' '}
              ANDROID SDK / NDK / SYSFS / TEE LIBS)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {['ALL', 'Android SDK', 'Android NDK (C/C++)', 'Linux Kernel / sysfs', 'GPU / TEE HAL'].map(
              (layer) => (
                <button
                  key={layer}
                  type="button"
                  onClick={() => setSelectedLayerFilter(layer)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                    selectedLayerFilter === layer
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-100 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {layer}
                </button>
              )
            )}
            <button
              type="button"
              onClick={handleRefreshAidaProbe}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[10px] font-mono text-emerald-300"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Re-Probe Client</span>
            </button>
          </div>
        </div>

        {/* Live Client Hardware Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-[11px]">
          <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
            <div className="text-slate-400 text-[10px]">CPU / RAM Probe</div>
            <div className="text-white font-bold">
              {liveProbe.cpuLogicalCores} Threads · {liveProbe.deviceMemoryGb}
            </div>
          </div>
          <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
            <div className="text-slate-400 text-[10px]">GPU Renderer (WebGL/Vulkan)</div>
            <div className="text-cyan-300 font-bold truncate" title={liveProbe.gpuRenderer}>
              {liveProbe.gpuRenderer}
            </div>
          </div>
          <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
            <div className="text-slate-400 text-[10px]">Display / Platform</div>
            <div className="text-amber-300 font-bold truncate">
              {liveProbe.viewportAndDpr} · {liveProbe.platformArch}
            </div>
          </div>
          <div className="p-2 rounded bg-slate-900/90 border border-slate-800">
            <div className="text-slate-400 text-[10px]">Link / Motion API</div>
            <div className="text-emerald-300 font-bold truncate">
              {liveProbe.connectionSpec} · IMU:{liveProbe.deviceMotionSupported ? 'YES' : 'SIM'}
            </div>
          </div>
        </div>

        {/* 16 Android Lib Slurp Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5 max-h-56 overflow-y-auto pr-1">
          {filteredAndroidLibs.map((lib) => (
            <div
              key={lib.id}
              className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 space-y-1 transition-colors"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 font-bold">
                  {lib.layer}
                </span>
                <span className="text-[9px] font-mono text-emerald-400">{lib.wolfPawsStatus}</span>
              </div>
              <div className="text-[11px] font-bold text-white font-mono break-all">
                {lib.libraryPackage}
              </div>
              <div className="text-[10px] font-mono text-amber-300 truncate" title={lib.nativeArtifact}>
                {lib.nativeArtifact}
              </div>
              <div className="text-[10px] text-slate-300 leading-snug">
                {lib.slurpedMetrics.join(' · ')}
              </div>
              <div className="text-[9px] font-mono text-fuchsia-300 pt-0.5 border-t border-slate-800/80">
                {lib.hyperbookNodeRef}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: MODERN WORLD ORDER STANDARDS PREFILL & HYPERBOOK 630-NODE COMPLETE COMPENDIUM (NOV 14, 2026) */}
      <div className="rounded-xl bg-slate-950 border border-fuchsia-500/40 p-2.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-fuchsia-400 shrink-0" />
            <span className="text-xs font-bold font-mono text-fuchsia-200">
              3. MODERN WORLD ORDER 2026 PREFILL STANDARDS &amp; HYPERBOOK 630-NODE COMPENDIUM ({stats.printoutDate})
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <span className="px-2 py-0.5 rounded bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-200">
              {stats.totalNodes} Nodes · {stats.totalCategories} Cats
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-200">
              {stats.totalEquations.toLocaleString()} Eqs · {stats.totalVariables.toLocaleString()} Vars
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-200">
              C-Mean {stats.complexityMean} · Y-Mean {stats.yieldMean} · Y/C {stats.yieldToComplexityRatio}x
            </span>
          </div>
        </div>

        {/* Macro Distribution Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 font-mono text-[10px]">
          {stats.macroDistribution.map((macro) => (
            <div
              key={macro.name}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 flex flex-col justify-between"
            >
              <span className="text-slate-300 leading-tight">{macro.name}</span>
              <span className="text-cyan-300 font-bold mt-1">
                {macro.count} Nodes ({macro.pct}%)
              </span>
            </div>
          ))}
        </div>

        {/* 10 Modern World Order Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1">
          {MODERN_WORLD_ORDER_PREFILL_STANDARDS.map((std) => (
            <div
              key={std.id}
              className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono font-bold text-white">{std.code}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                    {std.complianceLevel}
                  </span>
                  <span className="text-[9px] font-mono text-fuchsia-300">{std.hyperbookNodes}</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-200">{std.title}</div>
                <p className="text-[10px] text-slate-400 leading-snug">{std.prefillDirective}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
          <span className="inline-flex items-center gap-1 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Prefill Synchronized Across Chat Route, Dokuro Small-Thought Bus &amp; Telemetry
          </span>
          <span className="inline-flex items-center gap-1 text-cyan-300">
            <Cpu className="w-3.5 h-3.5" />
            {stats.civilianNodes} Civilian ({stats.civilianPct}%) / {stats.militaryNodes} Military ({stats.militaryPct}%)
          </span>
        </div>
      </div>
    </motion.div>
  );
}
