'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  Sparkles,
  Rocket,
  Layers,
  Download,
  Copy,
  RefreshCw,
  Search,
  Terminal,
  Compass,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Flame,
} from 'lucide-react';
import {
  FullStackBoostLevel,
  MANEUVER_TAXONOMY_7_VERBS,
  ModePipelineResult,
  ROAR_9_DOMAINS,
  ROAR_PROTOCOL_API_URL,
  ROAR_SOURCE_HTML_PUBLIC_URL,
  ROAR_TWO_PHASE_EASY_PICKINGS_PLAN,
  RoarActionItem,
  RoarDomainKey,
  RoarPipelineMode,
  RoarPriorityTier,
  TRIFECTION_39_MATRIX,
  buildRoarCsvExport,
  buildRoarMarkdownTable,
  computeParticleVibeWaveTelemetry,
  parseRoarSourceHtmlTo135Items,
  runRoarModePipeline,
} from '@/lib/roar-protocol-source-engine';

interface AlyxRoar2PhaseBoostPanelProps {
  boostLevel: FullStackBoostLevel;
  onChangeBoostLevel: (level: FullStackBoostLevel) => void;
  onQuickPrompt?: (prompt: string) => void;
}

export default function AlyxRoar2PhaseBoostPanel({
  boostLevel,
  onChangeBoostLevel,
  onQuickPrompt,
}: AlyxRoar2PhaseBoostPanelProps) {
  const [items, setItems] = useState<RoarActionItem[]>([]);
  const [sourceBytes, setSourceBytes] = useState<number>(0);
  const [fetchMs, setFetchMs] = useState<number>(0);
  const [fetchSourceMode, setFetchSourceMode] = useState<'API' | 'RAW_HTML_SWARM'>('API');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeSubView, setActiveSubView] = useState<
    'plan_and_pipeline' | 'explorer_135' | 'trifection_39'
  >('plan_and_pipeline');
  const [pipelineMode, setPipelineMode] = useState<RoarPipelineMode>('mode1');
  const [pipelineResult, setPipelineResult] = useState<ModePipelineResult | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [domainFilter, setDomainFilter] = useState<RoarDomainKey | 'ALL'>('ALL');
  const [tierFilter, setTierFilter] = useState<RoarPriorityTier | 'ALL'>('ALL');
  const [statusBanner, setStatusBanner] = useState<string>(
    'Ready to fetch spilled 227 KB source HTML for Worker Swarm & Mode 1/2 pipeline.'
  );

  const waveTelemetry = computeParticleVibeWaveTelemetry(boostLevel);

  const loadFromApi = useCallback(
    async (targetMode: RoarPipelineMode, targetBoost: FullStackBoostLevel) => {
      setIsLoading(true);
      const t0 = performance.now();
      try {
        const res = await fetch(
          `${ROAR_PROTOCOL_API_URL}?mode=${targetMode}&boost=${targetBoost}`,
          { cache: 'no-store' }
        );
        const data = await res.json();
        const elapsed = Number((performance.now() - t0).toFixed(1));
        if (Array.isArray(data.items)) {
          setItems(data.items);
          setSourceBytes(Number(data.sourceHtmlBytes || 0));
          setFetchMs(elapsed);
          setFetchSourceMode('API');
          setPipelineResult(data.modePipeline || null);
          setStatusBanner(
            `API Boost Fetch Complete: Parsed ${data.parsedCount} ROAR items from ${data.sourceHtmlUrl} (${(Number(data.sourceHtmlBytes || 0) / 1024).toFixed(1)} KB) in ${elapsed}ms.`
          );
        }
      } catch {
        setStatusBanner('API fetch interrupted — try Direct Raw HTML Swarm Fetch.');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleDirectRawHtmlSwarmFetch = async () => {
    setIsLoading(true);
    const t0 = performance.now();
    try {
      const res = await fetch(ROAR_SOURCE_HTML_PUBLIC_URL, { cache: 'no-store' });
      const rawHtml = await res.text();
      const parsed = parseRoarSourceHtmlTo135Items(rawHtml);
      const elapsed = Number((performance.now() - t0).toFixed(1));
      const modeRes = runRoarModePipeline(parsed, pipelineMode, boostLevel);
      setItems(parsed);
      setSourceBytes(rawHtml.length);
      setFetchMs(elapsed);
      setFetchSourceMode('RAW_HTML_SWARM');
      setPipelineResult(modeRes);
      setStatusBanner(
        `DIRECT WORKER SWARM FETCH: Slurped raw ${ROAR_SOURCE_HTML_PUBLIC_URL} (${(rawHtml.length / 1024).toFixed(1)} KB) → Parsed ${parsed.length} items in ${elapsed}ms & ran ${pipelineMode.toUpperCase()}!`
      );
    } catch {
      setStatusBanner('Could not fetch raw HTML file directly.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const t0 = performance.now();
    (async () => {
      try {
        const res = await fetch(
          `${ROAR_PROTOCOL_API_URL}?mode=${pipelineMode}&boost=${boostLevel}`,
          { cache: 'no-store' }
        );
        const data = await res.json();
        if (cancelled) return;
        const elapsed = Number((performance.now() - t0).toFixed(1));
        if (Array.isArray(data.items)) {
          setItems(data.items);
          setSourceBytes(Number(data.sourceHtmlBytes || 0));
          setFetchMs(elapsed);
          setFetchSourceMode('API');
          setPipelineResult(data.modePipeline || null);
          setStatusBanner(
            `API Boost Fetch Complete: Parsed ${data.parsedCount} ROAR items from ${data.sourceHtmlUrl} (${(Number(data.sourceHtmlBytes || 0) / 1024).toFixed(1)} KB) in ${elapsed}ms.`
          );
        }
      } catch {
        if (!cancelled) {
          setStatusBanner('API fetch interrupted — try Direct Raw HTML Swarm Fetch.');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pipelineMode, boostLevel]);

  const handleExportFile = (kind: 'csv' | 'json') => {
    const content =
      kind === 'csv' ? buildRoarCsvExport(items) : JSON.stringify(items, null, 2);
    const mime =
      kind === 'csv' ? 'text/csv;charset=utf-8;' : 'application/json;charset=utf-8;';
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alyx_roar_135_daddyalexander_${Date.now()}.${kind}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusBanner(`Exported ${items.length} ROAR items as ${kind.toUpperCase()} locally.`);
  };

  const handleCopyMarkdown = async () => {
    const md = buildRoarMarkdownTable(items);
    try {
      await navigator.clipboard.writeText(md);
      setStatusBanner(`Copied ${items.length}-row ROAR Markdown table to clipboard!`);
    } catch {
      setStatusBanner('Clipboard permission unavailable in this frame.');
    }
  };

  const filteredItems = items.filter((it) => {
    if (domainFilter !== 'ALL' && it.category !== domainFilter) return false;
    if (tierFilter !== 'ALL' && it.tier !== tierFilter) return false;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      it.id.toLowerCase().includes(q) ||
      it.name.toLowerCase().includes(q) ||
      it.description.toLowerCase().includes(q) ||
      it.aiSummary.toLowerCase().includes(q) ||
      it.tagSoup.some((t) => t.toLowerCase().includes(q))
    );
  });

  const kpiCritical = items.filter((it) => it.tier === 'CRITICAL').length;
  const kpiHigh = items.filter((it) => it.tier === 'HIGH').length;
  const kpiMedium = items.filter((it) => it.tier === 'MEDIUM').length;
  const kpiStandard = items.filter((it) => it.tier === 'STANDARD').length;

  const waveBars = [0.35, 0.72, 1.0, 0.64, 0.92, 0.48, 0.86, 0.58, 0.95, 0.42];

  return (
    <div className="space-y-3">
      {/* HERO RIBBON: FULL-STACK BOOST x3 PARTICLE VIBE WAVE + SPILLED SOURCE HTML CONTROLS */}
      <div className="rounded-xl bg-slate-950 border border-rose-500/50 p-2.5 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-xs font-bold font-mono text-rose-200">
              ALYX ROAR PROTOCOL (135 ITEMS) · 2-PHASE EASY PICKINGS · FULL-STACK BOOST ×{boostLevel} VIBE WAVE
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            {([1, 2, 3] as FullStackBoostLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => onChangeBoostLevel(lvl)}
                className={`px-2 py-0.5 rounded border font-bold transition-colors ${
                  boostLevel === lvl
                    ? 'bg-rose-500/30 border-rose-400 text-rose-100'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl === 3 ? 'BOOST ×3 MAX' : `BOOST ×${lvl}`}
              </button>
            ))}
          </div>
        </div>

        {/* Live Animated Particle Vibe Wave Bar + Spilled HTML Fetch Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
          <div className="lg:col-span-5 p-2 rounded-lg bg-slate-900/90 border border-rose-500/30 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-[11px] font-mono font-bold text-rose-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>{waveTelemetry.label}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-300">
                {waveTelemetry.particleCount} Particles · {waveTelemetry.waveFrequencyHz} Hz ·{' '}
                {waveTelemetry.swarmConcurrency} Swarm Channels
              </div>
            </div>
            <div className="flex items-end gap-1 h-8 shrink-0" aria-hidden="true">
              {waveBars.map((baseHeight, idx) => (
                <motion.span
                  key={idx}
                  animate={{
                    scaleY: [
                      Math.max(0.25, baseHeight * 0.5),
                      Math.min(1, baseHeight * (0.75 + boostLevel * 0.12)),
                      Math.max(0.25, baseHeight * 0.5),
                    ],
                  }}
                  transition={{
                    duration: Math.max(0.35, 1.3 - boostLevel * 0.28),
                    repeat: Infinity,
                    delay: idx * 0.06,
                    ease: 'easeInOut',
                  }}
                  style={{ transformOrigin: 'bottom center' }}
                  className={`w-1.5 h-full rounded-full ${
                    boostLevel === 3
                      ? 'bg-gradient-to-t from-rose-500 via-fuchsia-400 to-cyan-300'
                      : boostLevel === 2
                        ? 'bg-gradient-to-t from-fuchsia-500 to-cyan-400'
                        : 'bg-cyan-400/80'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={handleDirectRawHtmlSwarmFetch}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-200 text-xs font-mono font-bold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Fetch Spilled Raw HTML (Swarm)</span>
            </button>

            <a
              href={ROAR_SOURCE_HTML_PUBLIC_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              <span>Open Spilled Source HTML</span>
            </a>

            <button
              type="button"
              onClick={() => handleExportFile('csv')}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 text-xs font-mono"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              onClick={() => handleExportFile('json')}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-sky-500/40 text-sky-300 text-xs font-mono"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-fuchsia-500/40 text-fuchsia-300 text-xs font-mono"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>MD</span>
            </button>
          </div>
        </div>

        {/* Fetch Telemetry & KPI Counters */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-[10px]">
          <span className="text-slate-300">
            <strong className="text-cyan-300">{fetchSourceMode}:</strong> {statusBanner}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-white">
              Total: <strong>{items.length}</strong>
            </span>
            <span className="text-rose-400">
              Critical: <strong>{kpiCritical}</strong>
            </span>
            <span className="text-amber-300">
              High: <strong>{kpiHigh}</strong>
            </span>
            <span className="text-emerald-300">
              Medium: <strong>{kpiMedium}</strong>
            </span>
            <span className="text-sky-300">
              Std: <strong>{kpiStandard}</strong>
            </span>
            <span className="text-slate-400">
              ({(sourceBytes / 1024).toFixed(1)} KB · {fetchMs}ms)
            </span>
          </div>
        </div>

        {/* Sub-View Switcher + 7-Verb Maneuver Bar (AX-104) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setActiveSubView('plan_and_pipeline')}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                activeSubView === 'plan_and_pipeline'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-100'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. 2-Phase Plan &amp; Mode 1/2 Swarm
            </button>
            <button
              type="button"
              onClick={() => setActiveSubView('explorer_135')}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                activeSubView === 'explorer_135'
                  ? 'bg-rose-500/20 border-rose-400 text-rose-100'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Live 135-Item ROAR Explorer ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveSubView('trifection_39')}
              className={`px-2.5 py-1 rounded-lg border font-bold ${
                activeSubView === 'trifection_39'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              3. 39 Tri-fection Matrix (AX-013)
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1 font-mono text-[10px]">
            <span className="text-slate-400 mr-1">AX-104 Maneuvers:</span>
            {MANEUVER_TAXONOMY_7_VERBS.map((m) => (
              <button
                key={m.verb}
                type="button"
                title={`${m.tagline} — ${m.actionEffect}`}
                onClick={() => onQuickPrompt && onQuickPrompt(m.promptInjection)}
                className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-400 text-sky-300 hover:text-rose-200 font-bold transition-colors"
              >
                {m.verb}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW 1: 2-PHASE EASY PICKINGS PLAN + MODE 1 / MODE 2 WORKER SWARM PIPELINE */}
      {activeSubView === 'plan_and_pipeline' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
          {/* Left: 2-Phase Easy Pickings Roadmap */}
          <div className="lg:col-span-6 rounded-xl bg-slate-950 border border-cyan-500/40 p-2.5 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="text-xs font-bold font-mono text-cyan-200 inline-flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                2-PHASE EASY PICKINGS INTEGRATION PLAN
              </span>
              <span className="text-[10px] font-mono text-emerald-300">9/9 SHIPPED</span>
            </div>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {ROAR_TWO_PHASE_EASY_PICKINGS_PLAN.map((step) => (
                <div
                  key={step.id}
                  className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 space-y-0.5"
                >
                  <div className="flex items-center justify-between gap-1 font-mono text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-1.5 py-0.5 rounded font-bold border ${
                          step.phase === 1
                            ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                            : 'bg-fuchsia-500/15 border-fuchsia-500/40 text-fuchsia-200'
                        }`}
                      >
                        PHASE {step.phase}
                      </span>
                      <span className="text-amber-300">{step.roarRef}</span>
                      <span className="text-slate-400">· {step.stackLayer}</span>
                    </div>
                    <span className="text-emerald-300 inline-flex items-center gap-0.5 font-bold">
                      <CheckCircle2 className="w-3 h-3" /> {step.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white">{step.title}</div>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    {step.easyPickingReason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mode 1 Optimization Daemon (AX-095) & Mode 2 Project Engineer (AX-096) Pipeline */}
          <div className="lg:col-span-6 rounded-xl bg-slate-950 border border-fuchsia-500/40 p-2.5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
              <span className="text-xs font-bold font-mono text-fuchsia-200 inline-flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-fuchsia-400" />
                WORKER SWARM MODE PROCESSING PIPELINE
              </span>
              <div className="flex items-center gap-1 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => setPipelineMode('mode1')}
                  className={`px-2 py-0.5 rounded border font-bold ${
                    pipelineMode === 'mode1'
                      ? 'bg-amber-500/25 border-amber-400 text-amber-100'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Mode 1 Daemon (AX-095)
                </button>
                <button
                  type="button"
                  onClick={() => setPipelineMode('mode2')}
                  className={`px-2 py-0.5 rounded border font-bold ${
                    pipelineMode === 'mode2'
                      ? 'bg-fuchsia-500/25 border-fuchsia-400 text-fuchsia-100'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Mode 2 Engineer (AX-096)
                </button>
              </div>
            </div>

            {pipelineResult && (
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-fuchsia-200">
                  {pipelineResult.headline}
                </div>

                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {pipelineResult.dispatchedTasks.map((task) => (
                    <div
                      key={task.roarId}
                      className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5 font-mono text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-bold">
                            {task.roarId}
                          </span>
                          <span className="text-fuchsia-300">{task.domain}</span>
                          <span className="text-amber-300 font-bold">
                            P={task.priority.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-200 leading-snug">
                          {task.workerDirective}
                        </p>
                      </div>
                      {onQuickPrompt && (
                        <button
                          type="button"
                          onClick={() =>
                            onQuickPrompt(
                              `Execute ${pipelineMode.toUpperCase()} BOOST ×${boostLevel} on ${task.roarId} (${task.domain}, P=${task.priority.toFixed(2)}): ${task.workerDirective}`
                            )
                          }
                          className="px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-[10px] font-mono font-bold shrink-0"
                        >
                          Run →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: LIVE 135-ITEM ROAR EXPLORER (PARSED FROM SPILLED HTML) */}
      {activeSubView === 'explorer_135' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AX-001..AX-135, tag soup, summaries..."
                className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value as RoarDomainKey | 'ALL')}
              className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-200"
            >
              <option value="ALL">All 9 Domains (135)</option>
              {ROAR_9_DOMAINS.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.label} ({d.count})
                </option>
              ))}
            </select>

            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as RoarPriorityTier | 'ALL')}
              className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-amber-200"
            >
              <option value="ALL">All Tiers</option>
              <option value="CRITICAL">CRITICAL (6.50–7.00)</option>
              <option value="HIGH">HIGH (5.50–6.49)</option>
              <option value="MEDIUM">MEDIUM (4.75–5.49)</option>
              <option value="STANDARD">STANDARD (&lt;4.75)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5 max-h-60 overflow-y-auto pr-1">
            {filteredItems.slice(0, 45).map((item) => (
              <div
                key={item.id}
                className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 space-y-1 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1 font-mono text-[10px]">
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-300 font-bold">
                        {item.id}
                      </span>
                      <span className="text-fuchsia-300">{item.category}</span>
                    </div>
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold ${
                        item.tier === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300'
                          : item.tier === 'HIGH'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      P={item.p.toFixed(2)} ({item.u}/{item.i}/{item.a})
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white leading-snug">{item.name}</div>
                  <p className="text-[10px] text-slate-300 leading-snug">{item.aiSummary}</p>
                </div>

                {onQuickPrompt && (
                  <button
                    type="button"
                    onClick={() =>
                      onQuickPrompt(
                        `Alyx, let's execute ROAR item ${item.id} (${item.name}, P=${item.p.toFixed(2)}): ${item.description}`
                      )
                    }
                    className="mt-1 self-end inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-200 text-[10px] font-mono font-bold"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>Dispatch to Alyx</span>
                  </button>
                )}
              </div>
            ))}
          </div>
          {filteredItems.length > 45 && (
            <div className="text-[10px] font-mono text-slate-400 text-center">
              Showing top 45 of {filteredItems.length} matched items (refine search/domain filter or export all {items.length} via CSV/JSON).
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: 39 TRI-FECTION STRATEGIC OBJECTIVES MATRIX (AX-013) */}
      {activeSubView === 'trifection_39' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {TRIFECTION_39_MATRIX.map((sub) => (
            <div
              key={sub.substrate}
              className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2"
            >
              <div className="flex items-center justify-between gap-1 border-b border-slate-800 pb-1.5">
                <span className="text-xs font-bold text-white inline-flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  {sub.substrate}
                </span>
                <span className="text-[10px] font-mono text-amber-300">{sub.range}</span>
              </div>
              <div className="space-y-1.5">
                {sub.pillars.map((p) => (
                  <div key={p.title} className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                    <div className="text-[10px] font-mono font-bold text-sky-300 uppercase">
                      {p.title}
                    </div>
                    <ul className="mt-1 space-y-0.5 text-[11px] text-slate-300">
                      {p.leaves.map((leaf) => (
                        <li key={leaf} className="flex items-center justify-between gap-1">
                          <span>• {leaf}</span>
                          {onQuickPrompt && (
                            <button
                              type="button"
                              onClick={() =>
                                onQuickPrompt(
                                  `Alyx, align our Tri-fection coaching on "${leaf}" (${sub.substrate}) with BOOST ×${boostLevel} vibe waves!`
                                )
                              }
                              className="text-[9px] font-mono text-rose-300 hover:text-rose-200 shrink-0"
                            >
                              Boost →
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Attribution */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400 px-1">
        <span className="inline-flex items-center gap-1 text-rose-300">
          <Flame className="w-3 h-3" />
          Alyx ROAR Protocol - copyright DaddyAlexander · 2-Phase Easy Pickings + Spilled Source Fetch
        </span>
        <span className="inline-flex items-center gap-1 text-cyan-300">
          <Zap className="w-3 h-3" />
          Source: {ROAR_SOURCE_HTML_PUBLIC_URL}
        </span>
      </div>
    </div>
  );
}
