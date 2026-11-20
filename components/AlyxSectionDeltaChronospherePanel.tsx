'use client';

import React, { useState, useMemo } from 'react';
import {
  Sigma,
  Sparkles,
  Grid,
  TrendingUp,
  Clock,
  Layers,
  RefreshCw,
  CheckCircle2,
  Sliders,
  Zap,
} from 'lucide-react';
import {
  EXPANDED_OSI_14_SUPER_META_LAYERS,
  POLYSUFFIX_2D_SCIENCE_GRID,
  PolysuffixGridCell,
  SECTION_VS_DELTA_KG_OPERATORS,
  UNKNOWN_SCIENCE_6_DOMAINS,
  evaluateChronosphereMoneyableEstateRegression,
  scoreCustomLexemePolysuffixness,
} from '@/lib/section-delta-chronosphere-regression';

interface AlyxSectionDeltaChronospherePanelProps {
  onQuickPrompt?: (prompt: string) => void;
}

type SubViewMode =
  | 'section_vs_delta_kg'
  | 'polysuffix_2d_science_grid'
  | 'multicovariate_chronosphere_regression';

export default function AlyxSectionDeltaChronospherePanel({
  onQuickPrompt,
}: AlyxSectionDeltaChronospherePanelProps) {
  const [subView, setSubView] = useState<SubViewMode>('section_vs_delta_kg');

  // § vs ∆ Operator State
  const [operatorMode, setOperatorMode] = useState<'§' | '∆' | '§_BOWTIE_∆'>('§_BOWTIE_∆');

  // 2D Polysuffixness Science Grid State
  const [selectedCell, setSelectedCell] = useState<PolysuffixGridCell>(
    POLYSUFFIX_2D_SCIENCE_GRID[17] // PG-3-6: trifectiononeurofuzzificationistically (99.9)
  );
  const [customLexemeInput, setCustomLexemeInput] = useState<string>(
    'chronospherequantizationistically'
  );

  // Multicovariate Regression & Adjustable Origin Clamp State
  const [trifectionNeuronXt, setTrifectionNeuronXt] = useState<number>(6.85);
  const [originClampRatio, setOriginClampRatio] = useState<number>(0.55);
  const [secondsSinceLookup, setSecondsSinceLookup] = useState<number>(8);
  const [lookupMeanConfidence, setLookupMeanConfidence] = useState<number>(0.992);
  const [lookupVariance, setLookupVariance] = useState<number>(0.008);
  const [healingCoeff, setHealingCoeff] = useState<number>(1.88);
  const [lookupStampCount, setLookupStampCount] = useState<number>(1);

  const customLexemeAudit = useMemo(
    () => scoreCustomLexemePolysuffixness(customLexemeInput),
    [customLexemeInput]
  );

  const regressionEval = useMemo(
    () =>
      evaluateChronosphereMoneyableEstateRegression({
        trifectionIntegraltesimalFuzzyNeuronXt: trifectionNeuronXt,
        adjustableOriginClampRatio: originClampRatio,
        secondsSinceLastKgLookup: secondsSinceLookup,
        lastLookupStatisticalMeanConfidence: lookupMeanConfidence,
        lastLookupStatisticalVariance: lookupVariance,
        globalHealingCoefficient: healingCoeff,
        operatorMode,
      }),
    [
      trifectionNeuronXt,
      originClampRatio,
      secondsSinceLookup,
      lookupMeanConfidence,
      lookupVariance,
      healingCoeff,
      operatorMode,
    ]
  );

  const handleStampFreshKgLookupNow = () => {
    setSecondsSinceLookup(0);
    setLookupMeanConfidence(0.996);
    setLookupVariance(0.004);
    setLookupStampCount((c) => c + 1);
  };

  return (
    <div className="space-y-2.5 text-slate-100">
      {/* TOP SUMMARY & SUB-VIEW SWITCHER */}
      <div className="rounded-xl bg-slate-950 border border-fuchsia-500/45 p-2.5 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Sigma className="w-4 h-4 text-fuchsia-400 shrink-0" />
            <span className="text-xs font-bold font-mono text-white">
              § VS ∆ WORLD-STATE KG OPTIMIZATION · 6×6 POLYSUFFIXNESS UNKNOWN SCIENCE GRID · CHRONOSPHEREQUANTA y(t) MONEYABLEESTATE REGRESSION
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/50 text-[10px] font-mono font-bold text-emerald-200">
              y(t) = ${regressionEval.predictedMoneyableEstateYtUsdMillions}M · R²={regressionEval.rSquaredAdjusted}
            </span>
            {onQuickPrompt && (
              <button
                type="button"
                onClick={() =>
                  onQuickPrompt(
                    `Alyx, synthesize the mathematical optimization duality between § (Sheaf Cross-Section / Deontic Statutory Slice) and ∆ (Combinatorial Graph Laplacian / 2-Simplex / Temporal Flux) over our Current World-State Knowledge Graph, score our 6×6 2D Polysuffixness Unknown Science Grid (top word: "${selectedCell.clusteredWord}" = ${selectedCell.polysuffixnessScore}/100), and evaluate our Multicovariate Higher-Order Chronospherequanta Regression Equation where y(t) = MoneyableEstate ($${regressionEval.predictedMoneyableEstateYtUsdMillions}M) over x(t) = Tri-Fection Integraltesimal Fuzzy Memory Neuron (${trifectionNeuronXt}) with Healing Coefficient H=${healingCoeff}x and Adjustable Origin Clamp β₀=${regressionEval.yInterceptCurrentTimeAndLookupBeta0}!`
                  )
                }
                className="px-2.5 py-0.5 rounded-md bg-rose-500/25 hover:bg-rose-500/35 border border-rose-400 text-[10px] font-mono font-bold text-rose-100"
              >
                Ask Alyx (§ ⋈ ∆ + y(t)) →
              </button>
            )}
          </div>
        </div>

        {/* 3 Sub-View Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSubView('section_vs_delta_kg')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold ${
              subView === 'section_vs_delta_kg'
                ? 'bg-fuchsia-500/25 border-fuchsia-400 text-fuchsia-100'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
          >
            <Sigma className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>1. § vs ∆ World-State Knowledge Graph Optimization</span>
          </button>

          <button
            type="button"
            onClick={() => setSubView('polysuffix_2d_science_grid')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold ${
              subView === 'polysuffix_2d_science_grid'
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-100'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-cyan-400" />
            <span>2. 2D Polysuffixness Unknown Science Grid (6×6 = 36)</span>
          </button>

          <button
            type="button"
            onClick={() => setSubView('multicovariate_chronosphere_regression')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-bold ${
              subView === 'multicovariate_chronosphere_regression'
                ? 'bg-emerald-500/25 border-emerald-400 text-emerald-100'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Multicovariate y(t) MoneyableEstate Regression &amp; Origin Clamp</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          VIEW 1: § VS ∆ IN MATHEMATICAL OPTIMIZATION WITH CURRENT WORLD-STATE KG
         ===================================================================== */}
      {subView === 'section_vs_delta_kg' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-fuchsia-300">
                What Does § Mean vs ∆ Mean in Mathematical Optimization over the Current World-State Knowledge Graph G_W(t)?
              </h3>
              <p className="text-[11px] text-slate-400">
                § carves out the invariant Čech-cohomological truth section &amp; statutory boundary manifold M_§, while ∆ drives Laplacian spectral diffusion, Fiedler connectivity λ₂(∆), and temporal gradient flux across M_§.
              </p>
            </div>
            <div className="flex items-center gap-1">
              {(['§', '∆', '§_BOWTIE_∆'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setOperatorMode(m)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold ${
                    operatorMode === m
                      ? 'bg-fuchsia-500/25 border-fuchsia-400 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  {m === '§_BOWTIE_∆' ? '§ ⋈ ∆ Unified Duality' : `Operator ${m}`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {(['§', '∆'] as const).map((sym) => {
              const op = SECTION_VS_DELTA_KG_OPERATORS[sym];
              const isHighlighted = operatorMode === sym || operatorMode === '§_BOWTIE_∆';
              return (
                <div
                  key={sym}
                  className={`rounded-xl border p-2.5 space-y-1.5 transition-all ${
                    isHighlighted
                      ? sym === '§'
                        ? 'bg-slate-900/95 border-cyan-400/70 shadow-md'
                        : 'bg-slate-900/95 border-rose-400/70 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-sm font-mono font-bold text-amber-300">
                      {op.symbol} · {op.formalName}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-200 leading-snug">
                    <strong className="text-cyan-300">Topology &amp; KG Definition:</strong>{' '}
                    {op.algebraicTopologyDefinition}
                  </p>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    <strong className="text-fuchsia-300">Optimization Role:</strong>{' '}
                    {op.knowledgeGraphRole}
                  </p>
                  <code className="block text-[10px] font-mono text-emerald-300 bg-slate-950 p-1.5 rounded border border-slate-800 overflow-x-auto">
                    {op.optimizationObjectiveFormula}
                  </code>
                  <p className="text-[11px] text-amber-200/90 leading-snug">
                    <strong>World-State Question:</strong> {op.worldStateInterpretation}
                  </p>
                  <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                    <span>{op.eigenOrCohomologyMetric}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Unified § ⋈ ∆ Variational Functional Banner */}
          <div className="rounded-lg bg-slate-900 border border-fuchsia-500/40 p-2 flex flex-wrap items-center justify-between gap-2">
            <div className="text-[11px] text-slate-200">
              <strong className="text-fuchsia-300">Unified § ⋈ ∆ World-State KG Variational Law:</strong>{' '}
              First apply <strong>§</strong> to slice a zero-contradiction sheaf section across the Knowledge Graph, then apply <strong>∆</strong> to flow along the Fiedler spectral gradient into MoneyableEstate $y(t)$.
            </div>
            <code className="text-[10px] font-mono text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              J_§,∆(G_W) = max_§ [ ||§(G_W)||² - λ⟨§, ∆§⟩ + γ·λ₂(∆_GW) ]
            </code>
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW 2: 2D GRID OF CLUSTERING WORDS WITH POLYSUFFIXNESS WITHIN
          UNKNOWN DOMAIN(S) OF SCIENCE MAPPING (6 × 6 = 36 CELLS)
         ===================================================================== */}
      {subView === 'polysuffix_2d_science_grid' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-cyan-300">
                2D Grid of Clustering Words with Polysuffixness within Unknown Domains of Science Mapping (6 Domains × 6 Suffix Depths = 36 Cells)
              </h3>
              <p className="text-[11px] text-slate-400">
                Click any cell (u_sci, d_poly) in the 2D matrix to inspect its derivational suffix chain, cluster silhouette cohesion, and MoneyableEstate yield weight.
              </p>
            </div>
            {/* Live Custom Word Polysuffixness Scorer */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={customLexemeInput}
                onChange={(e) => setCustomLexemeInput(e.target.value)}
                placeholder="Score any polysuffix word..."
                className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/50 text-xs font-mono text-cyan-100 w-60"
              />
              <span className="px-2 py-1 rounded bg-cyan-500/20 border border-cyan-400/50 text-[10px] font-mono font-bold text-cyan-200">
                Score: {customLexemeAudit.polysuffixnessScore}/100 (Depth {customLexemeAudit.polysuffixDepth} · {customLexemeAudit.inferredUnknownDomain.shortCode})
              </span>
            </div>
          </div>

          {/* 6x6 2D Polysuffixness Science Clustering Matrix */}
          <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/75">
            <table className="w-full text-left border-collapse text-[10px] font-mono">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-300">
                  <th className="p-1.5 border-r border-slate-800">
                    UNKNOWN SCIENCE DOMAIN \ POLYSUFFIX DEPTH
                  </th>
                  {[1, 2, 3, 4, 5, 6].map((depth) => (
                    <th key={depth} className="p-1.5 border-r border-slate-800 text-cyan-300">
                      Depth d={depth} ({depth} {depth === 1 ? 'Suffix' : 'Suffixes'})
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {UNKNOWN_SCIENCE_6_DOMAINS.map((dom) => {
                  const rowCells = POLYSUFFIX_2D_SCIENCE_GRID.filter(
                    (c) => c.domainId === dom.domainId
                  );
                  return (
                    <tr
                      key={dom.domainId}
                      className="border-b border-slate-800/80 hover:bg-slate-800/30"
                    >
                      <td className="p-1.5 border-r border-slate-800 font-bold text-fuchsia-200">
                        <div>{dom.shortCode}</div>
                        <div className="text-[9px] text-slate-400 font-normal">{dom.name}</div>
                      </td>
                      {rowCells.map((cell) => {
                        const isSel = selectedCell.cellId === cell.cellId;
                        return (
                          <td
                            key={cell.cellId}
                            onClick={() => setSelectedCell(cell)}
                            className={`p-1.5 border-r border-slate-800 cursor-pointer transition-all ${
                              isSel
                                ? 'bg-cyan-500/30 ring-1 ring-cyan-400'
                                : 'hover:bg-slate-800/70'
                            }`}
                          >
                            <div className="font-bold text-white truncate max-w-[135px]">
                              {cell.clusteredWord}
                            </div>
                            <div className="flex items-center justify-between mt-0.5">
                              <span className="text-emerald-300 font-bold">
                                {cell.polysuffixnessScore}
                              </span>
                              <span className="text-[9px] text-amber-300">
                                ×{cell.semanticMoneyableYieldWeight}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected 2D Cell & Custom Lexeme Inspector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="rounded-lg bg-slate-900 border border-cyan-500/40 p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-cyan-300">
                  Selected Grid Cell [{selectedCell.cellId}] · {selectedCell.domainName}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px] font-mono font-bold text-emerald-300">
                  Polysuffix Score: {selectedCell.polysuffixnessScore}/100 · Silhouette: {selectedCell.clusterSilhouetteScore}
                </span>
              </div>
              <div className="text-xs font-bold font-mono text-white mt-1">
                Word: &ldquo;{selectedCell.clusteredWord}&rdquo; → {selectedCell.morphemeBreakdown}
              </div>
              <div className="text-[10px] font-mono text-amber-300 mt-0.5">
                Chained Suffixes (d={selectedCell.polysuffixDepth}): {selectedCell.suffixChain.join(' → ')} · Moneyable Yield Multiplier: ×{selectedCell.semanticMoneyableYieldWeight}
              </div>
            </div>

            <div className="rounded-lg bg-slate-900 border border-fuchsia-500/40 p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-fuchsia-300">
                  Live Custom Lexeme Scorer: &ldquo;{customLexemeAudit.cleanedWord}&rdquo;
                </span>
                <span className="text-[10px] font-mono text-cyan-300">
                  H_morpheme = {customLexemeAudit.shannonMorphemeEntropyBits} bits
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-200 mt-1">
                Inferred Unknown Science Domain: <strong className="text-white">{customLexemeAudit.inferredUnknownDomain.name}</strong>
              </div>
              <div className="text-[10px] font-mono text-emerald-300 mt-0.5">
                Detected Suffix Chain (d={customLexemeAudit.polysuffixDepth}): {customLexemeAudit.detectedSuffixChain.join(' → ')} · Score: {customLexemeAudit.polysuffixnessScore}/100
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW 3: MULTICOVARIATE HIGHER-ORDER CHRONOSPHEREQUANTA REGRESSION
          EQUATION FOR MONEYABLEESTATE y(t) WITH ADJUSTABLE ORIGIN CLAMP
         ===================================================================== */}
      {subView === 'multicovariate_chronosphere_regression' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-2.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold font-mono text-emerald-300">
                Multicovariate Higher-Order Regression: y(t) = MoneyableEstate vs x(t) = Tri-Fection Integraltesimal Fuzzy Memory Neuron
              </h3>
              <p className="text-[11px] text-slate-400">
                Constant y-intercept β₀ combines Current Time with Statistical Qualities of Last Knowledge Lookup Timestamp (Adjustable Origin Clamp) + 14-Layer OSI Super-Meta Chronospherequanta &amp; Healing Coefficients.
              </p>
            </div>
            <button
              type="button"
              onClick={handleStampFreshKgLookupNow}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400 text-xs font-mono font-bold text-emerald-100"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Stamp Fresh KG Lookup Timestamp (#{lookupStampCount})</span>
            </button>
          </div>

          {/* Symbolic Master Regression Equation */}
          <div className="rounded-lg bg-slate-900 border border-emerald-500/40 p-2 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>MASTER MULTICOVARIATE HIGHER-ORDER CHRONOSPHEREQUANTA REGRESSION EQUATION</span>
              <span className="text-emerald-300 font-bold">
                Last KG Lookup: {regressionEval.lastLookupTimestampIso} · Origin Clamp Epoch: {regressionEval.clampedOriginEpochSeconds}
              </span>
            </div>
            <code className="block text-[11px] font-mono text-amber-300 bg-slate-950 p-2 rounded border border-slate-800 overflow-x-auto">
              {regressionEval.symbolicRegressionEquationLaTeX}
            </code>
          </div>

          {/* Interactive Sliders: x(t) Tri-Fection Fuzzy Neuron, Adjustable Origin Clamp, Healing Coeff & Lookup Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-300 font-bold">x(t) Tri-Fection Fuzzy Neuron</span>
                <span className="text-white font-bold">{trifectionNeuronXt.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={10.0}
                step={0.05}
                value={trifectionNeuronXt}
                onChange={(e) => setTrifectionNeuronXt(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Integraltesimal Choquet fuzzy memory neuron state x(t).
              </p>
            </div>

            <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-amber-300 font-bold">Adjustable Origin Clamp</span>
                <span className="text-white font-bold">{(originClampRatio * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0.0}
                max={1.0}
                step={0.01}
                value={originClampRatio}
                onChange={(e) => setOriginClampRatio(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Clamps t_now origin epoch ({regressionEval.clampedOriginEpochSeconds}s) in β₀.
              </p>
            </div>

            <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-rose-300 font-bold">Healing Coefficient H_k</span>
                <span className="text-white font-bold">{healingCoeff.toFixed(2)}×</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={2.5}
                step={0.02}
                value={healingCoeff}
                onChange={(e) => setHealingCoeff(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Reed-Solomon + Lyapunov + Dokuro healing gain (+{regressionEval.healingAmplificationGainPct}%).
              </p>
            </div>

            <div className="rounded-lg bg-slate-900 border border-slate-800 p-2 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-300 font-bold">KG Lookup Δt &amp; μ_KG</span>
                <span className="text-white font-bold">
                  {secondsSinceLookup}s ago · μ={(lookupMeanConfidence * 100).toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={300}
                step={1}
                value={secondsSinceLookup}
                onChange={(e) => setSecondsSinceLookup(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Statistical freshness of last Knowledge Graph lookup timestamp.
              </p>
            </div>
          </div>

          {/* Live Term-by-Term Regression Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 font-mono text-center">
            <div className="p-2 rounded-lg bg-slate-900 border border-amber-500/40">
              <div className="text-[9px] text-slate-400">y-Intercept β₀ (Time+Lookup)</div>
              <div className="text-xs font-bold text-amber-300">
                +{regressionEval.yInterceptCurrentTimeAndLookupBeta0}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-cyan-500/40">
              <div className="text-[9px] text-slate-400">Cubic Fuzzy Neuron ∑β_k x^k</div>
              <div className="text-xs font-bold text-cyan-300">
                +{regressionEval.linearAndCubicNeuronTerm}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-purple-500/40">
              <div className="text-[9px] text-slate-400">14-Layer OSI Super-Meta</div>
              <div className="text-xs font-bold text-purple-300">
                +{regressionEval.osi14SuperMetaCrossTerm}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-rose-500/40">
              <div className="text-[9px] text-slate-400">Prob × Chronosphere × x²</div>
              <div className="text-xs font-bold text-rose-300">
                +{regressionEval.probabilisticChronosphereHigherOrderTerm}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-slate-900 border border-fuchsia-500/40">
              <div className="text-[9px] text-slate-400">ξ_(§ ⋈ ∆) KG Duality</div>
              <div className="text-xs font-bold text-fuchsia-300">
                +{regressionEval.sectionDeltaDualityBonusTerm}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-400">
              <div className="text-[9px] text-emerald-200 font-bold">y(t) MoneyableEstate</div>
              <div className="text-sm font-bold text-white">
                ${regressionEval.predictedMoneyableEstateYtUsdMillions}M
              </div>
            </div>
          </div>

          {/* 14-Layer Expanded OSI Super-Meta Chronospherequanta Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-1.5 max-h-[22dvh] overflow-y-auto pr-1">
            {EXPANDED_OSI_14_SUPER_META_LAYERS.map((layer) => (
              <div
                key={layer.layerNumber}
                className={`rounded-lg border p-1.5 text-[10px] font-mono space-y-0.5 ${
                  layer.layerNumber >= 8
                    ? 'bg-fuchsia-500/10 border-fuchsia-500/40 text-fuchsia-100'
                    : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-cyan-300">{layer.code}</span>
                  <span className="text-emerald-300">H={layer.healingCoefficientH}×</span>
                </div>
                <div className="text-[10px] font-bold text-white leading-tight">
                  {layer.name}
                </div>
                <div className="text-[9px] text-amber-300 truncate">
                  {layer.chronosphereQuantaParameter}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
