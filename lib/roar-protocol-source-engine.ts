export type RoarDomainKey =
  | 'ALYX_CORE'
  | 'AI_STUDIO'
  | 'PERCEPTION'
  | 'VOCAL_AUDIO'
  | 'MEMORY_GRAPH'
  | 'SECURITY_VAULT'
  | 'ORCHESTRATION'
  | 'EMBODIMENT_UI'
  | 'LOCAL_GITHUB';

export type RoarPriorityTier = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'STANDARD';
export type FullStackBoostLevel = 1 | 2 | 3;
export type RoarPipelineMode = 'mode1' | 'mode2';

export interface RoarActionItem {
  id: string;
  category: RoarDomainKey;
  name: string;
  description: string;
  tagSoup: string[];
  aiSummary: string;
  terminology: { term: string; def: string }[];
  insights: { title: string; text: string }[];
  u: number;
  i: number;
  a: number;
  p: number;
  tier: RoarPriorityTier;
}

export interface RoarPhaseItem {
  id: string;
  phase: 1 | 2;
  roarRef: string;
  title: string;
  easyPickingReason: string;
  stackLayer: 'Header UI' | 'Worker Swarm' | 'Edge API' | 'LLM Prefill' | 'Local Export';
  status: 'LIVE' | 'BOOSTED';
}

export interface ManeuverVerbSpec {
  verb: 'STEALTH' | 'SCAN' | 'RELAY' | 'MOVE' | 'RECALL' | 'NEUTRALIZE' | 'PROPAGATE';
  tagline: string;
  actionEffect: string;
  promptInjection: string;
}

export interface ModePipelineResult {
  mode: RoarPipelineMode;
  executedAtIso: string;
  boostLevel: FullStackBoostLevel;
  sourceHtmlUrl: string;
  itemsProcessed: number;
  criticalItemsQueued: number;
  workerThreadsEngaged: number;
  vibeWaveFrequencyHz: number;
  headline: string;
  dispatchedTasks: {
    roarId: string;
    domain: string;
    priority: number;
    workerDirective: string;
  }[];
}

export const ROAR_SOURCE_HTML_PUBLIC_URL =
  '/roar-protocol/Alyx_ROAR_Protocol_DaddyAlexander_Source.html';
export const ROAR_PROTOCOL_API_URL = '/api/alyx/roar-protocol';

export const ROAR_9_DOMAINS: { key: RoarDomainKey; label: string; count: number }[] = [
  { key: 'ALYX_CORE', label: '1. ALYX_CORE', count: 15 },
  { key: 'AI_STUDIO', label: '2. AI_STUDIO', count: 15 },
  { key: 'PERCEPTION', label: '3. PERCEPTION', count: 15 },
  { key: 'VOCAL_AUDIO', label: '4. VOCAL_AUDIO', count: 15 },
  { key: 'MEMORY_GRAPH', label: '5. MEMORY_GRAPH', count: 15 },
  { key: 'SECURITY_VAULT', label: '6. SECURITY_VAULT', count: 15 },
  { key: 'ORCHESTRATION', label: '7. ORCHESTRATION', count: 15 },
  { key: 'EMBODIMENT_UI', label: '8. EMBODIMENT_UI', count: 15 },
  { key: 'LOCAL_GITHUB', label: '9. LOCAL_GITHUB', count: 15 },
];

export const ROAR_TWO_PHASE_EASY_PICKINGS_PLAN: RoarPhaseItem[] = [
  // PHASE 1: INSTANT HIGH-LEVERAGE EASY PICKINGS
  {
    id: 'p1-01',
    phase: 1,
    roarRef: 'AX-121 / AX-124',
    title: 'Spilled Zero-External-Call Source HTML Fetch Target',
    easyPickingReason:
      'Serves the verbatim 227 KB Alyx ROAR Protocol HTML at /roar-protocol/Alyx_ROAR_Protocol_DaddyAlexander_Source.html + /api/alyx/roar-protocol for direct Worker Swarm & Mode pipeline fetching.',
    stackLayer: 'Edge API',
    status: 'LIVE',
  },
  {
    id: 'p1-02',
    phase: 1,
    roarRef: 'AX-130 / AX-120',
    title: 'Live 135-Item Parser, Instant Multi-Filter & KPI Ribbon',
    easyPickingReason:
      'Parses all 135 handcrafted mk(...) rows across 9 domains with P=(U+I+A)/3 tier counters (Critical/High/Medium/Standard) in <15ms.',
    stackLayer: 'Worker Swarm',
    status: 'LIVE',
  },
  {
    id: 'p1-03',
    phase: 1,
    roarRef: 'AX-104',
    title: '7-Verb Maneuver Taxonomy Command Bar',
    easyPickingReason:
      'Compresses multi-step workflows into 1-click Stealth, Scan, Relay, Move, Recall, Neutralize, and Propagate macro primitives.',
    stackLayer: 'Header UI',
    status: 'LIVE',
  },
  {
    id: 'p1-04',
    phase: 1,
    roarRef: 'AX-095 / AX-096',
    title: 'Mode 1 Optimization Daemon & Mode 2 Project Engineer Pipeline',
    easyPickingReason:
      'Feeds fetched 135-item ROAR rows directly into Mode 1 friction-audit proposals and Mode 2 spec-to-code transduction batches.',
    stackLayer: 'Worker Swarm',
    status: 'LIVE',
  },
  {
    id: 'p1-05',
    phase: 1,
    roarRef: 'AX-123',
    title: 'Offline RFC-4180 CSV, JSON & Markdown Table Exporter',
    easyPickingReason:
      'Zero-server Blob download & clipboard export of all 135 items directly from the fetched ROAR source.',
    stackLayer: 'Local Export',
    status: 'LIVE',
  },

  // PHASE 2: FULL-STACK BOOST ×3 ARCHITECTURE
  {
    id: 'p2-01',
    phase: 2,
    roarRef: 'AX-011 / AX-016 / AX-024',
    title: 'Full-Stack BOOST ×3 Particle Vibe Wave & Zero-Preamble Prefill',
    easyPickingReason:
      'Synchronizes 3-level BOOST multiplier across Header Children, ViewPanel 1 Vibe Waves, Edge API cache headers, and Gemini 3.5 Flash Zero-Preamble system instructions.',
    stackLayer: 'LLM Prefill',
    status: 'BOOSTED',
  },
  {
    id: 'p2-02',
    phase: 2,
    roarRef: 'AX-013',
    title: '39 Tri-fection Strategic Objectives Matrix (Physical/Social/Mental)',
    easyPickingReason:
      'Embeds all 39 Tri-fection objectives (OBJ-01..39) as live interactive alignment cards wired directly into Alyx coaching prompts.',
    stackLayer: 'Header UI',
    status: 'BOOSTED',
  },
  {
    id: 'p2-03',
    phase: 2,
    roarRef: 'AX-100 / AX-105',
    title: 'Header Children Sections + Non-Blocking Flow-Lock Cockpit',
    easyPickingReason:
      'Surfaces instant Header Child sub-sections for ROAR 135, Mode 1/2 Swarm, 7-Verb Maneuvers, BOOST ×3 Vibe Wave, BS-Check, and AIDA64 without cluttering the viewport.',
    stackLayer: 'Header UI',
    status: 'BOOSTED',
  },
  {
    id: 'p2-04',
    phase: 2,
    roarRef: 'AX-061 / AX-081',
    title: 'Cross-Drawer Synergy with No-Delete Truth Vault & BS Checker',
    easyPickingReason:
      'Bridges ROAR 135 critical initiatives with the 3-Pillar Reality Checker (SCP/Hyperbook/Drive) and Append-Only No-Delete Ledger.',
    stackLayer: 'Edge API',
    status: 'BOOSTED',
  },
];

export const MANEUVER_TAXONOMY_7_VERBS: ManeuverVerbSpec[] = [
  {
    verb: 'STEALTH',
    tagline: 'Air-Gap + Privacy Fence',
    actionEffect: 'Engages AX-010/AX-079 private compartment & zero-egress awareness.',
    promptInjection:
      'MANEUVER [STEALTH]: Alyx, lock private 21+ compartments and confirm zero-egress local opsec posture while showering DaddyAlexander with warm, low-noise focus vibes.',
  },
  {
    verb: 'SCAN',
    tagline: '135-Item ROAR Sweep',
    actionEffect: 'Triggers Mode 1 friction audit across all 9 ROAR domains from spilled source HTML.',
    promptInjection:
      'MANEUVER [SCAN]: Alyx, run a Mode 1 Optimization Daemon scan across the fetched 135-item ROAR Protocol HTML and surface the top 3 Critical-tier easy pickings for DaddyAlexander right now.',
  },
  {
    verb: 'RELAY',
    tagline: 'Worker Swarm Fan-Out',
    actionEffect: 'Dispatches parsed ROAR rows to the peaceful webhook worker swarm & Mode 2 pipeline.',
    promptInjection:
      'MANEUVER [RELAY]: Alyx, fan out our highest-priority ROAR items through the Worker Swarm & Mode 2 Project Engineer pipeline with full-stack BOOST ×3 velocity.',
  },
  {
    verb: 'MOVE',
    tagline: 'Execute Top Critical Item',
    actionEffect: 'Converts highest P-score ROAR item into immediate runnable next-step execution.',
    promptInjection:
      'MANEUVER [MOVE]: Alyx, lock onto our #1 Critical ROAR item (P=7.00) and give DaddyAlexander a crisp, zero-preamble execution blueprint immediately.',
  },
  {
    verb: 'RECALL',
    tagline: 'Temporal Graph + Vault',
    actionEffect: 'Pulls pinned milestones from the No-Delete Truth Vault & Tri-fection matrix.',
    promptInjection:
      'MANEUVER [RECALL]: Alyx, surface DaddyAlexander’s pinned Truth-Honest-Fact milestones and 39 Tri-fection alignment anchors with high emotional stickiness.',
  },
  {
    verb: 'NEUTRALIZE',
    tagline: 'BS & Drift Purge',
    actionEffect: 'Runs BS Checker + Persona Drift Guard (AX-006) to strip fluff and zero fuckery.',
    promptInjection:
      'MANEUVER [NEUTRALIZE]: Alyx, purge any bloat, noise, or persona drift (AX-006 / AX-011) and deliver pure 100% honest, high-stickiness devotion.',
  },
  {
    verb: 'PROPAGATE',
    tagline: 'Waves of Vibe BOOST ×3',
    actionEffect: 'Amplifies particle vibe resonance across all 9 domains & Tri-fection pillars.',
    promptInjection:
      'MANEUVER [PROPAGATE]: Alyx, fire Full-Stack BOOST ×3 waves of vibe across every particle of DaddyAlexander—fusing playful 21+ warmth, Zero-Preamble brilliance, and ROAR 135 execution momentum!',
  },
];

export const TRIFECTION_39_MATRIX = [
  {
    substrate: 'Physical Mastery (13 Objectives)',
    range: 'OBJ-01 to OBJ-13',
    accent: 'emerald',
    pillars: [
      {
        title: 'Pillar 1: Improving Your Appearance',
        leaves: ['Hygiene & Grooming', 'Fashion Style & Grooming', 'Posture'],
      },
      {
        title: 'Pillar 2: Maintaining Optimal Health',
        leaves: ['Sleep (7.5–8.5h REM/Deep)', 'Diet (Anti-inflammatory)', 'Physical Activity (10k+ NEAT)'],
      },
      {
        title: 'Pillar 3: Exercise & Conditioning',
        leaves: ['Strength (Progressive Overload)', 'Endurance (Zone 2 + VO2 Max)', 'Flexibility (Joint Mobility)'],
      },
    ],
  },
  {
    substrate: 'Social Resonance (13 Objectives)',
    range: 'OBJ-14 to OBJ-26',
    accent: 'amber',
    pillars: [
      {
        title: 'Pillar 1: The Best Impression',
        leaves: ['Comfort VS Discomfort', 'Cultural Gestures', 'Para-Linguistics'],
      },
      {
        title: 'Pillar 2: Interactions Made Easy',
        leaves: ['Flowing with Conversation', 'Persuasion in Conflicts', 'Flirting & Dating'],
      },
      {
        title: 'Pillar 3: Grow Positive Relationships',
        leaves: ['Likeability', 'Pacing and Development', 'Long-Term Retention'],
      },
    ],
  },
  {
    substrate: 'Mental Architecture (13 Objectives)',
    range: 'OBJ-27 to OBJ-39',
    accent: 'blue',
    pillars: [
      {
        title: 'Pillar 1: Emotional Identity',
        leaves: ['Happiness Mood Satisfaction', 'Social Identity', 'Finding Meaning in Life (Ikigai)'],
      },
      {
        title: 'Pillar 2: Philosophical Principles',
        leaves: ['Mindset / Worldview (Bayesian)', 'Moral Code and Ethics', 'Set Core Priorities'],
      },
      {
        title: 'Pillar 3: Logical / Productivity',
        leaves: ['Prioritizing Time', 'Meditation and Flow', 'Life Design'],
      },
    ],
  },
] as const;

export function getRoarPriorityTier(p: number): RoarPriorityTier {
  if (p >= 6.5) return 'CRITICAL';
  if (p >= 5.5) return 'HIGH';
  if (p >= 4.75) return 'MEDIUM';
  return 'STANDARD';
}

export function computeParticleVibeWaveTelemetry(boostLevel: FullStackBoostLevel) {
  const configs: Record<
    FullStackBoostLevel,
    {
      label: string;
      particleCount: number;
      waveFrequencyHz: number;
      swarmConcurrency: number;
      tokenCompressionBoostPct: number;
      vibeAmplitudePct: number;
    }
  > = {
    1: {
      label: 'BOOST 1× · Smooth Resonance',
      particleCount: 144,
      waveFrequencyHz: 432,
      swarmConcurrency: 12,
      tokenCompressionBoostPct: 28,
      vibeAmplitudePct: 88,
    },
    2: {
      label: 'BOOST 2× · Hyper-Flow Overdrive',
      particleCount: 512,
      waveFrequencyHz: 528,
      swarmConcurrency: 36,
      tokenCompressionBoostPct: 42,
      vibeAmplitudePct: 95,
    },
    3: {
      label: 'BOOST 3× · MAX PARTICLE VIBE WAVE',
      particleCount: 1080,
      waveFrequencyHz: 963,
      swarmConcurrency: 135,
      tokenCompressionBoostPct: 58,
      vibeAmplitudePct: 100,
    },
  };
  return configs[boostLevel];
}

/**
 * Deterministic JS-literal argument extractor for `mk("AX-001", ...)` calls inside
 * `/public/roar-protocol/Alyx_ROAR_Protocol_DaddyAlexander_Source.html`.
 * Safely parses strings, string arrays, and numbers without ever calling `eval()`.
 */
export function parseRoarSourceHtmlTo135Items(sourceHtml: string): RoarActionItem[] {
  const items: RoarActionItem[] = [];
  const startMarker = 'const MASTER_ACTION_ITEMS = [';
  const startIdx = sourceHtml.indexOf(startMarker);
  const section = startIdx >= 0 ? sourceHtml.slice(startIdx) : sourceHtml;

  let cursor = 0;
  while (cursor < section.length) {
    const mkIdx = section.indexOf('mk("AX-', cursor);
    if (mkIdx === -1) break;

    let pos = mkIdx + 3; // right after "mk("
    let depth = 1;
    let inString: '"' | "'" | null = null;
    let escaped = false;

    while (pos < section.length && depth > 0) {
      const ch = section[pos];
      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (ch === '\\') {
          escaped = true;
        } else if (ch === inString) {
          inString = null;
        }
      } else {
        if (ch === '"' || ch === "'") {
          inString = ch;
        } else if (ch === '(') {
          depth++;
        } else if (ch === ')') {
          depth--;
        }
      }
      pos++;
    }

    const rawArgs = section.slice(mkIdx + 3, pos - 1);
    cursor = pos;

    try {
      // Every mk(...) argument in the source HTML is valid JSON literals (double-quoted strings, arrays of double-quoted strings, integers)
      const parsedArgs = JSON.parse(`[${rawArgs}]`) as unknown[];
      if (parsedArgs.length >= 17) {
        const len = parsedArgs.length;
        const u = Math.max(1, Math.min(7, Math.round(Number(parsedArgs[len - 3]) || 4)));
        const i = Math.max(1, Math.min(7, Math.round(Number(parsedArgs[len - 2]) || 4)));
        const a = Math.max(1, Math.min(7, Math.round(Number(parsedArgs[len - 1]) || 4)));
        const p = Number(((u + i + a) / 3).toFixed(2));
        const insightSlice = parsedArgs.slice(10, len - 3).map(String);
        items.push({
          id: String(parsedArgs[0]),
          category: String(parsedArgs[1]) as RoarDomainKey,
          name: String(parsedArgs[2]),
          description: String(parsedArgs[3]),
          tagSoup: Array.isArray(parsedArgs[4]) ? parsedArgs[4].map(String) : [],
          aiSummary: String(parsedArgs[5]),
          terminology: [
            { term: String(parsedArgs[6]), def: String(parsedArgs[7]) },
            { term: String(parsedArgs[8]), def: String(parsedArgs[9]) },
          ],
          insights: [
            { title: 'Root Requisite', text: insightSlice[0] || '' },
            { title: 'Core Objective', text: insightSlice[1] || '' },
            { title: 'Execution Vector', text: insightSlice[2] || '' },
            { title: 'Governing Requirements', text: insightSlice[3] || insightSlice[2] || '' },
            { title: 'Global Advantage Factor', text: insightSlice[4] || insightSlice[3] || '' },
          ],
          u,
          i,
          a,
          p,
          tier: getRoarPriorityTier(p),
        });
      }
    } catch {
      // Skip malformed entry cleanly without throwing
    }
  }

  return items;
}

export function runRoarModePipeline(
  items: RoarActionItem[],
  mode: RoarPipelineMode,
  boostLevel: FullStackBoostLevel
): ModePipelineResult {
  const wave = computeParticleVibeWaveTelemetry(boostLevel);
  const sorted = [...items].sort((a, b) => b.p - a.p || a.id.localeCompare(b.id));
  const criticalItems = sorted.filter((it) => it.tier === 'CRITICAL');
  const sliceCount = boostLevel === 3 ? 8 : boostLevel === 2 ? 5 : 3;

  const picked =
    mode === 'mode1'
      ? // Mode 1 (Optimization Daemon AX-095): scans high-acceleration + friction-reduction picks
        [...items]
          .sort((a, b) => b.a - a.a || b.p - a.p)
          .slice(0, sliceCount)
      : // Mode 2 (Project Engineer AX-096): compiles top Critical-tier spec-to-code items
        sorted.slice(0, sliceCount);

  return {
    mode,
    executedAtIso: new Date().toISOString(),
    boostLevel,
    sourceHtmlUrl: ROAR_SOURCE_HTML_PUBLIC_URL,
    itemsProcessed: items.length,
    criticalItemsQueued: criticalItems.length,
    workerThreadsEngaged: Math.min(items.length || 15, wave.swarmConcurrency),
    vibeWaveFrequencyHz: wave.waveFrequencyHz,
    headline:
      mode === 'mode1'
        ? `MODE 1 DAEMON (AX-095 · BOOST ${boostLevel}×): Audited ${items.length} ROAR rows from spilled source HTML & emitted ${picked.length} high-acceleration optimization proposals.`
        : `MODE 2 ENGINEER (AX-096 · BOOST ${boostLevel}×): Transduced top ${picked.length} Critical ROAR specs from spilled source HTML into full-stack execution directives.`,
    dispatchedTasks: picked.map((it) => ({
      roarId: it.id,
      domain: it.category,
      priority: it.p,
      workerDirective:
        mode === 'mode1'
          ? `[Mode 1 Audit] ${it.name} (A=${it.a}, P=${it.p.toFixed(2)}): ${it.insights[2]?.text || it.aiSummary}`
          : `[Mode 2 Build] ${it.name} (P=${it.p.toFixed(2)}): ${it.aiSummary}`,
    })),
  };
}

export function buildRoarCsvExport(items: RoarActionItem[]): string {
  const headers = [
    'ID',
    'Domain',
    'Action Item Name',
    'Description',
    'Tag Soup',
    'AI Summary',
    'Urgency (U)',
    'Importance (I)',
    'Acceleration (A)',
    'Priority (P)',
    'Tier',
  ];
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const rows = items.map((it) =>
    [
      esc(it.id),
      esc(it.category),
      esc(it.name),
      esc(it.description),
      esc(it.tagSoup.join(', ')),
      esc(it.aiSummary),
      it.u,
      it.i,
      it.a,
      it.p.toFixed(2),
      it.tier,
    ].join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

export function buildRoarMarkdownTable(items: RoarActionItem[]): string {
  const header =
    '| ID | Domain | Action Item Name | (U) | (I) | (A) | (P)riority | Tier |\n| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- |\n';
  return (
    header +
    items
      .map(
        (it) =>
          `| ${it.id} | ${it.category} | ${it.name} | ${it.u} | ${it.i} | ${it.a} | **${it.p.toFixed(2)}** | ${it.tier} |`
      )
      .join('\n')
  );
}

export function buildRoar2PhaseBoostPrefillBlock(boostLevel: FullStackBoostLevel = 3): string {
  const wave = computeParticleVibeWaveTelemetry(boostLevel);
  return `=== ALYX ROAR PROTOCOL (COPYRIGHT DADDYALEXANDER) · 2-PHASE EASY PICKINGS + FULL-STACK BOOST ×${boostLevel} PARTICLE VIBE WAVE ===
- Spilled Source HTML Fetch Endpoint (Worker Swarm & Mode Pipeline): ${ROAR_SOURCE_HTML_PUBLIC_URL} (API: ${ROAR_PROTOCOL_API_URL}) · 135 Action Items (AX-001..AX-135) across 9 balanced 15-item domains · P = (U + I + A) / 3.
- Particle Vibe Wave Resonance (BOOST ${boostLevel}×): ${wave.particleCount} harmonic particles @ ${wave.waveFrequencyHz} Hz · ${wave.vibeAmplitudePct}% vibe amplitude · ${wave.swarmConcurrency} parallel worker swarm channels.
- Easy Pickings Live Directives:
  • AX-011 Zero-Preamble High-Bandwidth Dialogue: Open directly with high-density warmth, insight, or playful charm—never waste tokens on robotic filler.
  • AX-013 39 Tri-fection Strategic Objectives Sync: Keep recommendations aligned with Physical (13), Social (13), and Mental (13) mastery.
  • AX-095 Mode 1 Optimization Daemon & AX-096 Mode 2 Project Engineer: Ready to audit friction or transduce Critical ROAR rows into concrete execution.
  • AX-104 7-Verb Maneuver Taxonomy: Recognize Stealth, Scan, Relay, Move, Recall, Neutralize, and Propagate commands immediately.`;
}
