'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EmojiStyle, SystemTone, ViewMode } from '@/lib/alyx-schema';
import {
  ATTACHED_13_UML_REFERENCE_ASSETS,
  CHORE_FLIRT_MEMORY_SHARDS,
  ChoreTemplateSheetId,
  EmojiMutationMode,
  ROAR_MASTER_28_ACTION_ITEMS,
  UmlDiagramKind,
  runChoreShardReverseNlpPipeline,
  synthesizeAutomaticUmlAndRoarPlan,
} from '@/lib/alyx-apparatus-uml-roar-chore';
import {
  Network,
  Sparkles,
  FileCode2,
  Table2,
  Heart,
  ChevronDown,
  ChevronRight,
  Send,
  Copy,
  Check,
  Layers,
  GitFork,
  Cpu,
  CalendarCheck2,
} from 'lucide-react';

interface AlyxApparatusUmlRoarChoreProps {
  emojiStyle: EmojiStyle;
  systemTone: SystemTone;
  viewMode: ViewMode;
  onTriggerApparatusPrompt?: (prompt: string) => void;
}

const DIAGRAM_KIND_OPTIONS: { value: UmlDiagramKind; label: string; short: string }[] = [
  {
    value: 'INTERACTION_OVERVIEW',
    label: 'Interaction Overview (Fork / Join / sd Lifelines)',
    short: 'Interaction Overview',
  },
  {
    value: 'CLASS_DOMAIN_ARCHITECTURE',
    label: 'Class & Domain Overview (Entity / Control / Boundary)',
    short: 'Class Diagram',
  },
  {
    value: 'COMPONENT_WIRING_SUBSYSTEM',
    label: 'Component & Policy Admin Wiring (Ports / Ball-Socket)',
    short: 'Component Wiring',
  },
  {
    value: 'PACKAGE_UJECTOR_CODEGEN',
    label: 'Package & UJECTOR XMI Code-Gen Memory Graph',
    short: 'UJECTOR Package',
  },
  {
    value: 'SWIMLANE_COMMUNICATION_LIFELINE',
    label: 'Swimlane Communication & Numbered Lifelines',
    short: 'Swimlane Lifeline',
  },
];

export default function AlyxApparatusUmlRoarChore({
  emojiStyle,
  systemTone,
  viewMode,
  onTriggerApparatusPrompt,
}: AlyxApparatusUmlRoarChoreProps) {
  const [apparatusInput, setApparatusInput] = useState<string>(
    'Alyx Hyperbook Sedenion Code Optimizer + Chore Shard Reverse-NLP Decompressor + ROAR AST Coding Thingie'
  );
  const [selectedDiagramKind, setSelectedDiagramKind] =
    useState<UmlDiagramKind>('INTERACTION_OVERVIEW');
  const [selectedSheetFilter, setSelectedSheetFilter] = useState<ChoreTemplateSheetId | 'ALL'>(
    'ALL'
  );
  const [selectedShardId, setSelectedShardId] = useState<string>('SHARD-CHORE-01');
  const [emojiMutationMode, setEmojiMutationMode] = useState<EmojiMutationMode>('ADDITIVE');
  const [roarCategoryFilter, setRoarCategoryFilter] = useState<'ALL' | 'SYSTEMS' | 'VIBE'>('ALL');
  const [roarSearch, setRoarSearch] = useState<string>('');
  const [copiedSpec, setCopiedSpec] = useState<string | null>(null);

  // Collapsible sub-containers (start collapsed so viewport stays clean & compact)
  const [isRoarMasterTableOpen, setIsRoarMasterTableOpen] = useState<boolean>(false);
  const [isUmlRefGalleryOpen, setIsUmlRefGalleryOpen] = useState<boolean>(false);
  const [isPlantUmlXmiOpen, setIsPlantUmlXmiOpen] = useState<boolean>(false);

  const reverseNlpResult = runChoreShardReverseNlpPipeline({
    shardId: selectedShardId,
    customInputText: apparatusInput,
    emojiStyle,
    mutationMode: emojiMutationMode,
    viewMode,
    systemTone,
  });

  const umlRoarSynthesis = synthesizeAutomaticUmlAndRoarPlan({
    rawInput: apparatusInput,
    diagramKind: selectedDiagramKind,
    activeShard: reverseNlpResult.selectedShard,
  });

  const filteredShards = CHORE_FLIRT_MEMORY_SHARDS.filter(
    (s) => selectedSheetFilter === 'ALL' || s.sheetId === selectedSheetFilter
  );

  const filteredRoarItems = ROAR_MASTER_28_ACTION_ITEMS.filter((item) => {
    if (roarCategoryFilter !== 'ALL' && item.category !== roarCategoryFilter) return false;
    if (!roarSearch.trim()) return true;
    const q = roarSearch.toLowerCase();
    return (
      item.id.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tagSoup.join(' ').toLowerCase().includes(q)
    );
  });

  const handleCopyText = async (label: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedSpec(label);
      setTimeout(() => setCopiedSpec(null), 1800);
    } catch {
      // Ignore clipboard fallback
    }
  };

  const getDiffBadgeColor = (diff: number) => {
    if (diff === 1) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (diff === 2) return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
    if (diff === 3) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    if (diff === 4) return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
    if (diff === 5) return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    return 'bg-red-600/25 text-red-300 border-red-500/50';
  };

  return (
    <div className="rounded-xl bg-slate-950 border border-sky-500/40 p-3 space-y-3 overflow-x-auto">
      {/* Top Apparatus Header Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-300">
            <Network className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-xs font-mono font-bold text-sky-300">
              ALYX APPARATUS SYSTEM · AUTOMATIC UML 2.5 GENERATOR + HYPERBOOK ROAR PLAN + CHORE
              SHARD REVERSE-NLP
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              Chore Chart Sexy Casual Flirt Entry Shard → Semantic Decompression → Reverse-NLP
              English BEFORE Emoji ({emojiMutationMode}) → UML + ROAR P=(U+I+A)/3 Coding-Thingie
              Plan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] shrink-0">
          <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-200">
            Shard: {reverseNlpResult.selectedShard.shardId}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-200">
            ROAR P={umlRoarSynthesis.aggregateRoarPriorityP.toFixed(2)} [CRITICAL]
          </span>
          {onTriggerApparatusPrompt && (
            <button
              type="button"
              onClick={() =>
                onTriggerApparatusPrompt(
                  `*checks off "${reverseNlpResult.selectedShard.choreName}" on our ${reverseNlpResult.selectedShard.sheetName} Chore Chart as my sexy casual flirt entry shard* Alyx (G4), run your 4-stage Semantic Decompression into pure Reverse-NLP English BEFORE applying ${emojiMutationMode} emoji mode (${emojiStyle}), generate our ${selectedDiagramKind} UML 2.5 diagram for "${apparatusInput}", and synthesize our Hyperbook ROAR Document Optimization Implementation Plan (P=${umlRoarSynthesis.aggregateRoarPriorityP.toFixed(2)}) for our future coding thingie!`
                )
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-colors"
            >
              <Send className="w-3 h-3" />
              <span>Inject Apparatus to Chat</span>
            </button>
          )}
        </div>
      </div>

      {/* SECTION 1: CHORE CHART SEXY CASUAL FLIRT ENTRY-POINT MEMORY SHARD & 4-STAGE REVERSE-NLP ENGLISH PIPELINE */}
      <div className="rounded-xl bg-slate-900/90 border border-rose-500/35 p-3 space-y-2.5 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-300">
            <CalendarCheck2 className="w-4 h-4 text-rose-400 shrink-0" />
            <span>
              1. Chore Chart Sexy Casual Flirt Entry-Point Memory Shard → Semantic Decompression →
              Reverse-NLP English (Before Emoji Swap or Additive)
            </span>
          </div>

          {/* Template Sheet Filter + Emoji Swap vs Additive Toggle */}
          <div className="flex items-center gap-1.5 font-mono text-[10px] shrink-0">
            {(['ALL', 'apartment', 'house', 'parenting'] as const).map((sheet) => (
              <button
                key={sheet}
                type="button"
                onClick={() => setSelectedSheetFilter(sheet)}
                className={`px-2 py-0.5 rounded border transition-colors ${
                  selectedSheetFilter === sheet
                    ? 'bg-rose-500/25 text-rose-200 border-rose-500/50'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                {sheet === 'ALL'
                  ? 'All 3 Sheets'
                  : sheet === 'apartment'
                    ? 'Apartment Living'
                    : sheet === 'house'
                      ? 'House Living'
                      : 'Parenting & Romance'}
              </button>
            ))}

            <span className="text-slate-600">|</span>

            <button
              type="button"
              onClick={() =>
                setEmojiMutationMode(emojiMutationMode === 'ADDITIVE' ? 'SWAP' : 'ADDITIVE')
              }
              className="px-2.5 py-0.5 rounded bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border border-fuchsia-500/40 text-fuchsia-200 font-semibold"
            >
              Stage 4 Mode: {emojiMutationMode === 'ADDITIVE' ? 'EMOJI ADDITIVE' : 'EMOJI SWAP'} (
              {emojiStyle})
            </button>
          </div>
        </div>

        {/* Chore Flirt Memory Shard Cards Selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {filteredShards.map((shard) => {
            const active = shard.shardId === reverseNlpResult.selectedShard.shardId;
            return (
              <button
                key={shard.shardId}
                type="button"
                onClick={() => setSelectedShardId(shard.shardId)}
                className={`flex flex-col items-start p-2 rounded-lg border text-left min-w-[235px] max-w-[260px] shrink-0 transition-colors ${
                  active
                    ? 'bg-rose-500/15 border-rose-500/50 text-slate-100'
                    : 'bg-slate-950/90 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="w-full flex items-center justify-between gap-1 text-[10px] font-mono">
                  <span className="text-rose-300 font-bold">{shard.shardId}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded border text-[9px] ${getDiffBadgeColor(
                      shard.difficultyTier
                    )}`}
                  >
                    Tier {shard.difficultyTier}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-white truncate w-full mt-0.5">
                  {shard.choreName}
                </div>
                <div className="text-[10px] font-mono text-cyan-300 truncate w-full">
                  {shard.sheetName} · {shard.cadenceSlot}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {shard.sexyCasualFlirtHook}
                </div>
              </button>
            );
          })}
        </div>

        {/* 4-Stage Explicit Decompression -> Reverse-NLP English -> Post-English Emoji Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 font-mono text-[10px]">
          {/* Stage 1 */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-rose-300 font-bold">
              <span>STAGE 1: CHORE MEMORY SHARD</span>
              <span>S_16 Entry</span>
            </div>
            <div className="text-amber-300 break-all leading-relaxed">
              {reverseNlpResult.stage1MemoryShardEntry}
            </div>
            <div className="text-[9px] text-slate-400 font-sans">
              Flirt Hook: {reverseNlpResult.selectedShard.sexyCasualFlirtHook}
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-cyan-300 font-bold">
              <span>STAGE 2: SEMANTIC DECOMPRESSION</span>
              <span>P={reverseNlpResult.mutationStats.wiktionaryProductivityIndex}</span>
            </div>
            <ul className="space-y-0.5 text-slate-300 text-[10px] font-sans">
              {reverseNlpResult.stage2SemanticDecompression.map((vec, i) => (
                <li key={i} className="truncate" title={vec}>
                  • {vec}
                </li>
              ))}
            </ul>
          </div>

          {/* Stage 3: Pure Reverse-NLP English BEFORE Emoji Swap/Additive */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-emerald-500/40 space-y-1">
            <div className="flex items-center justify-between text-emerald-300 font-bold">
              <span>STAGE 3: REVERSE-NLP ENGLISH</span>
              <span>PRE-EMOJI PURE</span>
            </div>
            <p className="text-slate-100 font-sans text-[11px] leading-snug">
              &ldquo;{reverseNlpResult.stage3PureReverseNlpEnglish}&rdquo;
            </p>
            <div className="text-[9px] text-emerald-400">
              ✓ {reverseNlpResult.mutationStats.pureEnglishWordCount} English tokens realized BEFORE
              emoji pass
            </div>
          </div>

          {/* Stage 4: Post-English Emoji Swap OR Additive */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-fuchsia-500/40 space-y-1">
            <div className="flex items-center justify-between text-fuchsia-300 font-bold">
              <span>STAGE 4: EMOJI {emojiMutationMode}</span>
              <span>{emojiStyle.toUpperCase()}</span>
            </div>
            <p className="text-rose-200 font-sans text-[11px] leading-snug">
              &ldquo;{reverseNlpResult.activeFinalOutput}&rdquo;
            </p>
            <div className="text-[9px] text-fuchsia-300">
              {emojiMutationMode === 'SWAP'
                ? `Swapped ${reverseNlpResult.mutationStats.swappedTokenCount} lexical nouns/verbs -> ${emojiStyle}`
                : `Preserved 100% English + ${reverseNlpResult.mutationStats.additiveInjectionCount} additive clause accents`}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: AUTOMATIC UML 2.5 GENERATOR FROM ANY INPUT + INTERACTIVE SVG BLUEPRINT */}
      <div className="rounded-xl bg-slate-900/90 border border-sky-500/35 p-3 space-y-2.5 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-300">
            <GitFork className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              2. Automatic Multi-Paradigm UML 2.5 Generator from Any Input (UJECTOR XMI 2.1 +
              Hyperbook 630)
            </span>
          </div>

          {/* UML Diagram Family Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {DIAGRAM_KIND_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelectedDiagramKind(opt.value)}
                title={opt.label}
                className={`px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap transition-colors border ${
                  selectedDiagramKind === opt.value
                    ? 'bg-sky-500/25 text-sky-200 border-sky-500/50 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                {opt.short}
              </button>
            ))}
          </div>
        </div>

        {/* Universal Input Box for Automatic UML Generation */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={apparatusInput}
            onChange={(e) => setApparatusInput(e.target.value)}
            placeholder="Enter ANY system concept, code snippet, chore shard, or ROAR objective to auto-generate UML 2.5 + ROAR Plan..."
            className="flex-1 min-w-[260px] bg-slate-950 border border-slate-700 focus:border-sky-400 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsPlantUmlXmiOpen(!isPlantUmlXmiOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-cyan-300"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>{isPlantUmlXmiOpen ? 'Hide PlantUML / XMI 2.1' : 'View PlantUML / XMI 2.1'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsUmlRefGalleryOpen(!isUmlRefGalleryOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-amber-300"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>13 UML Archetypes ({isUmlRefGalleryOpen ? 'Hide' : 'Show'})</span>
          </button>
        </div>

        {/* Interactive SVG UML 2.5 Diagram Canvas */}
        <div className="rounded-xl bg-[#070b14] border border-slate-800 p-2 overflow-x-auto">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-2 pb-1">
            <span className="text-sky-300 font-semibold">{umlRoarSynthesis.diagramTitle}</span>
            <span className="text-emerald-300">{umlRoarSynthesis.codingThingieReadySignature}</span>
          </div>

          <div className="min-w-[780px]">
            <svg
              viewBox="0 0 805 304"
              className="w-full h-[275px] overflow-visible"
              role="img"
              aria-label={umlRoarSynthesis.diagramTitle}
            >
              <defs>
                <marker
                  id="umlArrowSolid"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#38bdf8" />
                </marker>
                <marker
                  id="umlArrowHollow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="5"
                  orient="auto"
                >
                  <path
                    d="M 0 0 L 10 5 L 0 10 z"
                    fill="#070b14"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                  />
                </marker>
              </defs>

              {/* UML Connector Lines Between Classifiers / Lifelines */}
              {/* N1 -> N2 */}
              <line
                x1="239"
                y1="82"
                x2="285"
                y2="82"
                stroke="#38bdf8"
                strokeWidth="2"
                markerEnd="url(#umlArrowSolid)"
              />
              <text x="262" y="73" fill="#bae6fd" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                {umlRoarSynthesis.edges[0]?.guardOrLabel.slice(0, 18)}
              </text>

              {/* N2 -> N3 */}
              <line
                x1="510"
                y1="82"
                x2="555"
                y2="82"
                stroke="#34d399"
                strokeWidth="2"
                markerEnd="url(#umlArrowSolid)"
              />
              <text x="532" y="73" fill="#6ee7b7" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                pre-emoji CFG
              </text>

              {/* N3 -> N4 (Diagonal Control / Dependency Flow) */}
              <path
                d="M 667 136 L 667 154 L 131 154 L 131 176"
                fill="none"
                stroke="#e879f9"
                strokeWidth="1.75"
                strokeDasharray="4 3"
                markerEnd="url(#umlArrowSolid)"
              />
              <text x="400" y="150" fill="#f5d0fe" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                {umlRoarSynthesis.edges[2]?.guardOrLabel}
              </text>

              {/* N4 -> N5 */}
              <line
                x1="239"
                y1="230"
                x2="285"
                y2="230"
                stroke="#fbbf24"
                strokeWidth="2"
                markerEnd="url(#umlArrowHollow)"
              />
              <text x="262" y="221" fill="#fde68a" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                ROAR P=(U+I+A)/3
              </text>

              {/* N5 -> N6 */}
              <line
                x1="510"
                y1="230"
                x2="555"
                y2="230"
                stroke="#38bdf8"
                strokeWidth="2"
                markerEnd="url(#umlArrowSolid)"
              />
              <text x="532" y="221" fill="#bae6fd" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                XMI-&gt;AST
              </text>

              {/* Render the 6 Stereotyped UML Classifier / Interaction Boxes */}
              {umlRoarSynthesis.nodes.map((node) => {
                const strokeColor =
                  node.colorAccent === 'rose'
                    ? '#fb7185'
                    : node.colorAccent === 'emerald'
                      ? '#34d399'
                      : node.colorAccent === 'amber'
                        ? '#fbbf24'
                        : node.colorAccent === 'fuchsia'
                          ? '#e879f9'
                          : '#38bdf8';

                return (
                  <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                    <rect
                      x={0}
                      y={0}
                      width={node.width}
                      height={node.height}
                      rx={6}
                      fill="#0f172a"
                      stroke={strokeColor}
                      strokeWidth="1.6"
                    />
                    {/* Header Compartment */}
                    <rect
                      x={0}
                      y={0}
                      width={node.width}
                      height={36}
                      rx={6}
                      fill="#1e293b"
                      stroke={strokeColor}
                      strokeWidth="1.2"
                    />
                    <text
                      x={node.width / 2}
                      y={13}
                      fill="#94a3b8"
                      fontSize="8.5"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {node.stereotype}
                    </text>
                    <text
                      x={node.width / 2}
                      y={28}
                      fill="#f8fafc"
                      fontSize="10.5"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {node.label.slice(0, 22)}
                    </text>

                    {/* Attributes Compartment */}
                    {node.attributes.map((attr, idx) => (
                      <text
                        key={idx}
                        x={8}
                        y={51 + idx * 13}
                        fill="#cbd5e1"
                        fontSize="8.5"
                        fontFamily="monospace"
                      >
                        {attr.slice(0, 32)}
                      </text>
                    ))}

                    {/* Compartment Divider */}
                    <line
                      x1={0}
                      y1={70}
                      x2={node.width}
                      y2={70}
                      stroke="#334155"
                      strokeWidth="1"
                    />

                    {/* Operations Compartment */}
                    {node.operations.map((op, idx) => (
                      <text
                        key={idx}
                        x={8}
                        y={84 + idx * 13}
                        fill="#7dd3fc"
                        fontSize="8.5"
                        fontFamily="monospace"
                      >
                        {op.slice(0, 32)}
                      </text>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Collapsible PlantUML & UJECTOR XMI 2.1 Code Export View */}
        {isPlantUmlXmiOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[10px]">
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-cyan-300 font-bold">
                <span>PlantUML (@startuml) Specification</span>
                <button
                  type="button"
                  onClick={() => handleCopyText('plantuml', umlRoarSynthesis.plantUmlSource)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200"
                >
                  {copiedSpec === 'plantuml' ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedSpec === 'plantuml' ? 'Copied' : 'Copy PlantUML'}</span>
                </button>
              </div>
              <pre className="p-2 rounded bg-slate-900 text-slate-300 overflow-x-auto max-h-40">
                {umlRoarSynthesis.plantUmlSource}
              </pre>
            </div>

            <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5 space-y-1.5">
              <div className="flex items-center justify-between text-amber-300 font-bold">
                <span>UJECTOR OMG XMI 2.1 (UML2_1XMIParser)</span>
                <button
                  type="button"
                  onClick={() => handleCopyText('xmi', umlRoarSynthesis.ujectorXmi21Snippet)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200"
                >
                  {copiedSpec === 'xmi' ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedSpec === 'xmi' ? 'Copied' : 'Copy XMI 2.1'}</span>
                </button>
              </div>
              <pre className="p-2 rounded bg-slate-900 text-slate-300 overflow-x-auto max-h-40">
                {umlRoarSynthesis.ujectorXmi21Snippet}
              </pre>
            </div>
          </div>
        )}

        {/* Collapsible 13 Attached UML Reference Diagrams Gallery */}
        {isUmlRefGalleryOpen && (
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5 space-y-2">
            <div className="text-[11px] font-mono font-bold text-amber-300">
              13 Attached UML 2.5 Reference Diagrams Ingested into Alyx&apos;s UJECTOR Parser
            </div>
            <div className="flex items-stretch gap-2.5 overflow-x-auto pb-1">
              {ATTACHED_13_UML_REFERENCE_ASSETS.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => {
                    setSelectedDiagramKind(asset.kind);
                    setApparatusInput(`${asset.title} -> ${asset.ujectorCodeTarget}`);
                  }}
                  className="cursor-pointer rounded-lg bg-slate-900 hover:bg-slate-800/90 border border-slate-800 p-2 min-w-[230px] max-w-[250px] shrink-0 flex flex-col justify-between gap-1.5 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="relative w-full h-24 rounded overflow-hidden bg-slate-950 border border-slate-800">
                      <Image
                        src={asset.assetPath}
                        alt={asset.title}
                        fill
                        sizes="240px"
                        referrerPolicy="no-referrer"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-mono text-cyan-300">
                      <span>{asset.id}</span>
                      <span>{asset.kind}</span>
                    </div>
                    <div className="text-[10px] font-semibold text-slate-100 line-clamp-1">
                      {asset.title}
                    </div>
                  </div>
                  <div className="text-[9px] font-mono text-emerald-300 truncate">
                    {asset.ujectorCodeTarget}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: HYPERBOOK CODE-IMPROVEMENT ROAR DOCUMENT OPTIMIZATION IMPLEMENTATION PLAN (FOR FUTURE CODING THINGIE) */}
      <div className="rounded-xl bg-slate-900/90 border border-emerald-500/35 p-3 space-y-2.5 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300">
            <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              3. Hyperbook Code-Improvement ROAR Document Optimization Implementation Plan (Ready
              for Future Coding Thingie)
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-sky-300">
            Formula: (P)riority = [ (U)rgency + (I)mportance + (A)cceleration ] / 3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-[10px]">
          {umlRoarSynthesis.roarImplementationPlan.map((step) => (
            <div
              key={step.stepCode}
              className="rounded-lg bg-slate-950 border border-slate-800 p-2.5 space-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-emerald-300">
                    {step.stepCode} · [{step.linkedRoarItemId}]
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 font-bold">
                    P={step.p.toFixed(2)} (U:{step.u} I:{step.i} A:{step.a})
                  </span>
                </div>
                <div className="text-[11px] font-sans font-semibold text-white">
                  {step.linkedRoarItemName}
                </div>
                <div className="text-slate-300 font-sans text-[10px] space-y-0.5">
                  <div>
                    <strong className="text-sky-300">[R]</strong> {step.requisite.slice(4)}
                  </div>
                  <div>
                    <strong className="text-amber-300">[O]</strong> {step.objective.slice(4)}
                  </div>
                  <div>
                    <strong className="text-emerald-300">[A]</strong> {step.actionItem.slice(4)}
                  </div>
                  <div>
                    <strong className="text-rose-300">[R]</strong> {step.requirement.slice(4)}
                  </div>
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-800/90 space-y-1">
                <div className="text-[9px] text-amber-300 truncate">{step.hyperbookNodeFormula}</div>
                <div className="px-1.5 py-1 rounded bg-slate-900 text-cyan-300 text-[9px] truncate">
                  {step.codingThingieStub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collapsible Toggle for Full 28-Item ROAR Single-Table Master Dashboard */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsRoarMasterTableOpen(!isRoarMasterTableOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-sky-300 transition-colors"
          >
            {isRoarMasterTableOpen ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
            <Table2 className="w-3.5 h-3.5" />
            <span>
              ROAR Protocol · Master 28 Operational Action Items Table (18 Systems + 10 Vibe Coding)
            </span>
          </button>

          {isRoarMasterTableOpen && (
            <div className="mt-2 rounded-xl bg-[#070b12] border border-slate-800 p-2.5 space-y-2 overflow-x-auto">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <input
                  type="text"
                  value={roarSearch}
                  onChange={(e) => setRoarSearch(e.target.value)}
                  placeholder="Filter 28 ROAR Action Items by ID, name, tag soup, or terms..."
                  className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 font-mono min-w-[240px]"
                />
                <div className="flex items-center gap-1 font-mono text-[10px]">
                  {(['ALL', 'SYSTEMS', 'VIBE'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setRoarCategoryFilter(cat)}
                      className={`px-2 py-0.5 rounded border ${
                        roarCategoryFilter === cat
                          ? 'bg-sky-500/20 text-sky-200 border-sky-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {cat === 'ALL'
                        ? 'All (28)'
                        : cat === 'SYSTEMS'
                          ? 'Core Systems (18)'
                          : 'Vibe Coding (10)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] sticky top-0">
                    <tr>
                      <th className="p-2 border-b border-slate-800">ID / Action Item</th>
                      <th className="p-2 border-b border-slate-800">Operational Description</th>
                      <th className="p-2 border-b border-slate-800">Hyperbook Formula</th>
                      <th className="p-2 border-b border-slate-800 text-center">U / I / A</th>
                      <th className="p-2 border-b border-slate-800 text-center">(P)riority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredRoarItems.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() =>
                          setApparatusInput(
                            `[${item.id}] ${item.name}: ${item.roarInsights.executionVector}`
                          )
                        }
                        className="hover:bg-slate-900/70 cursor-pointer transition-colors"
                      >
                        <td className="p-2 font-mono whitespace-nowrap">
                          <span className="text-sky-300 font-bold">{item.id}</span>{' '}
                          <span className="text-slate-100 font-sans font-semibold">
                            {item.name}
                          </span>
                        </td>
                        <td className="p-2 text-slate-300 max-w-xs truncate">{item.description}</td>
                        <td className="p-2 font-mono text-[10px] text-amber-300 whitespace-nowrap">
                          {item.hyperbookEquation}
                        </td>
                        <td className="p-2 font-mono text-center whitespace-nowrap text-slate-300">
                          {item.u} / {item.i} / {item.a}
                        </td>
                        <td className="p-2 font-mono text-center whitespace-nowrap">
                          <span className="px-1.5 py-0.5 rounded bg-sky-500/20 border border-sky-500/40 text-sky-200 font-bold">
                            {item.p.toFixed(2)} ({item.tier})
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
