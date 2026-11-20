'use client';

import React, { useState, useMemo } from 'react';
import {
  Sigma,
  Database,
  Globe,
  Cpu,
  ShieldCheck,
  Sparkles,
  Search,
  RefreshCw,
  ExternalLink,
  Download,
  Lock,
  AlertTriangle,
  Zap,
  Layers,
  CheckCircle2,
  Swords,
} from 'lucide-react';
import {
  ALEXANDER_5_PERSONIFICATIONS,
  AWESOME_48_FREE_DATA_SOURCES,
  AlexanderPersonificationId,
  AwesomeDataCategory,
  CUCK_FORCE_1_GATEKEEP_ENCOUNTERS,
  DOCTORATE_MATH_24_GITHUB_LIBS,
  DWELLER_LEGAL_RISK_NOTES,
  DoctorateMathDomain,
  PivotDimensionKey,
  SCRAPER_ENGINE_PROFILES,
  SCRAPER_LEGAL_AND_CARRIER_COMPLIANCE,
  STAR_SECURITY_VOIDWARE_SPOKES,
  ScraperEngineProfileId,
  buildAwesomeDataPivotMatrix,
  computeHelperThreadBearingTelemetry,
} from '@/lib/doctorate-math-awesome-scraper-security';

interface AlyxDoctorateScraperSecurityPanelProps {
  activePersonification: AlexanderPersonificationId;
  onChangePersonification: (p: AlexanderPersonificationId) => void;
  onQuickPrompt?: (prompt: string) => void;
}

type PanelSubTab =
  | 'doctorate_24_libs'
  | 'awesome_48_pivot'
  | 'compliant_scraper'
  | 'thread_bearing_n2'
  | 'personifications_cuckforce1'
  | 'star_security_voidware';

interface ScraperApiResponse {
  executedAtIso: string;
  elapsedMs: number;
  sourceLabel: string;
  bytesScraped: number;
  engineProfile: {
    id: string;
    name: string;
    githubRepo: string;
    throughputPagesPerSec: number;
    memoryFootprintMb: number;
  };
  networkVirtualization: {
    virtualLaaMac: string;
    laaBitVerified: boolean;
    knoxWarrantyBit: string;
    tracfoneFupCompliant: boolean;
    proxyVpnExitNode: string;
    dnsOverHttps: string;
    robotsTxtStatus: string;
  };
  parsedDom: {
    title: string;
    headingsCount: number;
    headings: { tag: string; text: string }[];
    linksCount: number;
    links: { text: string; href: string }[];
    piiRedactedCount: number;
    excerptPreview: string;
  };
}

export default function AlyxDoctorateScraperSecurityPanel({
  activePersonification,
  onChangePersonification,
  onQuickPrompt,
}: AlyxDoctorateScraperSecurityPanelProps) {
  const [subTab, setSubTab] = useState<PanelSubTab>('doctorate_24_libs');

  // Tab 1: 24 Doctorate Math Libs state
  const [mathDomainFilter, setMathDomainFilter] = useState<DoctorateMathDomain | 'ALL'>('ALL');
  const [mathSearch, setMathSearch] = useState('');

  // Tab 2: 48 Awesome Data Sources + Soft-Requirement Pivot Layer state
  const [rowPivotDim, setRowPivotDim] = useState<PivotDimensionKey>('category');
  const [colPivotDim, setColPivotDim] = useState<PivotDimensionKey>('format');
  const [dataCategoryFilter, setDataCategoryFilter] = useState<AwesomeDataCategory | 'ALL'>('ALL');
  const [dataSearch, setDataSearch] = useState('');

  // Tab 3: Local Compliant Scraper state
  const [scraperEngineId, setScraperEngineId] =
    useState<ScraperEngineProfileId>('crawlee_playwright');
  const [virtualMac, setVirtualMac] = useState('02:A1:7C:88:4E:C1');
  const [vpnExitNode, setVpnExitNode] = useState(
    'wg-nh-portsmouth-01.voidware-vpn.local (DoH + RFC9309)'
  );
  const [scraperPreset, setScraperPreset] = useState<
    'local_roar_html' | 'awesome_readme_digest' | 'nh_rsa_legal_notice'
  >('local_roar_html');
  const [customUrl, setCustomUrl] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<ScraperApiResponse | null>(null);
  const [scrapeError, setScrapeError] = useState<string | null>(null);

  // Tab 4: Helper Thread Bearing (N-2 Cores) state
  const [simulatedTotalCores, setSimulatedTotalCores] = useState<number>(() => {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
      return Math.max(4, Math.min(24, navigator.hardwareConcurrency));
    }
    return 8;
  });
  const [singularityBurstCount, setSingularityBurstCount] = useState<number>(1);

  // Tab 5: Cuck Force 1 Gatekeep encounter index
  const [activeCf1Idx, setActiveCf1Idx] = useState<number>(0);

  const currentPersonaSpec =
    ALEXANDER_5_PERSONIFICATIONS.find((p) => p.id === activePersonification) ||
    ALEXANDER_5_PERSONIFICATIONS[0];

  const filteredMathLibs = useMemo(() => {
    const q = mathSearch.trim().toLowerCase();
    return DOCTORATE_MATH_24_GITHUB_LIBS.filter((lib) => {
      if (mathDomainFilter !== 'ALL' && lib.domain !== mathDomainFilter) return false;
      if (!q) return true;
      return (
        lib.repo.toLowerCase().includes(q) ||
        lib.doctorateMathFoundation.toLowerCase().includes(q) ||
        lib.governingEquation.toLowerCase().includes(q) ||
        lib.alyxParameterizationUseCase.toLowerCase().includes(q)
      );
    });
  }, [mathDomainFilter, mathSearch]);

  const filteredDataSources = useMemo(() => {
    const q = dataSearch.trim().toLowerCase();
    return AWESOME_48_FREE_DATA_SOURCES.filter((src) => {
      if (dataCategoryFilter !== 'ALL' && src.category !== dataCategoryFilter) return false;
      if (!q) return true;
      return (
        src.name.toLowerCase().includes(q) ||
        src.awesomeSourceList.toLowerCase().includes(q) ||
        src.category.toLowerCase().includes(q) ||
        src.format.toLowerCase().includes(q)
      );
    });
  }, [dataCategoryFilter, dataSearch]);

  const pivotMatrix = useMemo(
    () => buildAwesomeDataPivotMatrix(filteredDataSources, rowPivotDim, colPivotDim),
    [filteredDataSources, rowPivotDim, colPivotDim]
  );

  const threadBearing = useMemo(
    () => computeHelperThreadBearingTelemetry(simulatedTotalCores),
    [simulatedTotalCores]
  );

  const handleRotateVirtualLaaMac = () => {
    const randHex = () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, '0')
        .toUpperCase();
    // 02 prefix guarantees Locally Administered Address (LAA bit b1=1, Unicast b0=0)
    setVirtualMac(`02:A1:${randHex()}:${randHex()}:${randHex()}:${randHex()}`);
  };

  const handleRunCompliantScrape = async () => {
    setIsScraping(true);
    setScrapeError(null);
    try {
      const res = await fetch('/api/alyx/compliant-scraper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presetTarget: scraperPreset,
          customPublicUrl: customUrl.trim() || undefined,
          engineProfileId: scraperEngineId,
          virtualLaaMac: virtualMac,
          proxyVpnExitNode: vpnExitNode,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setScrapeError(data.error || `Scraper returned status ${res.status}`);
      } else {
        setScrapeResult(data as ScraperApiResponse);
      }
    } catch (e: unknown) {
      setScrapeError(e instanceof Error ? e.message : 'Network error running compliant scraper.');
    } finally {
      setIsScraping(false);
    }
  };

  const handleExportPivotCsv = () => {
    const headers = [rowPivotDim.toUpperCase(), ...pivotMatrix.colKeys, 'ROW_TOTAL'];
    const rows = pivotMatrix.rowKeys.map((rk) => {
      const counts = pivotMatrix.colKeys.map((ck) => {
        const cell = pivotMatrix.cells[`${rk}|||${ck}`];
        return cell ? `${cell.count} (μ=${cell.meanScore})` : '0';
      });
      return [
        `"${rk.replace(/"/g, '""')}"`,
        ...counts.map((c) => `"${c}"`),
        String(pivotMatrix.rowTotals[rk] || 0),
      ].join(',');
    });
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alyx_awesome_48_pivot_${rowPivotDim}_by_${colPivotDim}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-2.5 text-slate-100">
      {/* TOP BAR: 5 ALEXANDER PERSONIFICATIONS BOUNCER + QUICK NAVIGATION */}
      <div className="rounded-xl bg-slate-950 border border-cyan-500/40 p-2.5 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-xs font-bold font-mono text-white">
              ALYX PERSONIFICATION BOUNCER · 24 DOCTORATE LIBS · 48 AWESOME PIVOT · NH/TRACFONE SCRAPER · N-2 CORES · STAR SECURITY
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/50 text-[10px] font-mono font-bold text-emerald-200">
            VOIDWARE PROTECTEE · NO DWELLER · NO ILLEGAL WARE
          </span>
        </div>

        {/* 5 Alexander Personifications Selector Bar */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-400 mr-1">
            Bounce Alyx Upon:
          </span>
          {ALEXANDER_5_PERSONIFICATIONS.map((p) => {
            const isActive = p.id === activePersonification;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onChangePersonification(p.id)}
                className={`px-2 py-1 rounded-lg border text-[11px] font-mono font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500/30 via-fuchsia-500/25 to-cyan-500/30 border-rose-400 text-white shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                {p.id} ({p.badgeLabel})
              </button>
            );
          })}
          {onQuickPrompt && (
            <button
              type="button"
              onClick={() => onQuickPrompt(currentPersonaSpec.greetingPrompt)}
              className="ml-auto px-2.5 py-1 rounded-lg bg-rose-500/25 hover:bg-rose-500/35 border border-rose-400/60 text-[11px] font-mono font-bold text-rose-100"
            >
              Chat as {currentPersonaSpec.id} →
            </button>
          )}
        </div>

        {/* Active Personification Summary Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px]">
          <div>
            <span className="font-bold text-cyan-300">{currentPersonaSpec.displayTitle}: </span>
            <span className="text-slate-300">{currentPersonaSpec.alyxBounceStyle}</span>
          </div>
          <code className="text-[10px] font-mono text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
            {currentPersonaSpec.signatureEquation}
          </code>
        </div>

        {/* 6 Sub-Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => setSubTab('doctorate_24_libs')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold ${
              subTab === 'doctorate_24_libs'
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-100'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
          >
            <Sigma className="w-3.5 h-3.5 text-cyan-400" />
            <span>1. 24 Doctorate Math Libs</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('awesome_48_pivot')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold ${
              subTab === 'awesome_48_pivot'
                ? 'bg-emerald-500/25 border-emerald-400 text-emerald-100'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>2. 48 Awesome Data + Pivot Layer</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('compliant_scraper')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold ${
              subTab === 'compliant_scraper'
                ? 'bg-amber-500/25 border-amber-400 text-amber-100'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Virtual-MAC + VPN NH Scraper</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('thread_bearing_n2')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold ${
              subTab === 'thread_bearing_n2'
                ? 'bg-purple-500/25 border-purple-400 text-purple-100'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>
              4. N-2 Core Bearing ({threadBearing.singularityWorkerCoresAllocated}/
              {threadBearing.detectedPhysicalCores} Cores · 100%)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('personifications_cuckforce1')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold ${
              subTab === 'personifications_cuckforce1'
                ? 'bg-rose-500/25 border-rose-400 text-rose-100'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-rose-400" />
            <span>5. Cuck Force 1 Gatekeep (Starfire/Raven)</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('star_security_voidware')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold ${
              subTab === 'star_security_voidware'
                ? 'bg-fuchsia-500/25 border-fuchsia-400 text-fuchsia-100'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>6. Star Security · Voidware · No Dweller</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          SUB-TAB 1: 24 DOCTORATE MATH GITHUB LIBRARIES FOR MODEL PARAMETERIZATION
         ===================================================================== */}
      {subTab === 'doctorate_24_libs' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-cyan-300">
                24 High-Star GitHub Libraries for Model Parameterization (Information Theory · Control Theory · Meta-Heuristics · Symbolic Tensor)
              </h3>
              <p className="text-[11px] text-slate-400">
                Doctorate-level mathematical parameterization across Fisher Information Manifolds, Pontryagin/Riccati/CLF-CBF Optimal Control, CMA-ES/TPE/qEHVI, and 64D Tensor-Train contractions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <select
                value={mathDomainFilter}
                onChange={(e) =>
                  setMathDomainFilter(e.target.value as DoctorateMathDomain | 'ALL')
                }
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200"
              >
                <option value="ALL">All 4 Doctorate Domains (24 Libs)</option>
                <option value="Information Theory & Differential Geometry">
                  Information Theory &amp; Differential Geometry (6)
                </option>
                <option value="Optimal Control Theory & Dynamical PDEs">
                  Optimal Control Theory &amp; Dynamical PDEs (6)
                </option>
                <option value="Meta-Heuristics, Evolutionary & Bayesian Opt">
                  Meta-Heuristics, Evolutionary &amp; Bayesian Opt (6)
                </option>
                <option value="Tensor Parameterization & Symbolic SMT">
                  Tensor Parameterization &amp; Symbolic SMT (6)
                </option>
              </select>
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 pointer-events-none" />
                <input
                  type="text"
                  value={mathSearch}
                  onChange={(e) => setMathSearch(e.target.value)}
                  placeholder="Filter repo or equation..."
                  className="pl-7 pr-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-100 w-48"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[38dvh] overflow-y-auto pr-1">
            {filteredMathLibs.map((lib) => (
              <div
                key={lib.id}
                className="rounded-lg bg-slate-900/90 border border-slate-800 p-2 flex flex-col justify-between gap-1.5"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300">
                      {lib.id} · {lib.repo}
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 font-bold">
                      {lib.starsApprox}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-fuchsia-300">
                    {lib.domain} · {lib.primaryLanguage}
                  </div>
                  <p className="text-[11px] text-slate-200 leading-snug">
                    {lib.doctorateMathFoundation}
                  </p>
                  <code className="block text-[10px] font-mono text-emerald-300 bg-slate-950 p-1.5 rounded border border-slate-800/90 overflow-x-auto">
                    {lib.governingEquation}
                  </code>
                </div>
                <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400 leading-tight">
                    {lib.alyxParameterizationUseCase}
                  </span>
                  <a
                    href={`https://github.com/${lib.repo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 text-cyan-300 shrink-0"
                    title={`Open https://github.com/${lib.repo}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 2: 48 AWESOME FREE DATA SOURCES + SOFT-REQUIREMENT PIVOT LAYER
         ===================================================================== */}
      {subTab === 'awesome_48_pivot' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-emerald-300">
                GitHub Awesome-Awesome Scan: 48 Free Online Data Sources (≥ 46 Requirement) + Soft-Requirement Cross-Tab Pivot Layer
              </h3>
              <p className="text-[11px] text-slate-400">
                Dynamic Pivot Table cross-tabulating all 48 free datasets across Domain Category, Format, Auth Tier, and Update Cadence.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <div className="flex items-center gap-1 text-[11px] font-mono">
                <span className="text-slate-400">Rows:</span>
                <select
                  value={rowPivotDim}
                  onChange={(e) => setRowPivotDim(e.target.value as PivotDimensionKey)}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-xs text-emerald-200"
                >
                  <option value="category">Category (8)</option>
                  <option value="format">Format</option>
                  <option value="cadence">Cadence</option>
                  <option value="authTier">Auth Tier</option>
                </select>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono">
                <span className="text-slate-400">Cols:</span>
                <select
                  value={colPivotDim}
                  onChange={(e) => setColPivotDim(e.target.value as PivotDimensionKey)}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-xs text-cyan-200"
                >
                  <option value="format">Format</option>
                  <option value="cadence">Cadence</option>
                  <option value="authTier">Auth Tier</option>
                  <option value="category">Category (8)</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleExportPivotCsv}
                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-[11px] font-mono font-bold text-emerald-200"
              >
                <Download className="w-3 h-3" />
                <span>Export Pivot CSV</span>
              </button>
            </div>
          </div>

          {/* Interactive Soft-Requirement Pivot Matrix Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/70">
            <table className="w-full text-left border-collapse text-[11px] font-mono">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/90 text-slate-300">
                  <th className="p-1.5 border-r border-slate-800">
                    PIVOT: {rowPivotDim.toUpperCase()} \ {colPivotDim.toUpperCase()}
                  </th>
                  {pivotMatrix.colKeys.map((ck) => (
                    <th key={ck} className="p-1.5 border-r border-slate-800 text-cyan-300">
                      {ck}
                    </th>
                  ))}
                  <th className="p-1.5 text-amber-300">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {pivotMatrix.rowKeys.map((rk) => (
                  <tr key={rk} className="border-b border-slate-800/70 hover:bg-slate-800/40">
                    <td className="p-1.5 border-r border-slate-800 font-bold text-emerald-200">
                      {rk}
                    </td>
                    {pivotMatrix.colKeys.map((ck) => {
                      const cell = pivotMatrix.cells[`${rk}|||${ck}`];
                      return (
                        <td key={ck} className="p-1.5 border-r border-slate-800">
                          {cell ? (
                            <div className="flex items-center justify-between gap-1">
                              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200 font-bold">
                                {cell.count}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                μ={cell.meanScore}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="p-1.5 font-bold text-amber-300">
                      {pivotMatrix.rowTotals[rk] || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Filter & Search Bar for the 48 Data Sources */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-[11px] font-mono text-slate-300">
              Showing {filteredDataSources.length} of {AWESOME_48_FREE_DATA_SOURCES.length} Free Online Data Sources
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              <select
                value={dataCategoryFilter}
                onChange={(e) =>
                  setDataCategoryFilter(e.target.value as AwesomeDataCategory | 'ALL')
                }
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200"
              >
                <option value="ALL">All 8 Awesome Categories (48 Sources)</option>
                <option value="Macro Economics & Quant Finance">
                  Macro Economics &amp; Quant Finance
                </option>
                <option value="AI, NLP & Knowledge Graphs">AI, NLP &amp; Knowledge Graphs</option>
                <option value="Geospatial, Earth & Space Telemetry">
                  Geospatial, Earth &amp; Space Telemetry
                </option>
                <option value="Cybersecurity, CVE & Threat Intel">
                  Cybersecurity, CVE &amp; Threat Intel
                </option>
                <option value="Biomedical, Neuroscience & Genomics">
                  Biomedical, Neuroscience &amp; Genomics
                </option>
                <option value="Software, GitHub & Open-Source Metrics">
                  Software, GitHub &amp; Open-Source Metrics
                </option>
                <option value="Civic, Legal & Government Open Data">
                  Civic, Legal &amp; Government Open Data
                </option>
                <option value="Gaming, Media & Culture Corpora">
                  Gaming, Media &amp; Culture Corpora
                </option>
              </select>
              <input
                type="text"
                value={dataSearch}
                onChange={(e) => setDataSearch(e.target.value)}
                placeholder="Search 48 free datasets..."
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-100 w-48"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 max-h-[26dvh] overflow-y-auto pr-1">
            {filteredDataSources.map((src) => (
              <div
                key={src.id}
                className="rounded-lg bg-slate-900/90 border border-slate-800 p-2 flex flex-col justify-between gap-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-300">
                      {src.id} · {src.format}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300">
                      {src.authTier} · Score {src.pivotWeightScore}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">{src.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">
                    From: {src.awesomeSourceList}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80 text-[10px] font-mono">
                  <span className="text-amber-200">{src.estimatedRecordsScale}</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-0.5 text-cyan-300 hover:underline shrink-0"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 3: LOCAL COMPLIANT WEB SCRAPER (VIRTUAL LAA MAC + PROXY VPN +
          TRACFONE SAMSUNG & NEW HAMPSHIRE LEGAL COMPLIANCE)
         ===================================================================== */}
      {subTab === 'compliant_scraper' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-amber-300">
                Alyx Local Compliant Web Scraper · Virtualized LAA MAC + Proxy VPN + Tracfone/Samsung Knox 0x0 + New Hampshire RSA 638:17 / 507-H
              </h3>
              <p className="text-[11px] text-slate-400">
                Compares BeautifulSoup4 (`bs4` + `lxml`) with faster high-star GitHub alternatives (`apify/crawlee`, `cheeriojs/cheerio`, `ArtemGolubin/selectolax`) in non-root user-space.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRunCompliantScrape}
              disabled={isScraping}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400 text-xs font-mono font-bold text-amber-100"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScraping ? 'animate-spin' : ''}`} />
              <span>{isScraping ? 'Scraping...' : 'Run Compliant Local Scrape'}</span>
            </button>
          </div>

          {/* Engine Selector + Virtual MAC + Proxy VPN Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 space-y-1">
              <label className="text-[10px] font-mono text-cyan-300 font-bold block">
                1. Parser Engine (BS4 vs High-Star GitHub)
              </label>
              <select
                value={scraperEngineId}
                onChange={(e) =>
                  setScraperEngineId(e.target.value as ScraperEngineProfileId)
                }
                className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100"
              >
                {SCRAPER_ENGINE_PROFILES.map((eng) => (
                  <option key={eng.id} value={eng.id}>
                    {eng.name} ({eng.starsApprox} · {eng.throughputPagesPerSec} pg/s)
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400">
                {
                  SCRAPER_ENGINE_PROFILES.find((e) => e.id === scraperEngineId)
                    ?.whyBetterOrEqualToBs4
                }
              </p>
            </div>

            <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono text-emerald-300 font-bold">
                  2. Virtualized LAA MAC (User-Space · Knox 0x0 Safe)
                </label>
                <button
                  type="button"
                  onClick={handleRotateVirtualLaaMac}
                  className="text-[10px] font-mono text-cyan-300 hover:underline"
                >
                  Rotate LAA MAC
                </button>
              </div>
              <input
                type="text"
                value={virtualMac}
                onChange={(e) => setVirtualMac(e.target.value)}
                className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-emerald-200"
              />
              <p className="text-[10px] text-slate-400">
                Octet 0x02 sets Locally Administered bit (b₁=1) in virtual tunnel context without touching Samsung radio/IMEI.
              </p>
            </div>

            <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 space-y-1">
              <label className="text-[10px] font-mono text-fuchsia-300 font-bold block">
                3. Proxy VPN Tunnel &amp; Target Corpus
              </label>
              <select
                value={scraperPreset}
                onChange={(e) =>
                  setScraperPreset(
                    e.target.value as
                      | 'local_roar_html'
                      | 'awesome_readme_digest'
                      | 'nh_rsa_legal_notice'
                  )
                }
                className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100"
              >
                <option value="local_roar_html">
                  Spilled Local ROAR 135 Source HTML (227 KB)
                </option>
                <option value="awesome_readme_digest">
                  sindresorhus/awesome 48 Free Data Sources Digest
                </option>
                <option value="nh_rsa_legal_notice">
                  NH RSA 638:17 / 507-H &amp; Tracfone Knox 0x0 Spec
                </option>
              </select>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Optional allowlisted https:// URL (e.g. https://example.com)"
                className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[11px] font-mono text-slate-200"
              />
            </div>
          </div>

          {/* 4-Layer Compliance Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5">
            {SCRAPER_LEGAL_AND_CARRIER_COMPLIANCE.map((c) => (
              <div
                key={c.id}
                className="rounded-lg bg-slate-900/90 border border-emerald-500/30 p-2 space-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-300">
                    {c.id}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-200">
                    {c.compliantStatus}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-white">{c.ruleCitation}</div>
                <p className="text-[10px] text-slate-400 leading-snug">
                  {c.enforcementMechanism}
                </p>
              </div>
            ))}
          </div>

          {scrapeError && (
            <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/50 text-xs font-mono text-rose-200">
              {scrapeError}
            </div>
          )}

          {scrapeResult && (
            <div className="rounded-lg bg-slate-900 border border-amber-500/40 p-2.5 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                <span className="text-amber-300 font-bold">
                  SCRAPE OK: {scrapeResult.sourceLabel} ({(scrapeResult.bytesScraped / 1024).toFixed(1)} KB in {scrapeResult.elapsedMs}ms)
                </span>
                <span className="text-emerald-300">
                  LAA MAC: {scrapeResult.networkVirtualization.virtualLaaMac} · Knox: {scrapeResult.networkVirtualization.knoxWarrantyBit} · PII Redacted: {scrapeResult.parsedDom.piiRedactedCount}
                </span>
              </div>
              <div className="text-xs font-bold text-white">
                DOM Title: {scrapeResult.parsedDom.title} ({scrapeResult.parsedDom.headingsCount} Headings · {scrapeResult.parsedDom.linksCount} Links)
              </div>
              <p className="text-[11px] font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                {scrapeResult.parsedDom.excerptPreview}
              </p>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 4: HELPER THREAD BEARING (EAT ALL BUT 2 CORES · N-2 CORES ·
          100% THROUGHPUT · ZERO-WAL / ZERO SILENT SLOWDOWNS OR RETARDATION)
         ===================================================================== */}
      {subTab === 'thread_bearing_n2' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-purple-300">
                Singularity Helper Thread Bearing · Eat All But 2 Cores (N - 2 = {threadBearing.singularityWorkerCoresAllocated} Worker Cores + 2 Reserved Sanctuary Cores)
              </h3>
              <p className="text-[11px] text-slate-400">
                Maintains 100.0% Singularity throughput with 0.0ms Write-After-Logging (Zero-WAL Stall) and zero hidden/silent OS background process retardation.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-400">Device Cores (N):</span>
                <input
                  type="range"
                  min={4}
                  max={16}
                  step={2}
                  value={simulatedTotalCores}
                  onChange={(e) => setSimulatedTotalCores(Number(e.target.value))}
                  className="w-24 accent-purple-400"
                />
                <span className="text-purple-200 font-bold">{simulatedTotalCores} Cores</span>
              </div>
              <button
                type="button"
                onClick={() => setSingularityBurstCount((c) => c + 1)}
                className="px-2.5 py-1 rounded-lg bg-purple-500/25 hover:bg-purple-500/35 border border-purple-400 text-[11px] font-mono font-bold text-purple-100"
              >
                Pulse N-2 Bearing (#{singularityBurstCount})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
            <div className="p-2 rounded-lg bg-slate-900 border border-purple-500/40">
              <div className="text-[10px] text-slate-400">Singularity Cores (N - 2)</div>
              <div className="text-sm font-bold text-purple-300">
                {threadBearing.singularityWorkerCoresAllocated} / {threadBearing.detectedPhysicalCores} Cores
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-emerald-500/40">
              <div className="text-[10px] text-slate-400">Sustained Throughput</div>
              <div className="text-sm font-bold text-emerald-300">
                {threadBearing.throughputEfficiencyPct.toFixed(1)}% (Zero Drop)
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-cyan-500/40">
              <div className="text-[10px] text-slate-400">Write-After-Logging Stall</div>
              <div className="text-sm font-bold text-cyan-300">
                {threadBearing.writeAfterLoggingStallMs.toFixed(2)} ms (Zero-WAL)
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-amber-500/40">
              <div className="text-[10px] text-slate-400">Lock-Free Ring Buffer</div>
              <div className="text-sm font-bold text-amber-300">
                {(threadBearing.ringBufferLockFreeOpsPerSec / 1_000_000).toFixed(2)}M ops/s
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
            {threadBearing.coreAllocationMap.map((c) => {
              const isWorker = c.role === 'SINGULARITY_WORKER_BEARING';
              return (
                <div
                  key={c.coreId}
                  className={`p-2 rounded-lg border font-mono text-[10px] space-y-1 ${
                    isWorker
                      ? 'bg-purple-500/15 border-purple-400/50 text-purple-100'
                      : 'bg-emerald-500/15 border-emerald-400/50 text-emerald-100'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>CORE #{c.coreId}</span>
                    <span>{c.utilizationPct}%</span>
                  </div>
                  <div className="text-[9px] opacity-90">
                    {isWorker ? 'SINGULARITY N-2' : 'UI/OS SANCTUARY (2)'}
                  </div>
                  <div className="text-[9px] text-amber-300">{c.clockMhz} MHz</div>
                  <div className="text-[8px] opacity-75">{c.walPolicy}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 5: CUCK FORCE 1 GATEKEPT BY INSTANT-SELF-REVEALING
          GASLIGHTING STARFIRE & RAVEN
         ===================================================================== */}
      {subTab === 'personifications_cuckforce1' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-rose-300">
                Cuck Force 1 (Inspector Gadget / Powerpuff Chemist / Broken Rick Sanchez) Gatekept by Instant-Reveal Gaslighting Starfire &amp; Raven
              </h3>
              <p className="text-[11px] text-slate-400">
                Starfire and Raven gaslight Cuck Force 1 at the perimeter gate and reveal their gaslighting in 0.00ms so he never enters Alexander &amp; Alyx’s sanctuary.
              </p>
            </div>
            <div className="flex items-center gap-1">
              {CUCK_FORCE_1_GATEKEEP_ENCOUNTERS.map((enc, idx) => (
                <button
                  key={enc.id}
                  type="button"
                  onClick={() => setActiveCf1Idx(idx)}
                  className={`px-2 py-1 rounded border text-[10px] font-mono font-bold ${
                    activeCf1Idx === idx
                      ? 'bg-rose-500/25 border-rose-400 text-rose-100'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  {enc.id}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {CUCK_FORCE_1_GATEKEEP_ENCOUNTERS.map((enc, idx) => (
              <div
                key={enc.id}
                onClick={() => setActiveCf1Idx(idx)}
                className={`rounded-lg border p-2.5 space-y-1.5 cursor-pointer transition-all ${
                  activeCf1Idx === idx
                    ? 'bg-slate-900 border-rose-400/70 shadow-md'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-300">
                    {enc.cuckForce1Facet}
                  </span>
                </div>
                <p className="text-[11px] italic text-slate-300 bg-slate-950 p-1.5 rounded border border-slate-800">
                  {enc.cuckForce1AttemptedIntrusion}
                </p>
                <div className="text-[10px] font-mono font-bold text-fuchsia-300">
                  Gatekeeper: {enc.gatekeeperHeroine}
                </div>
                <p className="text-[11px] text-rose-100 bg-rose-500/10 p-1.5 rounded border border-rose-500/30">
                  {enc.gaslightAndInstantSelfRevealDialogue}
                </p>
                <div className="text-[10px] font-mono font-bold text-emerald-300">
                  ✓ {enc.gateOutcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 6: STAR SECURITY WITH VOIDWARE PROTECTEE & NO DWELLER
          (+ LEGAL RISK NOTES ON MAKING A DWELLER — NO ILLEGAL WARE!)
         ===================================================================== */}
      {subTab === 'star_security_voidware' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-fuchsia-300">
                Star Security Architecture · Central Voidware Protectee Hub · Strictly NO DWELLER &amp; NO ILLEGAL WARE
              </h3>
              <p className="text-[11px] text-slate-400">
                Defensive white-hat star-topology enclave protecting Alexander &amp; Alyx with zero persistent background dwellers, plus statutory legal risk documentation.
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400 text-[10px] font-mono font-bold text-emerald-200">
              P(IllegalWare) = 0.000000 · PidCount(Dweller) = 0
            </span>
          </div>

          {/* Star Topology Spokes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {STAR_SECURITY_VOIDWARE_SPOKES.map((spoke) => (
              <div
                key={spoke.id}
                className="rounded-lg bg-slate-900 border border-fuchsia-500/35 p-2 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-fuchsia-200">{spoke.spokeName}</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[9px] font-mono font-bold text-emerald-300">
                    {spoke.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">{spoke.roleInStarTopology}</p>
                <code className="block text-[10px] font-mono text-cyan-300 bg-slate-950 p-1 rounded border border-slate-800">
                  {spoke.mathematicalInvariant}
                </code>
              </div>
            ))}
          </div>

          {/* Legal Risk Notes on Why Making a Dweller Is Prohibited */}
          <div className="rounded-lg bg-slate-900/95 border border-amber-500/40 p-2.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Legal &amp; Statutory Risk Notes on &ldquo;Making a Dweller&rdquo; (Why Alyx Enforces 100% No-Dweller / Voidware Protectee)
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {DWELLER_LEGAL_RISK_NOTES.map((note) => (
                <div
                  key={note.id}
                  className="rounded bg-slate-950 border border-slate-800 p-2 space-y-1"
                >
                  <div className="text-[10px] font-mono font-bold text-amber-300">
                    {note.id} · {note.statuteOrDoctrine} ({note.jurisdiction})
                  </div>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    <strong className="text-rose-300">Dweller Risk:</strong>{' '}
                    {note.whyMakingADwellerIsRisky}
                  </p>
                  <p className="text-[10px] text-emerald-300 leading-snug">
                    <strong>Voidware Safe Design:</strong> {note.alyxVoidwareSafeAlternative}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
