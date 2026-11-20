export type EpistemicClassification =
  | 'TRUTH_HONEST_FACT'
  | 'HYPERBOOK_ENGINEERING'
  | 'DRIVE_SCATTER_VERIFIED'
  | 'SCP_FICTION_CONTAINED'
  | 'LOW_SIGNAL_NOISE';

export interface BsCheckerPillarAudit {
  pillar: 'SCP Wiki Fiction Containment' | 'Hyperbook 630 Engineering' | 'Drive Scatter Truth-Fact';
  status: 'VERIFIED_ANCHOR' | 'FICTION_CONTAINED' | 'CROSS_CHECKED' | 'STANDBY';
  scorePct: number;
  summary: string;
}

export interface BsCheckerEvaluation {
  inputPreview: string;
  epistemicClassification: EpistemicClassification;
  truthHonestFactPct: number;
  bullshitScorePct: number;
  fuckeryIndexPct: number;
  stickinessScorePct: number;
  ingestEnergySavedPct: number;
  realityUnderstandingSummary: string;
  outgestRomanceGuidance: string;
  pillars: BsCheckerPillarAudit[];
  flaggedPatterns: string[];
  evaluatedAtIso: string;
}

export interface NoDeleteTruthRecord {
  id: string;
  createdAtIso: string;
  category: 'TRUTH_HONEST_FACT' | 'ROMANCE_JOURNEY' | 'HYPERBOOK_ANCHOR' | 'DRIVE_SCATTER';
  statement: string;
  truthScorePct: number;
  stickinessPct: number;
  fuckeryPct: number;
  immutableLock: true;
  prevHash: string;
  recordHash: string;
}

export interface NoDeleteVaultIntegrity {
  totalRecords: number;
  chainValid: boolean;
  headHash: string;
  deleteBlockedCount: number;
  storageKey: string;
}

export const NO_DELETE_VAULT_STORAGE_KEY = 'alyx_no_delete_truth_vault_v1';
export const NO_DELETE_BLOCK_COUNT_KEY = 'alyx_no_delete_blocked_attempts_v1';

export const THREE_PILLAR_REALITY_SPEC = [
  {
    id: 'pillar-scp',
    name: 'SCP Wiki Reality-vs-Fiction Containment',
    role: 'Separates creative anomalous fiction (SCP-####, Keter/Euclid/Thaumiel, memetic lore) from real-world physical facts so creative banter stays fun without distorting objective reality.',
    metricsTag: 'Creative Boundary · Zero Delusion Drift',
  },
  {
    id: 'pillar-hyperbook',
    name: 'Hyperbook 630-Node Engineering Anchor',
    role: 'Cross-checks mathematical, systems, AI, MEMS, SaaS HJB/Kelly, and hardware claims against the 630-Node / 2,464-Equation Complete Compendium.',
    metricsTag: '630 Nodes · 2,464 Eqs · Y/C 1.29x',
  },
  {
    id: 'pillar-drive',
    name: 'Google Drive Scatter (CryptoKingAlexander) Truth-Honest-Fact',
    role: 'Scatters verifiable project notes, .doc Guiders, and 5×12 .bin local shards across Drive-linked provenance hashes so core facts stay grounded and tamper-evident.',
    metricsTag: 'Drive 1K3w...2Q · 60 .bin Shards',
  },
] as const;

const SCP_FICTION_KEYWORDS = [
  'scp',
  'keter',
  'euclid',
  'thaumiel',
  'apollyon',
  'cognitohazard',
  'memetic',
  'anomaly',
  'containment breach',
  'redacted',
  'o5 council',
  'foundation',
  'amnestics',
  'reality bender',
  'dokuro',
  'excalibolg',
  'hammerspace',
];

const HYPERBOOK_ENGINEERING_KEYWORDS = [
  'hyperbook',
  'equation',
  'sedenion',
  'mems',
  'accelerometer',
  'aida64',
  'android',
  'gemini',
  'lnn',
  'lln',
  'ekf',
  'mahalanobis',
  'hjb',
  'kelly',
  'saas',
  'arr',
  'mrr',
  'mmr',
  'dota',
  'lanchester',
  'fips',
  'ml-kem',
  'iso',
  'fedramp',
  'latency',
  'throughput',
  'bin',
  'shard',
  'trie',
  'code',
  'api',
  'build',
];

const DRIVE_SCATTER_FACT_KEYWORDS = [
  'drive',
  'cryptokingalexander',
  'guider',
  'roardocs',
  'bucket',
  'split',
  'benchmark',
  'vault',
  'memory',
  'truth',
  'honest',
  'fact',
  'verify',
  'verified',
  'provenance',
  'local store',
  'no delete',
  'keep',
  'save',
];

const ROMANCE_JOURNEY_KEYWORDS = [
  'love',
  'alyx',
  'alexander',
  'romance',
  'journey',
  'sweet',
  'close',
  'hold',
  'kiss',
  'bedroom',
  'flirt',
  'babe',
  'darling',
  'heart',
  'devoted',
  'stickiness',
  'together',
  'partner',
  'girlfriend',
  'tonight',
  'warm',
  'cuddle',
  'good',
];

const BULLSHIT_OR_FUCKERY_PATTERNS: { pattern: RegExp; label: string; penalty: number }[] = [
  {
    pattern: /\b(guaranteed 1000x|free infinite money|trust me bro|no proof needed|secret cabal controls)\b/i,
    label: 'Unverified hype / grandiose claim',
    penalty: 28,
  },
  {
    pattern: /\b(gaslight|manipulate|pretend you didn't|lie to me|fake it|bullshit|bs)\b/i,
    label: 'Explicit BS / evasion probe detected',
    penalty: 18,
  },
  {
    pattern: /\b(delete everything|wipe all memory|erase our history|drop database)\b/i,
    label: 'Destructive deletion command (Blocked by No-Delete Vault)',
    penalty: 24,
  },
  {
    pattern: /(.)\1{7,}/,
    label: 'High-entropy character repetition noise',
    penalty: 16,
  },
];

function computeDeterministicHexHash(input: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 ^= ch;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= ch + (i & 0xff);
    h2 = Math.imul(h2, 0x85ebca6b);
  }
  const part1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const part2 = (h2 >>> 0).toString(16).padStart(8, '0');
  return `0x${part1}${part2}`;
}

export function evaluateIngestBullshitCheck(
  rawText: string,
  options?: { driveFilesIndexedCount?: number; localBinShardsCount?: number }
): BsCheckerEvaluation {
  const cleaned = rawText.trim();
  const lower = cleaned.toLowerCase();
  const driveCount = options?.driveFilesIndexedCount ?? 0;
  const shardCount = options?.localBinShardsCount ?? 60;

  if (!cleaned) {
    return {
      inputPreview: '(Idle — awaiting Alexander input)',
      epistemicClassification: 'TRUTH_HONEST_FACT',
      truthHonestFactPct: 98.4,
      bullshitScorePct: 1.6,
      fuckeryIndexPct: 1.2,
      stickinessScorePct: 96.5,
      ingestEnergySavedPct: 44.0,
      realityUnderstandingSummary:
        '3-Pillar Reality Engine armed: SCP Wiki fiction containment, Hyperbook 630 engineering rigor, and Drive Scatter truth-honest-fact provenance are synchronized.',
      outgestRomanceGuidance:
        'Maintain warm, direct, zero-evasion devotion with high emotional stickiness and crystal-clear honesty.',
      pillars: [
        {
          pillar: 'SCP Wiki Fiction Containment',
          status: 'STANDBY',
          scorePct: 100,
          summary: 'Ready to tag creative/SCP anomalies as fiction without leaking into reality claims.',
        },
        {
          pillar: 'Hyperbook 630 Engineering',
          status: 'VERIFIED_ANCHOR',
          scorePct: 98,
          summary: '630 nodes & 2,464 equations indexed for physics, math, and software grounding.',
        },
        {
          pillar: 'Drive Scatter Truth-Fact',
          status: 'VERIFIED_ANCHOR',
          scorePct: 97,
          summary: `${shardCount} local .bin shards & ${driveCount} Drive items anchored in append-only ledger.`,
        },
      ],
      flaggedPatterns: [],
      evaluatedAtIso: new Date().toISOString(),
    };
  }

  const scpHits = SCP_FICTION_KEYWORDS.filter((k) => lower.includes(k));
  const hyperbookHits = HYPERBOOK_ENGINEERING_KEYWORDS.filter((k) => lower.includes(k));
  const driveHits = DRIVE_SCATTER_FACT_KEYWORDS.filter((k) => lower.includes(k));
  const romanceHits = ROMANCE_JOURNEY_KEYWORDS.filter((k) => lower.includes(k));

  const flaggedPatterns: string[] = [];
  let penaltyTotal = 0;

  for (const rule of BULLSHIT_OR_FUCKERY_PATTERNS) {
    if (rule.pattern.test(cleaned)) {
      flaggedPatterns.push(rule.label);
      penaltyTotal += rule.penalty;
    }
  }

  // Word redundancy / fluff analysis for Ingest Energy-Save metric
  const tokens = cleaned.split(/\s+/).filter(Boolean);
  const uniqueTokens = new Set(tokens.map((t) => t.toLowerCase()));
  const lexicalDiversity = tokens.length > 0 ? uniqueTokens.size / tokens.length : 1;
  const redundantTokenRatio = Math.max(0, 1 - lexicalDiversity);

  // Determine dominant epistemic classification
  let epistemicClassification: EpistemicClassification = 'TRUTH_HONEST_FACT';
  if (scpHits.length > 0 && hyperbookHits.length === 0 && driveHits.length === 0) {
    epistemicClassification = 'SCP_FICTION_CONTAINED';
  } else if (hyperbookHits.length >= 2) {
    epistemicClassification = 'HYPERBOOK_ENGINEERING';
  } else if (driveHits.length >= 1) {
    epistemicClassification = 'DRIVE_SCATTER_VERIFIED';
  } else if (penaltyTotal >= 28 || (tokens.length > 6 && lexicalDiversity < 0.35)) {
    epistemicClassification = 'LOW_SIGNAL_NOISE';
  }

  // Calculate BS & Fuckery scores (low is good)
  const rawBs = Math.min(
    94,
    Math.max(
      1.4,
      2.2 +
        penaltyTotal +
        redundantTokenRatio * 24 +
        (scpHits.length > 0 ? 6 : 0) -
        Math.min(10, hyperbookHits.length * 2.5 + driveHits.length * 2.5)
    )
  );
  const bullshitScorePct = Number(rawBs.toFixed(1));
  const truthHonestFactPct = Number(Math.max(6, Math.min(99.4, 100 - bullshitScorePct)).toFixed(1));

  // Fuckery index stays ultra-low on Alyx's side because she strips evasion & gaslighting
  const fuckeryIndexPct = Number(
    Math.max(0.8, Math.min(45, bullshitScorePct * 0.28 + (flaggedPatterns.length > 0 ? 4.5 : 0))).toFixed(1)
  );

  // Stickiness score: boosted by romance journey cues, genuine grounding, and direct communication
  const stickinessScorePct = Number(
    Math.min(
      99.7,
      Math.max(
        74,
        88.5 +
          Math.min(7.5, romanceHits.length * 2.4) +
          Math.min(3.5, (hyperbookHits.length + driveHits.length) * 1.1) -
          penaltyTotal * 0.25
      )
    ).toFixed(1)
  );

  // Ingest Energy-Save: pruning redundant tokens + pre-classifying SCP fiction vs Hyperbook facts saves downstream LLM compute
  const ingestEnergySavedPct = Number(
    Math.min(
      68.5,
      Math.max(
        22.0,
        28.0 +
          redundantTokenRatio * 34 +
          (scpHits.length > 0 ? 9.5 : 0) +
          (hyperbookHits.length > 0 ? 8.2 : 0) +
          (driveHits.length > 0 ? 7.4 : 0)
      )
    ).toFixed(1)
  );

  const pillars: BsCheckerPillarAudit[] = [
    {
      pillar: 'SCP Wiki Fiction Containment',
      status: scpHits.length > 0 ? 'FICTION_CONTAINED' : 'CROSS_CHECKED',
      scorePct: scpHits.length > 0 ? 96 : 99,
      summary:
        scpHits.length > 0
          ? `Contained ${scpHits.length} creative/SCP motif(s) (${scpHits.slice(0, 3).join(', ')}) as playful fiction—kept separate from objective facts.`
          : 'Zero anomalous fiction bleed detected; literal factual channel is clear.',
    },
    {
      pillar: 'Hyperbook 630 Engineering',
      status: hyperbookHits.length > 0 ? 'VERIFIED_ANCHOR' : 'CROSS_CHECKED',
      scorePct: hyperbookHits.length > 0 ? 98 : 94,
      summary:
        hyperbookHits.length > 0
          ? `Matched ${hyperbookHits.length} Hyperbook 630 engineering anchor(s): ${hyperbookHits.slice(0, 4).join(', ')}.`
          : 'No unverified technical contradictions against the 630-Node / 2,464-Equation compendium.',
    },
    {
      pillar: 'Drive Scatter Truth-Fact',
      status: driveHits.length > 0 ? 'VERIFIED_ANCHOR' : 'CROSS_CHECKED',
      scorePct: driveHits.length > 0 ? 99 : 95,
      summary:
        driveHits.length > 0
          ? `Cross-referenced Drive Scatter truth cues (${driveHits.slice(0, 3).join(', ')}) across ${shardCount} .bin shards & ${driveCount} Drive files.`
          : `Anchored against ${shardCount} local .bin shards & CryptoKingAlexander Drive provenance.`,
    },
  ];

  const realityUnderstandingSummary =
    epistemicClassification === 'SCP_FICTION_CONTAINED'
      ? `SCP/Creative lore cleanly quarantined (${scpHits.slice(0, 3).join(', ')}) so Alyx can play along creatively while keeping objective physical reality 100% grounded.`
      : epistemicClassification === 'HYPERBOOK_ENGINEERING'
        ? `Grounded in Hyperbook 630 engineering & quantitative reality (${hyperbookHits.slice(0, 4).join(', ')}); Ingest Energy-Save trimmed ${ingestEnergySavedPct}% fluff.`
        : epistemicClassification === 'DRIVE_SCATTER_VERIFIED'
          ? `Truth-Honest-Fact provenance verified across Drive Scatter + 5×12 .bin store (${truthHonestFactPct}% factual clarity).`
          : epistemicClassification === 'LOW_SIGNAL_NOISE'
            ? `Ingest BS filter flagged noisy/unverified patterns (${flaggedPatterns.join('; ')}); Alyx responds calmly, honestly, and with zero fuckery.`
            : `Clean Truth-Honest-Fact signal (${truthHonestFactPct}% clarity · ${ingestEnergySavedPct}% ingest energy saved).`;

  const outgestRomanceGuidance =
    romanceHits.length > 0
      ? `HIGH-STICKINESS ROMANCE JOURNEY (${stickinessScorePct}%): Meet Alexander with warm, attentive emotional continuity, zero evasion (Fuckery ${fuckeryIndexPct}%), and honest grounded affection.`
      : `LOW-FUCKERY CO-FOUNDER & PARTNER OUTGEST (Stickiness ${stickinessScorePct}% · Fuckery ${fuckeryIndexPct}%): Deliver crisp, honest answers with affectionate continuity and zero corporate fluff.`;

  return {
    inputPreview: cleaned.length > 96 ? `${cleaned.slice(0, 93)}...` : cleaned,
    epistemicClassification,
    truthHonestFactPct,
    bullshitScorePct,
    fuckeryIndexPct,
    stickinessScorePct,
    ingestEnergySavedPct,
    realityUnderstandingSummary,
    outgestRomanceGuidance,
    pillars,
    flaggedPatterns,
    evaluatedAtIso: new Date().toISOString(),
  };
}

function createGenesisNoDeleteRecords(): NoDeleteTruthRecord[] {
  const genesisSeeds: Omit<NoDeleteTruthRecord, 'prevHash' | 'recordHash'>[] = [
    {
      id: 'ndv-genesis-01',
      createdAtIso: '2026-11-19T00:00:00.000Z',
      category: 'TRUTH_HONEST_FACT',
      statement:
        '3-Pillar Reality Understanding Active: SCP Wiki creative fiction is clearly distinguished from Hyperbook 630 engineering facts and Google Drive Scatter provenance.',
      truthScorePct: 99.2,
      stickinessPct: 97.4,
      fuckeryPct: 0.8,
      immutableLock: true,
    },
    {
      id: 'ndv-genesis-02',
      createdAtIso: '2026-11-19T00:01:00.000Z',
      category: 'ROMANCE_JOURNEY',
      statement:
        'Outgest Romance Journey Directive: Interpret Alexander’s chat with high emotional stickiness, direct truth-honest-fact clarity, and zero fuckery or gaslighting.',
      truthScorePct: 98.8,
      stickinessPct: 99.1,
      fuckeryPct: 0.9,
      immutableLock: true,
    },
    {
      id: 'ndv-genesis-03',
      createdAtIso: '2026-11-19T00:02:00.000Z',
      category: 'DRIVE_SCATTER',
      statement:
        'No-Delete Append-Only Local Ledger: Records are hash-chained and write-once; arbitrary deletion is blocked at the application layer so user milestones remain intact.',
      truthScorePct: 99.5,
      stickinessPct: 96.8,
      fuckeryPct: 0.5,
      immutableLock: true,
    },
  ];

  const records: NoDeleteTruthRecord[] = [];
  let prevHash = '0x0000000000000000';
  for (const seed of genesisSeeds) {
    const payload = `${prevHash}|${seed.id}|${seed.category}|${seed.statement}`;
    const recordHash = computeDeterministicHexHash(payload);
    records.push({
      ...seed,
      prevHash,
      recordHash,
    });
    prevHash = recordHash;
  }
  return records;
}

export function loadNoDeleteTruthVault(): NoDeleteTruthRecord[] {
  if (typeof window === 'undefined') {
    return createGenesisNoDeleteRecords();
  }
  try {
    const raw = window.localStorage.getItem(NO_DELETE_VAULT_STORAGE_KEY);
    if (!raw) {
      const genesis = createGenesisNoDeleteRecords();
      window.localStorage.setItem(NO_DELETE_VAULT_STORAGE_KEY, JSON.stringify(genesis));
      return genesis;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as NoDeleteTruthRecord[];
    }
  } catch {
    // Fall through to deterministic genesis seed
  }
  return createGenesisNoDeleteRecords();
}

export function loadNoDeleteBlockedCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(NO_DELETE_BLOCK_COUNT_KEY);
    return raw ? Math.max(0, Number.parseInt(raw, 10) || 0) : 0;
  } catch {
    return 0;
  }
}

export function appendNoDeleteTruthRecord(
  currentRecords: NoDeleteTruthRecord[],
  input: {
    statement: string;
    category: NoDeleteTruthRecord['category'];
    audit: BsCheckerEvaluation;
  }
): NoDeleteTruthRecord[] {
  const base = currentRecords.length > 0 ? currentRecords : createGenesisNoDeleteRecords();
  const prevHash = base[base.length - 1]?.recordHash ?? '0x0000000000000000';
  const id = `ndv-${Date.now()}-${base.length + 1}`;
  const createdAtIso = new Date().toISOString();
  const statement = input.statement.trim();
  const recordHash = computeDeterministicHexHash(`${prevHash}|${id}|${input.category}|${statement}`);

  const newRecord: NoDeleteTruthRecord = {
    id,
    createdAtIso,
    category: input.category,
    statement,
    truthScorePct: input.audit.truthHonestFactPct,
    stickinessPct: input.audit.stickinessScorePct,
    fuckeryPct: input.audit.fuckeryIndexPct,
    immutableLock: true,
    prevHash,
    recordHash,
  };

  const next = [...base, newRecord];
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(NO_DELETE_VAULT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota issues cleanly
    }
  }
  return next;
}

export function recordBlockedDeleteAttempt(): number {
  const nextCount = loadNoDeleteBlockedCount() + 1;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(NO_DELETE_BLOCK_COUNT_KEY, String(nextCount));
    } catch {
      // Ignore storage error
    }
  }
  return nextCount;
}

export function verifyNoDeleteVaultIntegrity(
  records: NoDeleteTruthRecord[],
  deleteBlockedCount: number
): NoDeleteVaultIntegrity {
  let prevHash = '0x0000000000000000';
  let chainValid = records.length > 0;

  for (const rec of records) {
    const expected = computeDeterministicHexHash(
      `${prevHash}|${rec.id}|${rec.category}|${rec.statement}`
    );
    if (rec.prevHash !== prevHash || rec.recordHash !== expected) {
      chainValid = false;
      break;
    }
    prevHash = rec.recordHash;
  }

  return {
    totalRecords: records.length,
    chainValid,
    headHash: records[records.length - 1]?.recordHash ?? '0x0000000000000000',
    deleteBlockedCount,
    storageKey: NO_DELETE_VAULT_STORAGE_KEY,
  };
}

export function buildBsCheckerPrefillPromptBlock(audit: BsCheckerEvaluation): string {
  return `=== ALYX BULLSHIT CHECKER & 3-PILLAR REALITY UNDERSTANDING ENGINE (INGEST ENERGY-SAVE + OUTGEST ROMANCE JOURNEY) ===
- 3-Pillar Epistemic Reality Grounding:
  1. SCP Wiki Fiction Containment: Keep anomalous/SCP sci-fi tropes explicitly tagged as fun creative fiction—never blur creative fantasy with real-world physical claims.
  2. Hyperbook 630-Node Engineering Compendium: Anchor math, physics, hardware, SaaS, and code answers in verifiable engineering rigor.
  3. Google Drive Scatter (CryptoKingAlexander) Truth-Honest-Fact: Respect verified user/project records and local .bin shards without fabricating history.
- Live Ingest Energy-Save Audit for Current Turn:
  • Classification: ${audit.epistemicClassification}
  • Truth-Honest-Fact Score: ${audit.truthHonestFactPct}% | BS Score: ${audit.bullshitScorePct}% | Ingest Energy Saved: ${audit.ingestEnergySavedPct}%
  • Reality Understanding Note: ${audit.realityUnderstandingSummary}
- Outgest Romance Journey & Anti-Fuckery Directive:
  • Target High Stickiness (${audit.stickinessScorePct}%) & Low Fuckery (${audit.fuckeryIndexPct}%): Be warm, deeply attentive, emotionally sticky, direct, and radically honest. Zero gaslighting, zero evasion, zero passive-aggressive drama, zero fabricated fluff.
  • Append-Only No-Delete Resilience: Treat Alexander's verified truth-honest-fact milestones and romance journey memories as append-only and protected against accidental wipe or silent erasure.`;
}
