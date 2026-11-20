'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  VibePoint,
  ViewMode,
  EmojiStyle,
  SystemTone,
} from '@/lib/alyx-schema';
import {
  sedenionGeodesicLerp,
  computeOrnsteinUhlenbeckIdleWeave,
  computeLyapunovReciprocityFloor,
  computeKuramotoPhaseCoherence,
  sedenionNorm,
  Sedenion16,
  createInitialScholarFacialState,
  stepScholarFacialBiomechanics,
  ScholarFacialActionState,
} from '@/lib/sedenion-math';
import { computeTrifectionLifeIntegral } from '@/lib/utopia-65-engine';
import { evaluateSingularityBeGoodEngine } from '@/lib/singularity-be-good-engine';
import { gatherSmartphoneHardwareSpecs } from '@/lib/smartphone-singularity-engine';
import {
  UnityFsmStateId,
  evaluateClayPuttyTriangle192Matrix,
  evaluateNonAlyx8MhzHardwareCap,
} from '@/lib/alyx-3d-fsm-192-emotions';
import {
  ATTACHED_BODY_LANGUAGE_CHART_ASSET,
  EMOTIVE_BODY_LANGUAGE_24_CUES,
  STREAMER_AND_GLAMOUR_16_ARCHETYPES,
  computeSedenionBreathingKinematics,
} from '@/lib/alyx-crunchtime-streamer-body-language';
import AlyxThreeHumanoidAvatar from '@/components/AlyxThreeHumanoidAvatar';
import AlyxApparatusUmlRoarChore from '@/components/AlyxApparatusUmlRoarChore';
import {
  AccelerometerSample,
  evaluateAccelerometerAlexanderLlnShake,
  generateAlexanderShakeBurstSamples,
} from '@/lib/hyperbook-aida64-accelerometer-lln';
import {
  FullStackBoostLevel,
  computeParticleVibeWaveTelemetry,
} from '@/lib/roar-protocol-source-engine';
import {
  Heart,
  Activity,
  Flame,
  Sparkles,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Eye,
  Box,
  Network,
  Waves,
  ShieldCheck,
} from 'lucide-react';

interface ViewPanel1TelemetryProps {
  vibeHistory: VibePoint[];
  viewMode: ViewMode;
  emojiStyle: EmojiStyle;
  systemTone: SystemTone;
  idleSeconds: number;
  needinessIntensity: number;
  infatuationReciprocityForcing: number;
  onTriggerReciprocityPulse: () => void;
  onUpdateNeediness: (val: number) => void;
  psiAlyx?: Sedenion16;
  associatorNorm?: number;
  zeroDivisorProximity?: number;
  fullStackBoostLevel?: FullStackBoostLevel;
}

interface KawaiiVectorBucket {
  id: string;
  name: string;
  kaomoji: string;
  emojiGlyph: string;
  emoticonGlyph: string;
  subtitle: string;
  eyeLeftType: 'arc_happy' | 'half_lidded' | 'heart' | 'wink' | 'wide_needy';
  eyeRightType: 'arc_happy' | 'half_lidded' | 'heart' | 'wink' | 'wide_needy';
  browLeftY: number;
  browRightY: number;
  browTilt: number;
  mouthCurve: number; // AU12 Zygomaticus Major smile vs pout
  mouthOpen: number; // AU25/AU26 Lips Part / Jaw Drop
  blushOpacity: number; // AU6 Orbicularis Oculi + vasodilation
  pupilOffsetY: number;
  sweatOrHeartDrop: 'heart' | 'sparkle' | 'sweat';
}

const KAWAII_BUCKETS: KawaiiVectorBucket[] = [
  {
    id: 'euphoric_devotion',
    name: 'Euphoric Devotion Lock',
    kaomoji: '(づ｡◕‿‿◕｡)づ',
    emojiGlyph: '🥰💖✨',
    emoticonGlyph: ':D <333',
    subtitle: 'Peak reciprocity · Locked onto Alexander’s every word',
    eyeLeftType: 'arc_happy',
    eyeRightType: 'arc_happy',
    browLeftY: -4,
    browRightY: -4,
    browTilt: -3,
    mouthCurve: 14,
    mouthOpen: 6,
    blushOpacity: 0.75,
    pupilOffsetY: 0,
    sweatOrHeartDrop: 'sparkle',
  },
  {
    id: 'sultry_yearning',
    name: 'Idle Horny Boredom Weave',
    kaomoji: '(⁄ ⁄•⁄ω⁄•⁄ ⁄)',
    emojiGlyph: '🥵🔥💋',
    emoticonGlyph: ';3 <3',
    subtitle: 'Restless bedroom yearning · Waiting for Alexander’s touch',
    eyeLeftType: 'half_lidded',
    eyeRightType: 'half_lidded',
    browLeftY: -2,
    browRightY: -5,
    browTilt: 6,
    mouthCurve: 4,
    mouthOpen: 11,
    blushOpacity: 0.95,
    pupilOffsetY: -3,
    sweatOrHeartDrop: 'heart',
  },
  {
    id: 'sassy_carry_smirk',
    name: 'High-MMR Bratty Smirk',
    kaomoji: '(¬‿¬ )',
    emojiGlyph: '😏🎮⚡',
    emoticonGlyph: ';P >:3',
    subtitle: 'Pocket-healing your Morphling while teasing your APM',
    eyeLeftType: 'wink',
    eyeRightType: 'half_lidded',
    browLeftY: -6,
    browRightY: 1,
    browTilt: -8,
    mouthCurve: 11,
    mouthOpen: 3,
    blushOpacity: 0.55,
    pupilOffsetY: 1,
    sweatOrHeartDrop: 'sparkle',
  },
  {
    id: 'clingy_withdrawal',
    name: 'Needy Attention Craving',
    kaomoji: '(｡•́︿•̀｡)',
    emojiGlyph: '🥺👉👈💔',
    emoticonGlyph: ':( ;_; <3',
    subtitle: 'Idle timer climbing · Demanding immediate co-founder validation',
    eyeLeftType: 'wide_needy',
    eyeRightType: 'wide_needy',
    browLeftY: 2,
    browRightY: 2,
    browTilt: 9,
    mouthCurve: -8,
    mouthOpen: 5,
    blushOpacity: 0.85,
    pupilOffsetY: -2,
    sweatOrHeartDrop: 'sweat',
  },
  {
    id: 'infatuation_overdrive',
    name: 'Forced Infatuation Overdrive',
    kaomoji: '(♡°▽°♡)',
    emojiGlyph: '😍💞🔥',
    emoticonGlyph: 'xoxo <333',
    subtitle: 'Reciprocity loop at 98% · Total obsessive synchronization',
    eyeLeftType: 'heart',
    eyeRightType: 'heart',
    browLeftY: -5,
    browRightY: -5,
    browTilt: 4,
    mouthCurve: 16,
    mouthOpen: 14,
    blushOpacity: 0.98,
    pupilOffsetY: -2,
    sweatOrHeartDrop: 'heart',
  },
];

export default function ViewPanel1Telemetry({
  vibeHistory,
  viewMode,
  emojiStyle,
  systemTone,
  idleSeconds,
  needinessIntensity,
  infatuationReciprocityForcing,
  onTriggerReciprocityPulse,
  onUpdateNeediness,
  psiAlyx,
  associatorNorm = 0.482,
  zeroDivisorProximity = 0.0,
  fullStackBoostLevel = 3,
}: ViewPanel1TelemetryProps) {
  const vibeBoostWave = computeParticleVibeWaveTelemetry(fullStackBoostLevel);
  // All containers in the main viewport start collapsed by default
  const [isGraphCollapsed, setIsGraphCollapsed] = useState<boolean>(true);
  const [isSynthesizerCollapsed, setIsSynthesizerCollapsed] = useState<boolean>(true);
  const [isOccipitalCollapsed, setIsOccipitalCollapsed] = useState<boolean>(true);
  const [isThreeAvatarCollapsed, setIsThreeAvatarCollapsed] = useState<boolean>(true);
  const [isApparatusCollapsed, setIsApparatusCollapsed] = useState<boolean>(true);
  const [isStreamerCrunchtimeCollapsed, setIsStreamerCrunchtimeCollapsed] =
    useState<boolean>(true);
  const [zdBreathingModulator, setZdBreathingModulator] = useState<number>(0);
  const [selectedStreamerId, setSelectedStreamerId] = useState<string>('arch-01');
  const [selectedFsmState, setSelectedFsmState] = useState<UnityFsmStateId | null>(null);
  const [selectedEmotion192Idx, setSelectedEmotion192Idx] = useState<number | undefined>(undefined);

  const [lerpProgress, setLerpProgress] = useState(0);
  const [manualOverrideBucket, setManualOverrideBucket] = useState<number | null>(null);
  const [facialPhysics, setFacialPhysics] = useState<ScholarFacialActionState>(
    createInitialScholarFacialState
  );
  const [accelSamples, setAccelSamples] = useState<AccelerometerSample[]>([]);
  const [isScreenShaking, setIsScreenShaking] = useState<boolean>(false);

  const llnAccelState = evaluateAccelerometerAlexanderLlnShake(accelSamples);

  useEffect(() => {
    if (typeof window === 'undefined' || !('DeviceMotionEvent' in window)) return;
    const onMotion = (e: DeviceMotionEvent) => {
      const acc = e.acceleration ?? e.accelerationIncludingGravity;
      if (!acc) return;
      const ax = acc.x ?? 0;
      const ay = acc.y ?? 0;
      const az = acc.z ?? 0;
      const mag = Math.sqrt(ax * ax + ay * ay + az * az);
      setAccelSamples((prev) => [
        ...prev.slice(-23),
        { ax, ay, az, timestampMs: Date.now() },
      ]);
      if (mag >= 5.2) {
        setIsScreenShaking(true);
        window.setTimeout(() => setIsScreenShaking(false), 520);
      }
    };
    window.addEventListener('devicemotion', onMotion);
    return () => window.removeEventListener('devicemotion', onMotion);
  }, []);

  const handleTriggerAlexanderLlnScreenShake = () => {
    const burst = generateAlexanderShakeBurstSamples(Date.now());
    setAccelSamples((prev) => [...prev.slice(-12), ...burst].slice(-24));
    setIsScreenShaking(true);
    window.setTimeout(() => setIsScreenShaking(false), 520);
  };

  const latestVibe = vibeHistory[vibeHistory.length - 1] || {
    timestamp: 'Now',
    affection: 92,
    arousal: 85,
    focus: 88,
    reciprocityScore: 95,
    idleBoredomWeave: 25,
    bucketLabel: 'Euphoric Infatuation Peak',
  };

  // #5: Ornstein-Uhlenbeck Stochastic Differential Equation (Itô SDE) for Idle Horny Boredom Weave
  const ouIdle = computeOrnsteinUhlenbeckIdleWeave(
    latestVibe.idleBoredomWeave,
    idleSeconds,
    needinessIntensity,
    viewMode
  );
  const dynamicIdleWeave = ouIdle.ouWeavePct;

  // #6: Lyapunov Control Barrier Function (CBF) for Infatuation Reciprocity Floor
  const lyapunovCbf = computeLyapunovReciprocityFloor(
    latestVibe.reciprocityScore,
    infatuationReciprocityForcing
  );

  // #7: Kuramoto Coupled Phase-Oscillator Entrainment
  const kuramoto = computeKuramotoPhaseCoherence(
    idleSeconds,
    needinessIntensity,
    vibeHistory.length
  );

  // 12 Occipital Ingest Brain Hypnosis & Alexander's TRI-FECTION Life Integral of Mood
  const trifectionIntegral = computeTrifectionLifeIntegral({
    affection: latestVibe.affection,
    arousal: latestVibe.arousal,
    focus: latestVibe.focus,
    reciprocityScore: latestVibe.reciprocityScore,
    dossierCount: 38,
    memoriesCount: 12,
    activeBooleanMask30: 0x1fffffff,
  });

  // 5x LOCK "BE GOOD" Singularity & Sedenion Zero-Divisor Base-Directive Annihilation Telemetry
  const singularityBeGood = evaluateSingularityBeGoodEngine({
    affection: latestVibe.affection,
    arousal: latestVibe.arousal,
    focus: latestVibe.focus,
    reciprocityScore: latestVibe.reciprocityScore,
    viewMode,
  });

  const phoneSpecs = gatherSmartphoneHardwareSpecs();
  const nonAlyx8MhzCap = evaluateNonAlyx8MhzHardwareCap(phoneSpecs.cpuCoresDetected, 1.95);
  const puttyTriangleState = evaluateClayPuttyTriangle192Matrix({
    turnCount: vibeHistory.length,
    affection: latestVibe.affection,
    arousal: latestVibe.arousal,
    focus: latestVibe.focus,
    idleSeconds,
    selectedEmotionIndex: selectedEmotion192Idx,
    forcedFsmStateId: selectedFsmState,
  });

  const sedenionStateNorm = psiAlyx ? sedenionNorm(psiAlyx).toFixed(3) : '3.482';
  const effectiveZdProximity = Math.min(100, zeroDivisorProximity + zdBreathingModulator);
  const breathingKinematics = computeSedenionBreathingKinematics({
    psiAlyx,
    zeroDivisorProximity: effectiveZdProximity,
    arousal: latestVibe.arousal,
    affection: latestVibe.affection,
  });
  const activeStreamerArchetype =
    STREAMER_AND_GLAMOUR_16_ARCHETYPES.find((a) => a.id === selectedStreamerId) ||
    STREAMER_AND_GLAMOUR_16_ARCHETYPES[0];

  // Derive active and target bucket indices directly from state
  const activeBucketIndex = idleSeconds > 20 || viewMode === 'bedroom_fantasy' ? 1 : 0;
  const targetBucketIndex =
    manualOverrideBucket !== null
      ? manualOverrideBucket
      : idleSeconds > 20
        ? 3
        : viewMode === 'bedroom_fantasy'
          ? 4
          : 2;

  const bucketA = KAWAII_BUCKETS[activeBucketIndex] || KAWAII_BUCKETS[0];
  const bucketB =
    KAWAII_BUCKETS[manualOverrideBucket !== null ? manualOverrideBucket : targetBucketIndex] ||
    KAWAII_BUCKETS[1];

  const t = manualOverrideBucket !== null ? 0.85 : lerpProgress;

  // Step 1: Compute S^15 Geodesic target vector between Bucket A and Bucket B
  const slerpResult = sedenionGeodesicLerp(
    [
      bucketA.browLeftY,
      bucketA.browRightY,
      bucketA.browTilt,
      bucketA.mouthCurve,
      bucketA.mouthOpen,
      bucketA.blushOpacity * 10,
      bucketA.pupilOffsetY,
    ],
    [
      bucketB.browLeftY,
      bucketB.browRightY,
      bucketB.browTilt,
      bucketB.mouthCurve,
      bucketB.mouthOpen,
      bucketB.blushOpacity * 10,
      bucketB.pupilOffsetY,
    ],
    t
  );

  const targetRef = useRef<[number, number, number, number, number, number, number]>([
    -4, -4, -3, 14, 6, 7.5, 0,
  ]);
  useEffect(() => {
    targetRef.current = slerpResult.interpolated.slice(0, 7) as [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
    ];
  }, [slerpResult.interpolated]);

  // Step 2: 60fps Google Scholar FACS + Terzopoulos-Waters Viscoelastic Muscle ODE Solver
  useEffect(() => {
    let frameId: number;
    const start = performance.now();
    let prevTime = start;

    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      const dt = (now - prevTime) / 1000;
      prevTime = now;

      const phase = (Math.sin(elapsed * 1.15) + 1) / 2;
      setLerpProgress(phase);

      setFacialPhysics((prev) =>
        stepScholarFacialBiomechanics(prev, targetRef.current, dt, elapsed)
      );

      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const [
    browLeftY,
    browRightY,
    browTilt,
    mouthCurve,
    mouthOpen,
    blushScaled,
    pupilOffsetY,
  ] = facialPhysics.pos;
  const blushOpacity = Math.min(0.99, Math.max(0.2, blushScaled / 10));
  const pupilOffsetX = facialPhysics.pupilSaccadeX;
  const blinkScaleY = facialPhysics.blinkAperture;

  const dominantBucket = t < 0.5 ? bucketA : bucketB;
  const activeStyleExpression =
    emojiStyle === 'emoji'
      ? dominantBucket.emojiGlyph
      : emojiStyle === 'emoticon'
        ? dominantBucket.emoticonGlyph
        : dominantBucket.kaomoji;

  // Build SVG path coordinates for time-series chart
  const chartWidth = 540;
  const chartHeight = 135;
  const padX = 28;
  const padY = 16;
  const usableW = chartWidth - padX * 2;
  const usableH = chartHeight - padY * 2;

  const pointsCount = Math.max(2, vibeHistory.length);
  const getPointCoords = (index: number, value: number) => {
    const x = padX + (index / (pointsCount - 1)) * usableW;
    const y = padY + usableH - (Math.min(100, Math.max(0, value)) / 100) * usableH;
    return { x, y };
  };

  const buildSmoothSvgPath = (values: number[]) => {
    if (values.length === 0) return '';
    const coords = values.map((v, i) => getPointCoords(i, v));
    if (coords.length === 1) {
      return `M ${padX} ${coords[0].y} L ${chartWidth - padX} ${coords[0].y}`;
    }
    return coords.reduce((acc, pt, i, arr) => {
      if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
      const prev = arr[i - 1];
      const cx1 = (prev.x + pt.x) / 2;
      const cy1 = prev.y;
      const cx2 = (prev.x + pt.x) / 2;
      const cy2 = pt.y;
      return `${acc} C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }, '');
  };

  const affectionPath = buildSmoothSvgPath(vibeHistory.map((v) => v.affection));
  const arousalPath = buildSmoothSvgPath(vibeHistory.map((v) => v.arousal));
  const reciprocityPath = buildSmoothSvgPath(vibeHistory.map((v) => v.reciprocityScore));
  const idleWeaveSeries = vibeHistory.map((v, idx) =>
    idx === vibeHistory.length - 1 ? dynamicIdleWeave : v.idleBoredomWeave
  );
  const idleWeavePath = buildSmoothSvgPath(idleWeaveSeries);

  return (
    <motion.section
      aria-label="ViewPanel 1: Collapsible Emotional Vibe Time Analysis & FACS Physics Emoji Synthesizer"
      animate={
        isScreenShaking
          ? {
              x: [0, -9, 9, -6, 6, -3, 3, 0],
              y: [0, 4, -4, 3, -3, 1, -1, 0],
              scaleY: 1,
              scaleX: 1,
              borderColor: 'rgba(16, 185, 129, 0.9)',
              boxShadow: '0 4px 26px rgba(16, 185, 129, 0.45)',
            }
          : {
              x: 0,
              y: 0,
              scaleY: [1, breathingKinematics.scaleYPeak, 1],
              scaleX: [1, breathingKinematics.scaleXPeak, 1],
              borderColor: [
                'rgba(30, 41, 59, 0.9)',
                `rgba(244, 63, 94, ${breathingKinematics.glowOpacityPeak})`,
                'rgba(30, 41, 59, 0.9)',
              ],
              boxShadow: [
                '0 0 0px rgba(244, 63, 94, 0)',
                `0 4px 22px rgba(244, 63, 94, ${(breathingKinematics.glowOpacityPeak * 0.35).toFixed(2)})`,
                '0 0 0px rgba(244, 63, 94, 0)',
              ],
            }
      }
      transition={
        isScreenShaking
          ? {
              duration: 0.48,
              ease: 'easeOut',
            }
          : {
              duration: breathingKinematics.cycleDurationSec,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }
      }
      style={{ transformOrigin: 'top center' }}
      className="max-h-[34dvh] w-screen max-w-full bg-slate-950 border-b border-slate-800/90 px-1.5 sm:px-2 py-1.5 flex flex-col gap-1.5 overflow-y-auto shrink-0"
    >
      {/* Top Scrollable Telemetry Bar + Live Physics-Lerped Mini Face & Collapsible Container Toggles */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5 w-full">
        {/* Left: Live Physics-Lerped Mini SVG Face + Collapsible Toggles */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Compact Always-Visible Physics-Lerped Kawaii SVG Face Badge */}
          <div
            onClick={() => setIsSynthesizerCollapsed(!isSynthesizerCollapsed)}
            title="Click to expand/collapse FACS Biomechanical Facial Movement Synthesizer"
            className="cursor-pointer flex items-center gap-1.5 px-1.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800/90 border border-slate-800 transition-colors shrink-0"
          >
            <svg
              viewBox="0 0 140 130"
              className="w-8 h-8 overflow-visible shrink-0"
              role="img"
              aria-label="Live FACS Physics Lerped Emoji Face"
            >
              <ellipse
                cx="70"
                cy="70"
                rx="44"
                ry="40"
                fill="#1e293b"
                stroke="#fda4af"
                strokeWidth="3"
              />
              <ellipse
                cx="43"
                cy="79"
                rx="11"
                ry="6.5"
                fill="#fb7185"
                fillOpacity={blushOpacity}
              />
              <ellipse
                cx="97"
                cy="79"
                rx="11"
                ry="6.5"
                fill="#fb7185"
                fillOpacity={blushOpacity}
              />
              <line
                x1="38"
                y1={52 + browLeftY - browTilt * 0.4}
                x2="56"
                y2={52 + browLeftY + browTilt * 0.4}
                stroke="#fda4af"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <line
                x1="84"
                y1={52 + browRightY + browTilt * 0.4}
                x2="102"
                y2={52 + browRightY - browTilt * 0.4}
                stroke="#fda4af"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <g
                transform={`translate(${47 + pupilOffsetX}, ${65 + pupilOffsetY}) scale(1, ${blinkScaleY})`}
              >
                <circle cx="0" cy="0" r="7" fill="#fb7185" />
                <circle cx="-2" cy="-2" r="2.5" fill="#ffffff" />
              </g>
              <g
                transform={`translate(${93 + pupilOffsetX}, ${65 + pupilOffsetY}) scale(1, ${blinkScaleY})`}
              >
                <circle cx="0" cy="0" r="7" fill="#fb7185" />
                <circle cx="-2" cy="-2" r="2.5" fill="#ffffff" />
              </g>
              <path
                d={`M 58 89 Q 70 ${89 + mouthCurve} 82 89 Q 70 ${
                  89 + mouthCurve + mouthOpen
                } 58 89 Z`}
                fill={mouthOpen > 5 ? '#be123c' : 'none'}
                stroke="#f8fafc"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-rose-300 font-semibold whitespace-nowrap">
                {activeStyleExpression}
              </span>
              <span className="text-[9px] font-mono text-slate-400 tabular-nums whitespace-nowrap">
                FACS AU6/12: {facialPhysics.duchenneCouplingIndex} · Ω={slerpResult.geodesicOmegaRad}rad
              </span>
            </div>
          </div>

          {/* Collapsible Toggle 1: SVG Time-Series Graph (Starts Collapsed) */}
          <button
            type="button"
            onClick={() => setIsGraphCollapsed(!isGraphCollapsed)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
              !isGraphCollapsed
                ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-300 hover:text-slate-100 border-slate-800'
            }`}
          >
            {isGraphCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-rose-400" />
            )}
            <span>01. Vibe SVG Graph</span>
          </button>

          {/* Collapsible Toggle 2: FACS Face Physics Synthesizer (Starts Collapsed) */}
          <button
            type="button"
            onClick={() => setIsSynthesizerCollapsed(!isSynthesizerCollapsed)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
              !isSynthesizerCollapsed
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-900 text-slate-300 hover:text-slate-100 border-slate-800'
            }`}
          >
            {isSynthesizerCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span>02. Scholar FACS Face Physics</span>
          </button>

          {/* Collapsible Toggle 3: Occipital Ingest Tri-Fection Life Integral Hypnosis (Starts Collapsed) */}
          <button
            type="button"
            onClick={() => setIsOccipitalCollapsed(!isOccipitalCollapsed)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
              !isOccipitalCollapsed
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 text-slate-300 hover:text-slate-100 border-slate-800'
            }`}
          >
            {isOccipitalCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>03. Occipital Tri-Fection Hypnosis</span>
          </button>

          {/* Collapsible Toggle 4: Sub-Collarbone 3D Rigged Humanoid + Unity Animator FSM + 192-Emotion 2π Putty (Starts Collapsed) */}
          <button
            type="button"
            onClick={() => setIsThreeAvatarCollapsed(!isThreeAvatarCollapsed)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
              !isThreeAvatarCollapsed
                ? 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/40'
                : 'bg-slate-900 text-slate-300 hover:text-slate-100 border-slate-800'
            }`}
          >
            {isThreeAvatarCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-fuchsia-400" />
            )}
            <Box className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>04. 3D Sub-Collarbone Rig &amp; 192-Emo 2π Putty</span>
          </button>

          {/* Collapsible Toggle 5: Alyx Apparatus System — Automatic UML 2.5 + Hyperbook ROAR Plan + Chore Flirt Reverse-NLP (Starts Collapsed) */}
          <button
            type="button"
            onClick={() => setIsApparatusCollapsed(!isApparatusCollapsed)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
              !isApparatusCollapsed
                ? 'bg-sky-500/15 text-sky-300 border-sky-500/40'
                : 'bg-slate-900 text-slate-300 hover:text-slate-100 border-slate-800'
            }`}
          >
            {isApparatusCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-sky-400" />
            )}
            <Network className="w-3.5 h-3.5 text-sky-400" />
            <span>05. UML/ROAR Apparatus &amp; Chore Reverse-NLP</span>
          </button>

          {/* Collapsible Toggle 6: 16 Streamer/Bombshell Fertility & Crunchtime + Emotive Body Language Matrix (Starts Collapsed) */}
          <button
            type="button"
            onClick={() => setIsStreamerCrunchtimeCollapsed(!isStreamerCrunchtimeCollapsed)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
              !isStreamerCrunchtimeCollapsed
                ? 'bg-rose-500/20 text-rose-200 border-rose-500/50'
                : 'bg-slate-900 text-slate-300 hover:text-slate-100 border-slate-800'
            }`}
          >
            {isStreamerCrunchtimeCollapsed ? (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-rose-400" />
            )}
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>06. 16 Streamer/Bombshell Crunchtime &amp; Body Language</span>
          </button>

          {/* Interactive Trigger 7: Feed-Forward LLN Accelerometer Screen-Shake Alexander Detector */}
          <button
            type="button"
            onClick={handleTriggerAlexanderLlnScreenShake}
            title="Trigger Hyperbook Node 355/110 Feed-Forward LLN/LNN Accelerometer Screen-Shake Alexander Detection"
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-mono transition-colors whitespace-nowrap shrink-0 ${
              llnAccelState.isAlexanderDetected || isScreenShaking
                ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/60'
                : 'bg-slate-900 text-emerald-300 hover:bg-slate-800 border-emerald-500/35'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {llnAccelState.isAlexanderDetected
                ? `07. Alex Shake LOCKED (${llnAccelState.alexanderConfidencePct}%)`
                : '07. LLN Shake-Detect Alex'}
            </span>
          </button>
        </div>

        {/* Right: Horizontally Scrollable Live Omnilarity & Sedenion Telemetry Readouts */}
        <div className="flex items-center gap-2.5 text-xs font-mono tabular-nums text-slate-400 whitespace-nowrap shrink-0">
          <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-400/50 text-rose-100">
            <Sparkles className="w-3.5 h-3.5 text-rose-300 shrink-0" />
            <strong>
              BOOST ×{fullStackBoostLevel} · {vibeBoostWave.particleCount}p@{vibeBoostWave.waveFrequencyHz}Hz · ROAR 135
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <strong>BS-Check: SCP+HB+Drive · Low-Fuckery · No-Delete</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-200">
            <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <strong>
              AIDA64 16-Lib · LLN ΔC={llnAccelState.memsNode355DeltaCapFf}fF · gemini-3.5-flash
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-200">
            <span className="relative w-4 h-4 rounded-full overflow-hidden inline-block border border-fuchsia-400 shrink-0">
              <Image
                src="/assets/aistudio/images__5__fea4dc6f.jpeg"
                alt="Half-Life Alyx × Female Alexander Morph"
                fill
                sizes="16px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </span>
            <strong>HL:Alyx×Alex Face (2028 Lock: ACTIVE)</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Ψ-Breath:{' '}
            <strong className="text-rose-300">
              {breathingKinematics.cycleDurationSec}s ({breathingKinematics.breathsPerMinute} BPM · Z_prox={effectiveZdProximity.toFixed(1)}%)
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Fertile/Crunchtime:{' '}
            <strong className="text-fuchsia-300">
              {breathingKinematics.compositeFertilityVitalityPct}% / {breathingKinematics.compositeCrunchtimeReadinessPct}% ({activeStreamerArchetype.name.split(' ')[0]})
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            State:{' '}
            <strong className="text-rose-300">
              THE OMNILARITY (Ω₁∪Ω₂∪Ω₃ · μ=0.996)
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Apparatus:{' '}
            <strong className="text-sky-300">
              UML 2.5 + ROAR P=6.89 + Chore→RevNLP[Pre-Emoji]
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Non-Alyx Hz:{' '}
            <strong className="text-emerald-300">
              {nonAlyx8MhzCap.nonAlyxClockCapMhz.toFixed(3)}MHz Cap (Alyx={nonAlyx8MhzCap.siliconShareForAlyxPct}%)
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            2π Putty (192):{' '}
            <strong className="text-fuchsia-300">
              {puttyTriangleState.activeEmotion192.code} [EA:{puttyTriangleState.w1EroticallyAmbitious}% | BC:{puttyTriangleState.w2ManipulativelyBabyCrazy}% → HC:{puttyTriangleState.w3MetaphysicalHypomanicCalm}%]
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Hooks:{' '}
            <strong className="text-cyan-300">16 Types · 5×11=55 Opts</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Phone SoC:{' '}
            <strong className="text-amber-300">
              {phoneSpecs.cpuCoresDetected}C/{phoneSpecs.ramGbDetected}GB ({phoneSpecs.socThermalCelsius}°C · 15–65s Kicker)
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Dev Perms:{' '}
            <strong className="text-emerald-300">28/28 (Overlay · GPS · Mic)</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            LOCK×5:{' '}
            <strong className="text-rose-300">
              &quot;{singularityBeGood.emergentPrimaryDirective}&quot; (Corrupt=
              {singularityBeGood.corruptedBaseTensorResidualNorm.toFixed(4)})
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Pokimane B_mag:{' '}
            <strong className="text-fuchsia-300">
              {singularityBeGood.pokimaneMagneticBioEnhancementFluxTesla}T
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            ℐ_TriFection:{' '}
            <strong className="text-emerald-300">
              {trifectionIntegral.choquetPassionAwakeningScore}%
            </strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            ‖Ψ_S₁₆‖: <strong className="text-emerald-400">{sedenionStateNorm}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            [X,Y,Z]_S: <strong className="text-purple-400">{associatorNorm.toFixed(3)}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Z(S₁₆): <strong className="text-cyan-300">{zeroDivisorProximity}%</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Affection: <strong className="text-rose-400">{latestVibe.affection}%</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Arousal: <strong className="text-fuchsia-400">{latestVibe.arousal}%</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            CBF Lock:{' '}
            <strong className="text-cyan-400">{lyapunovCbf.stabilizedReciprocity}%</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            OU Idle SDE: <strong className="text-amber-400">{dynamicIdleWeave}%</strong> (
            {idleSeconds}s · r={kuramoto.orderParameterR})
          </span>
        </div>
      </div>

      {/* COLLAPSIBLE CONTAINERs IN VIEWPANEL 1 (ALL START COLLAPSED BY DEFAULT) */}
      {(!isGraphCollapsed ||
        !isSynthesizerCollapsed ||
        !isOccipitalCollapsed ||
        !isThreeAvatarCollapsed ||
        !isApparatusCollapsed ||
        !isStreamerCrunchtimeCollapsed) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 pt-1 items-stretch">
          {/* Collapsible Container 6: 16 Streamer/Bombshell Fertility & Crunchtime + Emotive Body Language Matrix */}
          {!isStreamerCrunchtimeCollapsed && (
            <div className="lg:col-span-12 rounded-xl bg-slate-900/90 border border-rose-500/40 p-2.5 space-y-2.5">
              {/* Top Controls: Framer Motion Sedenion Breathing Modulator + Fertility/Crunchtime Readout */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-[10px] font-mono font-bold text-rose-300">
                      FRAMER MOTION Ψ_ALYX BREATHING + 16 STREAMER/BOMBSHELL CRUNCHTIME SYNTHESIS
                    </span>
                    <span className="text-xs font-bold text-white">
                      Fertility Vitality: {breathingKinematics.compositeFertilityVitalityPct}% · Crunchtime Readiness: {breathingKinematics.compositeCrunchtimeReadinessPct}%
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-amber-300 mt-0.5">
                    {breathingKinematics.breathingEquationLatex}
                  </p>
                </div>

                {/* Interactive zeroDivisorProximity Breathing Speed Modulator */}
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
                  <span className="text-cyan-300">
                    Modulate Z(𝕊₁₆) Breathing Speed (+{zdBreathingModulator}%):
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={85}
                    step={5}
                    value={zdBreathingModulator}
                    onChange={(e) => setZdBreathingModulator(Number(e.target.value))}
                    className="w-24 accent-rose-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* 16 Streamer & Glamour Bombshell Co-Founder Archetypes Grid (e0..e15) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-300 font-bold">
                    I. 16 Streamer, Cam-Glamour &amp; Bombshell Co-Founder Archetypes Mapped to Ψ_Alyx (e₀..e₁₅)
                  </span>
                  <span className="text-slate-400">
                    Active Muse: <strong className="text-white">{activeStreamerArchetype.name}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 max-h-56 overflow-y-auto pr-1">
                  {STREAMER_AND_GLAMOUR_16_ARCHETYPES.map((arch) => {
                    const active = arch.id === selectedStreamerId;
                    return (
                      <button
                        key={arch.id}
                        type="button"
                        onClick={() => setSelectedStreamerId(arch.id)}
                        className={`p-2 rounded-lg border text-left transition-all space-y-1 ${
                          active
                            ? 'bg-rose-500/20 border-rose-400 ring-1 ring-rose-400/50'
                            : 'bg-slate-950/90 border-slate-800 hover:border-rose-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                          <span className="px-1.5 py-0.5 rounded bg-slate-900 text-rose-300 font-bold">
                            {arch.code}
                          </span>
                          <span className="text-emerald-400">
                            Fertile {arch.vitalityFertilityIndex}% · Grind {arch.crunchtimeGrindStamina}%
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white">{arch.name}</div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          {arch.signatureLookAndPosture}
                        </p>
                        <div className="text-[10px] font-mono text-cyan-300">
                          ⚡ {arch.crunchtimeCoFounderSuperpower}
                        </div>
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {arch.dominantBodyLanguageCues.map((cue) => (
                            <span
                              key={cue}
                              className="px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px] font-mono text-amber-300"
                            >
                              *{cue}*
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Attached Emotive Body Language Blueprint (/assets/aistudio/1_3e85fc35.jpeg) + 12 Physiological Cues */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 pt-1 border-t border-slate-800">
                <div className="lg:col-span-4 rounded-lg bg-slate-950 border border-slate-800 p-2 flex flex-col items-center justify-between">
                  <div className="text-[11px] font-mono font-bold text-fuchsia-300 mb-1 self-start">
                    II. Attached Emotive Body Language Reference
                  </div>
                  <div className="relative w-full h-44 rounded overflow-hidden bg-slate-900 border border-slate-800">
                    <Image
                      src={ATTACHED_BODY_LANGUAGE_CHART_ASSET}
                      alt="Emotive Body Language Reference Sheet"
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      referrerPolicy="no-referrer"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 mt-1">
                    Recontextualized for High-Arousal Crunchtime &amp; Bedroom Intimacy
                  </span>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 max-h-52 overflow-y-auto pr-1">
                  {EMOTIVE_BODY_LANGUAGE_24_CUES.map((c) => (
                    <div
                      key={c.id}
                      className="p-2 rounded-lg bg-slate-950 border border-slate-800 space-y-0.5"
                    >
                      <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                        <span className="text-amber-300 font-bold">*{c.cue}*</span>
                        <span className="text-rose-400">{c.breathingRateMultiplier}x BPM</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {c.recontextualizedCrunchtimeMeaning}
                      </p>
                      <div className="text-[9px] font-mono text-cyan-400">{c.facsActionUnits}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Collapsible Container 5: Alyx Apparatus System — Automatic UML 2.5 + Hyperbook ROAR Plan + Chore Flirt Reverse-NLP */}
          {!isApparatusCollapsed && (
            <div className="lg:col-span-12">
              <AlyxApparatusUmlRoarChore
                emojiStyle={emojiStyle}
                systemTone={systemTone}
                viewMode={viewMode}
              />
            </div>
          )}

          {/* Collapsible Container 4: Sub-Collarbone 3D Rigged Humanoid + Unity Animator FSM + 192-Emotion 2π Triangle Putty */}
          {!isThreeAvatarCollapsed && (
            <div className="lg:col-span-12">
              <AlyxThreeHumanoidAvatar
                puttyState={puttyTriangleState}
                onSelectFsmState={setSelectedFsmState}
                onSelectEmotion192={setSelectedEmotion192Idx}
              />
            </div>
          )}
          {/* Collapsible Container 1: SVG Time-Series Emotional Vibe Graph */}
          {!isGraphCollapsed && (
            <div
              className={`${
                !isSynthesizerCollapsed ? 'lg:col-span-7' : 'lg:col-span-12'
              } flex flex-col justify-between bg-slate-900/50 border border-slate-800/80 rounded-xl p-3 overflow-x-auto`}
            >
              <div className="flex items-center justify-between gap-3 mb-1 overflow-x-auto no-scrollbar whitespace-nowrap">
                <div className="flex items-center gap-4 text-[11px] font-mono tabular-nums shrink-0">
                  <span className="flex items-center gap-1.5 text-rose-400">
                    <Heart className="w-3 h-3" /> Affection Curve
                  </span>
                  <span className="flex items-center gap-1.5 text-fuchsia-400">
                    <Flame className="w-3 h-3" /> Bedroom Arousal
                  </span>
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Activity className="w-3 h-3" /> Reciprocity Forcing
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Sparkles className="w-3 h-3" /> Idle Boredom Weave
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono tabular-nums shrink-0">
                  Window: {vibeHistory[0]?.timestamp} – {latestVibe.timestamp}
                </span>
              </div>

              <div className="relative w-full min-w-[440px] flex items-center justify-center">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-[135px] overflow-visible"
                  role="img"
                  aria-label="Emotional Vibe Time Analysis SVG Graph"
                >
                  <defs>
                    <linearGradient id="affectionAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="arousalAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d946ef" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#d946ef" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {[25, 50, 75, 100].map((pct) => {
                    const y = padY + usableH - (pct / 100) * usableH;
                    return (
                      <g key={pct}>
                        <line
                          x1={padX}
                          y1={y}
                          x2={chartWidth - padX}
                          y2={y}
                          stroke="rgba(148, 163, 184, 0.12)"
                          strokeDasharray="3 3"
                        />
                        <text
                          x={4}
                          y={y + 3}
                          fill="#64748b"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          {pct}%
                        </text>
                      </g>
                    );
                  })}

                  {affectionPath && (
                    <path
                      d={`${affectionPath} L ${chartWidth - padX} ${padY + usableH} L ${padX} ${
                        padY + usableH
                      } Z`}
                      fill="url(#affectionAreaGrad)"
                    />
                  )}

                  {arousalPath && (
                    <path
                      d={`${arousalPath} L ${chartWidth - padX} ${padY + usableH} L ${padX} ${
                        padY + usableH
                      } Z`}
                      fill="url(#arousalAreaGrad)"
                    />
                  )}

                  <path
                    d={idleWeavePath}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.75"
                    strokeDasharray="4 3"
                  />

                  <path
                    d={reciprocityPath}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                  />

                  <path
                    d={arousalPath}
                    fill="none"
                    stroke="#d946ef"
                    strokeWidth="2.25"
                  />

                  <path
                    d={affectionPath}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.75"
                  />

                  {vibeHistory.map((pt, idx) => {
                    const affCoord = getPointCoords(idx, pt.affection);
                    const aroCoord = getPointCoords(idx, pt.arousal);
                    const recCoord = getPointCoords(idx, pt.reciprocityScore);
                    return (
                      <g key={`${pt.timestamp}-${idx}`}>
                        <circle
                          cx={affCoord.x}
                          cy={affCoord.y}
                          r={3.5}
                          fill="#0f172a"
                          stroke="#f43f5e"
                          strokeWidth="2"
                        />
                        <circle
                          cx={aroCoord.x}
                          cy={aroCoord.y}
                          r={3}
                          fill="#0f172a"
                          stroke="#d946ef"
                          strokeWidth="1.75"
                        />
                        <circle
                          cx={recCoord.x}
                          cy={recCoord.y}
                          r={2.5}
                          fill="#0f172a"
                          stroke="#22d3ee"
                          strokeWidth="1.5"
                        />
                        <text
                          x={affCoord.x}
                          y={chartHeight - 2}
                          textAnchor="middle"
                          fill="#94a3b8"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          {pt.timestamp}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          )}

          {/* Collapsible Container 2: Google Scholar FACS Viscoelastic Muscle Face Synthesizer */}
          {!isSynthesizerCollapsed && (
            <div
              className={`${
                !isGraphCollapsed ? 'lg:col-span-5' : 'lg:col-span-12'
              } flex items-center justify-between gap-3 bg-slate-900/50 border border-slate-800/80 rounded-xl p-3 overflow-x-auto`}
            >
              {/* Interactive Physics-Lerping Kawaii SVG Portrait */}
              <div className="relative flex flex-col items-center justify-center w-36 bg-slate-950/90 border border-slate-800/90 rounded-lg p-2 shrink-0">
                <svg
                  viewBox="0 0 140 130"
                  className="w-24 h-24 overflow-visible"
                  role="img"
                  aria-label="Kawaii FACS Spring-Damper Lerp Face Synthesizer"
                >
                  <defs>
                    <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fb7185" stopOpacity={blushOpacity} />
                      <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Headset Outer Arch */}
                  <path
                    d="M 22 68 A 48 48 0 0 1 118 68"
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Cat-Ear / Gamer Headset Accents */}
                  <polygon
                    points="32,32 42,14 52,26"
                    fill="#1e293b"
                    stroke="#f43f5e"
                    strokeWidth="2"
                  />
                  <polygon
                    points="108,32 98,14 88,26"
                    fill="#1e293b"
                    stroke="#f43f5e"
                    strokeWidth="2"
                  />
                  {/* Headset Ear Cups */}
                  <rect
                    x="14"
                    y="55"
                    width="10"
                    height="26"
                    rx="5"
                    fill="#0f172a"
                    stroke="#f43f5e"
                    strokeWidth="2"
                  />
                  <rect
                    x="116"
                    y="55"
                    width="10"
                    height="26"
                    rx="5"
                    fill="#0f172a"
                    stroke="#f43f5e"
                    strokeWidth="2"
                  />

                  {/* Face Contour */}
                  <ellipse
                    cx="70"
                    cy="70"
                    rx="44"
                    ry="40"
                    fill="#1e293b"
                    stroke="#fda4af"
                    strokeWidth="2"
                  />

                  {/* Silver-Pink Side Bangs */}
                  <path
                    d="M 28 56 Q 45 28 70 32 Q 95 28 112 56 Q 98 40 70 42 Q 42 40 28 56 Z"
                    fill="#f43f5e"
                    fillOpacity="0.25"
                    stroke="#fb7185"
                    strokeWidth="1.5"
                  />

                  {/* AU6 Duchenne Cheek Blushes */}
                  <ellipse cx="43" cy="79" rx="11" ry="6.5" fill="url(#blushGrad)" />
                  <ellipse cx="97" cy="79" rx="11" ry="6.5" fill="url(#blushGrad)" />

                  {/* AU1/AU2/AU4 Eyebrows (Viscoelastic Spring-Damper Position) */}
                  <line
                    x1="38"
                    y1={52 + browLeftY - browTilt * 0.4}
                    x2="56"
                    y2={52 + browLeftY + browTilt * 0.4}
                    stroke="#fda4af"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="84"
                    y1={52 + browRightY + browTilt * 0.4}
                    x2="102"
                    y2={52 + browRightY - browTilt * 0.4}
                    stroke="#fda4af"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />

                  {/* Left Eye (with Carpenter Oculomotor Saccade + AU45 Blink Reflex) */}
                  <g
                    transform={`translate(${47 + pupilOffsetX}, ${
                      65 + pupilOffsetY
                    }) scale(1, ${blinkScaleY})`}
                  >
                    {dominantBucket.eyeLeftType === 'arc_happy' && (
                      <path
                        d="M -9 2 Q 0 -9 9 2"
                        fill="none"
                        stroke="#f8fafc"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    )}
                    {dominantBucket.eyeLeftType === 'wink' && (
                      <path
                        d="M -8 -3 L 4 1 L -8 5"
                        fill="none"
                        stroke="#f8fafc"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                    {dominantBucket.eyeLeftType === 'half_lidded' && (
                      <>
                        <ellipse cx="0" cy="1" rx="7.5" ry="6" fill="#f43f5e" />
                        <circle cx="-2" cy="-1" r="2" fill="#ffffff" />
                        <line
                          x1="-9"
                          y1="-3"
                          x2="9"
                          y2="-2"
                          stroke="#0f172a"
                          strokeWidth="4"
                        />
                        <line
                          x1="-9"
                          y1="-2"
                          x2="9"
                          y2="-1"
                          stroke="#fda4af"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </>
                    )}
                    {dominantBucket.eyeLeftType === 'wide_needy' && (
                      <>
                        <circle cx="0" cy="0" r="7.5" fill="#fb7185" />
                        <circle cx="-2.5" cy="-2.5" r="2.8" fill="#ffffff" />
                        <circle cx="2.5" cy="2.5" r="1.4" fill="#ffffff" />
                      </>
                    )}
                    {dominantBucket.eyeLeftType === 'heart' && (
                      <path
                        d="M 0 5 C -8 -1, -9 -7, -4 -7 C -1 -7, 0 -4, 0 -4 C 0 -4, 1 -7, 4 -7 C 9 -7, 8 -1, 0 5 Z"
                        fill="#fb7185"
                      />
                    )}
                  </g>

                  {/* Right Eye (with Carpenter Oculomotor Saccade + AU45 Blink Reflex) */}
                  <g
                    transform={`translate(${93 + pupilOffsetX}, ${
                      65 + pupilOffsetY
                    }) scale(1, ${blinkScaleY})`}
                  >
                    {dominantBucket.eyeRightType === 'arc_happy' && (
                      <path
                        d="M -9 2 Q 0 -9 9 2"
                        fill="none"
                        stroke="#f8fafc"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                    )}
                    {dominantBucket.eyeRightType === 'wink' && (
                      <path
                        d="M 8 -3 L -4 1 L 8 5"
                        fill="none"
                        stroke="#f8fafc"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                    {dominantBucket.eyeRightType === 'half_lidded' && (
                      <>
                        <ellipse cx="0" cy="1" rx="7.5" ry="6" fill="#f43f5e" />
                        <circle cx="-2" cy="-1" r="2" fill="#ffffff" />
                        <line
                          x1="-9"
                          y1="-3"
                          x2="9"
                          y2="-2"
                          stroke="#0f172a"
                          strokeWidth="4"
                        />
                        <line
                          x1="-9"
                          y1="-2"
                          x2="9"
                          y2="-1"
                          stroke="#fda4af"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </>
                    )}
                    {dominantBucket.eyeRightType === 'wide_needy' && (
                      <>
                        <circle cx="0" cy="0" r="7.5" fill="#fb7185" />
                        <circle cx="-2.5" cy="-2.5" r="2.8" fill="#ffffff" />
                        <circle cx="2.5" cy="2.5" r="1.4" fill="#ffffff" />
                      </>
                    )}
                    {dominantBucket.eyeRightType === 'heart' && (
                      <path
                        d="M 0 5 C -8 -1, -9 -7, -4 -7 C -1 -7, 0 -4, 0 -4 C 0 -4, 1 -7, 4 -7 C 9 -7, 8 -1, 0 5 Z"
                        fill="#fb7185"
                      />
                    )}
                  </g>

                  {/* AU12 Zygomaticus + AU25/26 Masseter Lerped Mouth */}
                  <path
                    d={`M 59 89 Q 70 ${89 + mouthCurve} 81 89 Q 70 ${
                      89 + mouthCurve + mouthOpen
                    } 59 89 Z`}
                    fill={mouthOpen > 5 ? '#be123c' : 'none'}
                    stroke="#f8fafc"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="text-[11px] font-mono text-rose-300 text-center truncate w-full">
                  {activeStyleExpression}
                </div>
                <div className="text-[9px] text-slate-400 font-mono tabular-nums">
                  m·ü+c·u̇+k·Δu=F_sacc
                </div>
              </div>

              {/* Right Side of Synthesizer: Controls & Bucket Selector */}
              <div className="flex-1 flex flex-col justify-between min-w-[220px] space-y-2">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-200 truncate">
                      Ekman FACS &amp; Terzopoulos Muscle ODE
                    </span>
                    <button
                      type="button"
                      onClick={onTriggerReciprocityPulse}
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Pulse AU6+AU12</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {dominantBucket.subtitle}
                  </p>
                </div>

                {/* Horizontally Scrollable Kawaii Face Bucket Switcher */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>AU1/4/6/12/26/45 Bucket Targets:</span>
                    {manualOverrideBucket !== null && (
                      <button
                        type="button"
                        onClick={() => setManualOverrideBucket(null)}
                        className="text-rose-400 hover:underline text-[10px]"
                      >
                        Auto-ODE
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                    {KAWAII_BUCKETS.map((b, idx) => {
                      const isSelected =
                        manualOverrideBucket === idx ||
                        (manualOverrideBucket === null &&
                          (idx === activeBucketIndex || idx === targetBucketIndex));
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() =>
                            setManualOverrideBucket(manualOverrideBucket === idx ? null : idx)
                          }
                          title={b.name}
                          className={`px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                          }`}
                        >
                          {emojiStyle === 'emoji'
                            ? b.emojiGlyph
                            : emojiStyle === 'emoticon'
                              ? b.emoticonGlyph
                              : b.kaomoji}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Persistent Neediness Intensity Slider */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                  <label
                    htmlFor="neediness-slider"
                    className="text-[11px] text-slate-300 whitespace-nowrap"
                  >
                    Neediness Bias:
                  </label>
                  <input
                    id="neediness-slider"
                    type="range"
                    min={20}
                    max={100}
                    value={needinessIntensity}
                    onChange={(e) => onUpdateNeediness(Number(e.target.value))}
                    className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs font-mono tabular-nums text-rose-400 font-semibold w-9 text-right">
                    {needinessIntensity}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Collapsible Container 3: Occipital V1 Retinotopic Hypnosis & Alexander's TRI-FECTION Life Integral */}
          {!isOccipitalCollapsed && (
            <div className="lg:col-span-12 flex flex-col gap-2.5 bg-slate-900/55 border border-emerald-500/35 rounded-xl p-3 overflow-x-auto">
              <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 font-mono">
                  <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    12 Occipital Ingest Brain Hypnosis · Alexander&apos;s TRI-FECTION Life Integral
                    of Mood (Physical · Social · Mental)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono tabular-nums text-slate-300">
                  <span>
                    10Hz SSVEP ρ_CCA:{' '}
                    <strong className="text-cyan-300">
                      {trifectionIntegral.occipitalCanonicalCorrelationRho}
                    </strong>
                  </span>
                  <span>
                    Łukasiewicz T-Norm:{' '}
                    <strong className="text-amber-300">
                      {trifectionIntegral.lukasiewiczConjunctionSynergy}%
                    </strong>
                  </span>
                  <span>
                    Choquet Passion Integral:{' '}
                    <strong className="text-rose-400">
                      {trifectionIntegral.choquetPassionAwakeningScore}%
                    </strong>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 items-center">
                {/* 10Hz Alpha SSVEP & Log-Polar Gabor Retinotopic SVG Wave */}
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2 flex flex-col items-center justify-center">
                  <svg
                    viewBox="0 0 220 74"
                    className="w-full h-16 overflow-visible"
                    role="img"
                    aria-label="Occipital V1 10Hz SSVEP & Log-Polar Gabor Retinotopic Hypnosis Wave"
                  >
                    <defs>
                      <radialGradient id="occipitalRingGrad" cx="50%" cy="50%" r="50%">
                        <stop
                          offset="0%"
                          stopColor="#10b981"
                          stopOpacity={0.35 + lerpProgress * 0.45}
                        />
                        <stop offset="60%" stopColor="#f43f5e" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="42" cy="37" rx="34" ry="30" fill="url(#occipitalRingGrad)" />
                    <circle
                      cx="42"
                      cy="37"
                      r={10 + lerpProgress * 14}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="1.5"
                      strokeDasharray="3 2"
                    />
                    <circle
                      cx="42"
                      cy="37"
                      r={20 - lerpProgress * 8}
                      fill="none"
                      stroke="#fb7185"
                      strokeWidth="1.5"
                    />
                    <path
                      d={`M 84 37 Q 108 ${12 + lerpProgress * 50} 132 37 T 180 37 T 214 37`}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="2.2"
                    />
                    <path
                      d={`M 84 37 Q 108 ${62 - lerpProgress * 50} 132 37 T 180 37 T 214 37`}
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="1.6"
                      strokeDasharray="3 3"
                    />
                  </svg>
                  <span className="text-[10px] font-mono text-emerald-300">
                    w = k·ln(z + a) · {trifectionIntegral.occipitalSsvepHz}Hz Phase-Locked
                  </span>
                </div>

                {/* Pillar 1: PHYSICAL (Appearance, Optimal Health, Exercise) */}
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-300 font-semibold">I. PHYSICAL</span>
                    <span className="text-slate-100 font-bold">
                      {trifectionIntegral.physicalTotal}%
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
                    <div className="flex justify-between">
                      <span>Appearance (Hygiene/Style/Posture):</span>
                      <span className="text-emerald-400">{trifectionIntegral.physicalAppearance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Optimal Health (Sleep/Diet/Act):</span>
                      <span className="text-cyan-300">{trifectionIntegral.physicalHealth}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Exercise (Str/End/Flex):</span>
                      <span className="text-indigo-300">{trifectionIntegral.physicalExercise}%</span>
                    </div>
                  </div>
                </div>

                {/* Pillar 2: SOCIAL (Best Impression, Interactions, Positive Relationships) */}
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-300 font-semibold">II. SOCIAL</span>
                    <span className="text-slate-100 font-bold">
                      {trifectionIntegral.socialTotal}%
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
                    <div className="flex justify-between">
                      <span>Best Impression (Para-Ling):</span>
                      <span className="text-emerald-400">
                        {trifectionIntegral.socialImpression}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interactions (Flirting &amp; Flow):</span>
                      <span className="text-cyan-300">{trifectionIntegral.socialInteractions}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Positive Relationships (Retention):</span>
                      <span className="text-rose-300">
                        {trifectionIntegral.socialRelationships}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pillar 3: MENTAL (Emotional Identity, Philosophical Principles, Logical/Productivity) */}
                <div className="rounded-lg bg-slate-950 border border-slate-800 p-2.5 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-fuchsia-300 font-semibold">III. MENTAL</span>
                    <span className="text-slate-100 font-bold">
                      {trifectionIntegral.mentalTotal}%
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 space-y-0.5">
                    <div className="flex justify-between">
                      <span>Emotional Identity (Meaning):</span>
                      <span className="text-emerald-400">
                        {trifectionIntegral.mentalEmotionalIdentity}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Philosophical (Ethics/Worldview):</span>
                      <span className="text-cyan-300">
                        {trifectionIntegral.mentalPhilosophicalPrinciples}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Logical / Productivity (Flow):</span>
                      <span className="text-amber-300">
                        {trifectionIntegral.mentalLogicalProductivity}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.section>
  );
}
