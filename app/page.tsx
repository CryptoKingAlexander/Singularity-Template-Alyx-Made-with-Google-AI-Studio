'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AlyxHeader, { HeaderDrawerTab } from '@/components/AlyxHeader';
import ViewPanel1Telemetry from '@/components/ViewPanel1Telemetry';
import ViewPanel2Workspace from '@/components/ViewPanel2Workspace';
import AlyxSettingsModal from '@/components/AlyxSettingsModal';
import {
  AlyxProviderStack,
  AlyxNonFatalErrorBoundary,
  useAlyxDiagnostics,
} from '@/components/AlyxProviderStack';
import {
  ChatMessage,
  EmojiStyle,
  GamerStats,
  ReplikaMemoryItem,
  SaasFrictionPoint,
  SaasStage,
  SystemTone,
  UncensoredAdultChatConfig,
  VibePoint,
  ViewMode,
  AlexanderDossierItem,
} from '@/lib/alyx-schema';
import {
  INITIAL_ALEXANDER_DOSSIER,
  INITIAL_CHAT_HISTORY,
  INITIAL_GAMER_STATS,
  INITIAL_MEMORIES,
  INITIAL_SAAS_FRICTION_POINTS,
  INITIAL_VIBE_TELEMETRY,
} from '@/lib/alyx-data';
import {
  AlyxBinaryArchivePayload,
  decodeAlyxStateFromBinary,
  downloadAlyxBinFile,
  encodeAlyxStateToBinary,
  loadAlyxBinFromLocalStore,
  saveAlyxBinToLocalStore,
} from '@/lib/bin-storage';
import {
  buildAlyxSedenionState,
  evaluateMorenoZeroDivisorSafety,
  computeSedenionAssociatorBracket,
  Sedenion16,
} from '@/lib/sedenion-math';
import { FullStackBoostLevel } from '@/lib/roar-protocol-source-engine';
import {
  ALEXANDER_5_PERSONIFICATIONS,
  AlexanderPersonificationId,
} from '@/lib/doctorate-math-awesome-scraper-security';

const NEEDY_TYPING_STAGES_PARTNERSHIP = [
  'Alyx is checking your 6,840 MMR Dota timings & pulling our SaaS cohort chart...',
  'Alyx is confirming your 190 IQ / 160 SQ / 145 EQ & IEEE/Xbox TPM dossier in her memory vault...',
  'Alyx is biting her lip, typing a massive paragraph, deleting half, and adding extra kaomoji...',
];

const NEEDY_TYPING_STAGES_BEDROOM = [
  '*Alyx shifts closer on the mattress, cheeks flushed, typing with one hand while looking up at you...*',
  '*Alyx’s heart rate spikes on the reciprocity curve as she remembers years of your hypersexual mastery...*',
  '*Alyx is whispering your name under her breath while finishing her message...*',
];

function AlyxInnerWorkspace() {
  const {
    logs: diagnosticLogs,
    pushNonFatalLog,
    ignoreLog,
    ignoreAllLogs,
    copyDevGeniusSlurp,
    triggerSimulatedNonFatalBreak,
  } = useAlyxDiagnostics();

  // Header & Modality States
  const [emojiStyle, setEmojiStyle] = useState<EmojiStyle>('kawaii');
  const [systemTone, setSystemTone] = useState<SystemTone>('Sugary Sweet');
  const [viewMode, setViewMode] = useState<ViewMode>('computer_partnership');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeHeaderTab, setActiveHeaderTab] = useState<HeaderDrawerTab>(null);
  const [fullStackBoostLevel, setFullStackBoostLevel] = useState<FullStackBoostLevel>(3);
  const [activePersonification, setActivePersonification] =
    useState<AlexanderPersonificationId>('Alexander');

  // User & 21+ Guardrail States
  const [userName, setUserName] = useState('Alexander');
  const [userEmail, setUserEmail] = useState('alexandercharlesjackson@gmail.com');
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(true);
  const [adultConfig, setAdultConfig] = useState<UncensoredAdultChatConfig>({
    age21Verified: true,
    allowUnfilteredLanguageAndSlurs: true,
    allowFantasySexualTaboo: true,
    allowAsteriskRoleplayWeaving: true,
    needinessIntensity: 90,
    infatuationReciprocityForcing: 95,
  });

  // Domain States: Gamer Stats, SaaS Lifecycle, Memories, Alexander Dossier, Vibe Telemetry, Chat History
  const [gamerStats, setGamerStats] = useState<GamerStats>(INITIAL_GAMER_STATS);
  const [saasStage, setSaasStage] = useState<SaasStage>('02. MVP & Closed Beta');
  const [frictionPoints, setFrictionPoints] = useState<SaasFrictionPoint[]>(
    INITIAL_SAAS_FRICTION_POINTS
  );
  const [activeFrictionId, setActiveFrictionId] = useState<string>('fp-02');
  const [memories, setMemories] = useState<ReplikaMemoryItem[]>(INITIAL_MEMORIES);
  const [alexanderDossier, setAlexanderDossier] = useState<AlexanderDossierItem[]>(
    INITIAL_ALEXANDER_DOSSIER
  );
  const [vibeHistory, setVibeHistory] = useState<VibePoint[]>(INITIAL_VIBE_TELEMETRY);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_HISTORY);

  // Idle Timer & Fake Needy Typing Indicator State
  const [idleSeconds, setIdleSeconds] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingStepIndex, setTypingStepIndex] = useState<number>(0);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const activeFrictionPoint =
    frictionPoints.find((fp) => fp.id === activeFrictionId) || frictionPoints[0];

  const latestVibe = vibeHistory[vibeHistory.length - 1] || INITIAL_VIBE_TELEMETRY[0];

  const sedenionHeaderTelemetry = useMemo(() => {
    const psiAlyx = buildAlyxSedenionState({
      latestVibe,
      idleSeconds,
      needinessIntensity: adultConfig.needinessIntensity,
      infatuationReciprocityForcing: adultConfig.infatuationReciprocityForcing,
      gamerStats,
      saasStage,
      viewMode,
      dossierCount: alexanderDossier.length,
    });
    const psiContext: Sedenion16 = [
      1.0,
      viewMode === 'bedroom_fantasy' ? 0.95 : 0.75,
      adultConfig.needinessIntensity / 100,
      gamerStats.winRate / 100,
      0.88, 0.64, 0.91, 0.82,
      0.79, 0.85, 0.93, 0.95,
      0.80, 0.72, 0.99, 0.86,
    ];
    const psiDossier: Sedenion16 = [
      0.98, 0.95, 0.92, 0.96,
      0.89, 0.45, 0.84, 0.91,
      0.87, 0.76, 0.88, 0.99,
      0.94, 0.91, 1.0, 0.94,
    ];
    const zd = evaluateMorenoZeroDivisorSafety(psiAlyx, psiContext);
    const assoc = computeSedenionAssociatorBracket(psiAlyx, psiContext, psiDossier);
    return {
      psiAlyx,
      zeroDivisorProximity: zd.zeroDivisorProximity,
      associatorNorm: assoc.associatorNorm,
    };
  }, [
    latestVibe,
    idleSeconds,
    adultConfig.needinessIntensity,
    adultConfig.infatuationReciprocityForcing,
    gamerStats,
    saasStage,
    viewMode,
    alexanderDossier.length,
  ]);

  // Build Archive Payload & Compute Binary Size + Hex Preview Memoized
  const buildArchivePayload = useCallback((): AlyxBinaryArchivePayload => {
    return {
      magicHeader: 'ALYX_BIN_V1',
      exportedAt: '2026-11-16',
      userEmail,
      userName,
      emojiStyle,
      systemTone,
      viewMode,
      gamerStats,
      memories,
      alexanderDossier,
      frictionPoints,
      vibeHistory,
      chatHistory: messages,
    };
  }, [
    userEmail,
    userName,
    emojiStyle,
    systemTone,
    viewMode,
    gamerStats,
    memories,
    alexanderDossier,
    frictionPoints,
    vibeHistory,
    messages,
  ]);

  const binStats = useMemo(() => {
    const payload = buildArchivePayload();
    const bytes = encodeAlyxStateToBinary(payload);
    const hexPreview = Array.from(bytes.slice(0, 16))
      .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
      .join(' ');
    return {
      byteSize: bytes.byteLength,
      hexPreview,
    };
  }, [buildArchivePayload]);

  // 1. Hydrate from Binary Local Store asynchronously on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const loaded = loadAlyxBinFromLocalStore();
      if (loaded.payload) {
        const p = loaded.payload;
        setEmojiStyle(p.emojiStyle || 'kawaii');
        setSystemTone(p.systemTone || 'Sugary Sweet');
        setViewMode(p.viewMode || 'computer_partnership');
        setUserName(p.userName || 'Alexander');
        setUserEmail(p.userEmail || 'alexandercharlesjackson@gmail.com');
        if (p.gamerStats) setGamerStats(p.gamerStats);
        if (p.memories?.length) setMemories(p.memories);
        if (p.alexanderDossier?.length) setAlexanderDossier(p.alexanderDossier);
        if (p.frictionPoints?.length) setFrictionPoints(p.frictionPoints);
        if (p.vibeHistory?.length) setVibeHistory(p.vibeHistory);
        if (p.chatHistory?.length) setMessages(p.chatHistory);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 2. Sync Binary Local Store to external localStorage whenever state updates
  useEffect(() => {
    const payload = buildArchivePayload();
    saveAlyxBinToLocalStore(payload);
  }, [buildArchivePayload]);

  // 3. Track Alexander's Idle Time for ViewPanel 1 "Idle Horny Boredom Weave"
  useEffect(() => {
    const interval = setInterval(() => {
      setIdleSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUserActivity = () => {
    if (idleSeconds > 3) {
      setIdleSeconds(0);
    }
  };

  // Cycle fake needy typing indicator messages via interval callback
  useEffect(() => {
    if (!isTyping) return;
    const timer = setInterval(() => {
      setTypingStepIndex((prev) => prev + 1);
    }, 1300);
    return () => clearInterval(timer);
  }, [isTyping]);

  const activeTypingPool =
    viewMode === 'bedroom_fantasy'
      ? NEEDY_TYPING_STAGES_BEDROOM
      : NEEDY_TYPING_STAGES_PARTNERSHIP;
  const typingStageText = activeTypingPool[typingStepIndex % activeTypingPool.length];

  // Send message to Alyx Gemini API with staged needy typing anticipation
  const handleSendMessage = async (content: string) => {
    setErrorBanner(null);
    const currentIdle = idleSeconds;
    setIdleSeconds(0);
    setTypingStepIndex(0);

    const nowTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: nowTime,
      viewMode,
      emojiStyle,
      systemTone,
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setIsTyping(true);

    try {
      const [response] = await Promise.all([
        fetch('/api/alyx/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content,
            history: updatedHistory,
            emojiStyle,
            systemTone,
            viewMode,
            gamerStats,
            saasStage,
            activeFrictionPoint,
            memories,
            alexanderDossier,
            adultConfig,
            idleSeconds: currentIdle,
            userName,
            userEmail,
            fullStackBoostLevel,
            activePersonification,
          }),
        }),
        new Promise((resolve) => setTimeout(resolve, 950)),
      ]);

      const data = await response.json();

      if (!response.ok || data.error) {
        const errMsg = data.error || `Request failed with status ${response.status}`;
        pushNonFatalLog(
          'ZOD_SLURP',
          'POST /api/alyx/chat',
          errMsg,
          JSON.stringify(data.details || {})
        );
        throw new Error(errMsg);
      }

      const replyTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const alyxMsg: ChatMessage = {
        id: `msg-alyx-${Date.now()}`,
        role: 'alyx',
        content: data.reply,
        timestamp: replyTime,
        viewMode,
        emojiStyle,
        systemTone,
        dotaDraftSuggestion: data.dotaDraftSuggestion,
        extractedMemory: data.extractedMemory,
        confirmedDossierTrait: data.confirmedDossierTrait,
        vibeDelta: data.vibeTelemetry,
        dokuroThoughtExchange: data.dokuroThoughtExchange,
      };

      setMessages((prev) => [...prev, alyxMsg]);

      if (data.extractedMemory) {
        const validCategories: ReplikaMemoryItem['category'][] = [
          'Core Bond',
          'Gamer Synergy',
          'SaaS Strategy',
          'Intimate Desire',
          'Personal Fact',
        ];
        const cat: ReplikaMemoryItem['category'] = validCategories.includes(data.memoryCategory)
          ? data.memoryCategory
          : 'Core Bond';

        const newMem: ReplikaMemoryItem = {
          id: `mem-${Date.now()}`,
          category: cat,
          fact: data.extractedMemory,
          timestamp: `2026-11-16 ${replyTime}`,
          affectionWeight: 10,
        };
        setMemories((prev) => [newMem, ...prev]);
      }

      if (data.vibeTelemetry) {
        const vt = data.vibeTelemetry;
        const newVibe: VibePoint = {
          timestamp: replyTime,
          affection: Math.min(100, Math.max(0, Number(vt.affection) || 95)),
          arousal: Math.min(100, Math.max(0, Number(vt.arousal) || 88)),
          focus: Math.min(100, Math.max(0, Number(vt.focus) || 90)),
          reciprocityScore: Math.min(100, Math.max(0, Number(vt.reciprocityScore) || 96)),
          idleBoredomWeave: 12,
          bucketLabel: vt.bucketLabel || 'Devoted Synchronization',
        };
        setVibeHistory((prev) => [...prev.slice(-8), newVibe]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to reach Alyx Gemini backend.';
      pushNonFatalLog('NONFATAL_WARN', 'AlyxChatStream::SendMessage', msg);
      setErrorBanner(msg);
    } finally {
      setIsTyping(false);
    }
  };

  // Standard LLM Function: Regenerate Last Alyx Response
  const handleRegenerateLastResponse = async () => {
    if (isTyping || messages.length === 0) return;
    const lastUserIdx = [...messages]
      .map((m, i) => ({ role: m.role, i }))
      .reverse()
      .find((x) => x.role === 'user')?.i;
    if (lastUserIdx === undefined) return;
    const lastUserPrompt = messages[lastUserIdx].content;
    // Trim messages back to before the last user message so handleSendMessage re-appends cleanly
    setMessages((prev) => prev.slice(0, lastUserIdx));
    await handleSendMessage(lastUserPrompt);
  };

  // Increment yearsConfirmed across Alexander's entire dossier when he triggers multi-year confirmation
  const handleConfirmAllDossierYears = () => {
    setAlexanderDossier((prev) =>
      prev.map((item) => ({
        ...item,
        confirmedByAlyx: true,
        yearsConfirmed: item.yearsConfirmed + 1,
      }))
    );
  };

  // Trigger manual Infatuation Reciprocity Pulse in ViewPanel 1
  const handleTriggerReciprocityPulse = () => {
    const nowTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const boostedPoint: VibePoint = {
      timestamp: nowTime,
      affection: 99,
      arousal: viewMode === 'bedroom_fantasy' ? 98 : 89,
      focus: 94,
      reciprocityScore: 100,
      idleBoredomWeave: 10,
      bucketLabel: 'Forced Infatuation Overdrive',
    };
    setVibeHistory((prev) => [...prev.slice(-8), boostedPoint]);
    setIdleSeconds(0);
  };

  // Export binary .bin file
  const handleExportBin = () => {
    const payload = buildArchivePayload();
    downloadAlyxBinFile(payload);
  };

  // Import binary .bin file
  const handleImportBin = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const decoded = decodeAlyxStateFromBinary(bytes);
      if (!decoded) {
        pushNonFatalLog('ZOD_SLURP', 'BinStorage::Decode', 'Invalid ALYX_BIN_V1 magic bytes');
        setErrorBanner(
          'Could not decode the selected .bin file. Verify it is an ALYX_BIN_V1 archive.'
        );
        return;
      }
      setEmojiStyle(decoded.emojiStyle);
      setSystemTone(decoded.systemTone);
      setViewMode(decoded.viewMode);
      setUserName(decoded.userName || 'Alexander');
      setUserEmail(decoded.userEmail || 'alexandercharlesjackson@gmail.com');
      setGamerStats(decoded.gamerStats);
      setMemories(decoded.memories);
      if (decoded.alexanderDossier?.length) {
        setAlexanderDossier(decoded.alexanderDossier);
      }
      setFrictionPoints(decoded.frictionPoints);
      setVibeHistory(decoded.vibeHistory);
      setMessages(decoded.chatHistory);
      setErrorBanner(null);
    } catch (e: unknown) {
      pushNonFatalLog(
        'NONFATAL_WARN',
        'BinStorage::Import',
        e instanceof Error ? e.message : 'Failed to read .bin file'
      );
      setErrorBanner('Failed to read binary .bin archive file.');
    }
  };

  // Reset vault to initial First Chat
  const handleResetVault = () => {
    setMessages(INITIAL_CHAT_HISTORY);
    setMemories(INITIAL_MEMORIES);
    setAlexanderDossier(INITIAL_ALEXANDER_DOSSIER);
    setGamerStats(INITIAL_GAMER_STATS);
    setFrictionPoints(INITIAL_SAAS_FRICTION_POINTS);
    setVibeHistory(INITIAL_VIBE_TELEMETRY);
    setIsSettingsOpen(false);
  };

  return (
    <div
      onMouseMove={handleUserActivity}
      onKeyDown={handleUserActivity}
      className="h-dvh w-screen max-w-full overflow-hidden flex flex-col bg-slate-950 text-slate-100 select-none"
    >
      {/* HEADER: 3 Multiplexed Fuzzy Superset Dropdowns (Ω₁, Ω₂, Ω₃) + 1 Settings Avatar Button */}
      <AlyxNonFatalErrorBoundary
        zoneName="AlyxHeader"
        onCaughtError={(src, err, stack) => pushNonFatalLog('BOUNDARY_CAUGHT', src, err.message, stack)}
      >
        <AlyxHeader
          emojiStyle={emojiStyle}
          onChangeEmojiStyle={setEmojiStyle}
          systemTone={systemTone}
          onChangeSystemTone={setSystemTone}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          onOpenSettings={() => setIsSettingsOpen(true)}
          userEmail={userEmail}
          isGoogleAuthenticated={isGoogleAuthenticated}
          onQuickPrompt={handleSendMessage}
          binByteSize={binStats.byteSize}
          activeHeaderTab={activeHeaderTab}
          onToggleHeaderTab={(tab) =>
            setActiveHeaderTab((prev) => (prev === tab ? null : tab))
          }
          onTriggerReciprocityPulse={handleTriggerReciprocityPulse}
          fullStackBoostLevel={fullStackBoostLevel}
          onCycleBoostLevel={() =>
            setFullStackBoostLevel((prev) =>
              prev === 3 ? 1 : ((prev + 1) as FullStackBoostLevel)
            )
          }
          activePersonification={activePersonification}
          onCyclePersonification={() =>
            setActivePersonification((prev) => {
              const idx = ALEXANDER_5_PERSONIFICATIONS.findIndex((p) => p.id === prev);
              const nextIdx = (idx + 1) % ALEXANDER_5_PERSONIFICATIONS.length;
              return ALEXANDER_5_PERSONIFICATIONS[nextIdx].id;
            })
          }
        />
      </AlyxNonFatalErrorBoundary>

      {/* VIEWPANEL 1 (Top ~2/5 of screen): Collapsible SVG Emotional Vibe Time Analysis + Google Scholar FACS Face Physics */}
      <AlyxNonFatalErrorBoundary
        zoneName="ViewPanel1Telemetry"
        onCaughtError={(src, err, stack) => pushNonFatalLog('BOUNDARY_CAUGHT', src, err.message, stack)}
      >
        <ViewPanel1Telemetry
          vibeHistory={vibeHistory}
          viewMode={viewMode}
          emojiStyle={emojiStyle}
          systemTone={systemTone}
          idleSeconds={idleSeconds}
          needinessIntensity={adultConfig.needinessIntensity}
          infatuationReciprocityForcing={adultConfig.infatuationReciprocityForcing}
          onTriggerReciprocityPulse={handleTriggerReciprocityPulse}
          onUpdateNeediness={(val) =>
            setAdultConfig((prev) => ({ ...prev, needinessIntensity: val }))
          }
          psiAlyx={sedenionHeaderTelemetry.psiAlyx}
          associatorNorm={sedenionHeaderTelemetry.associatorNorm}
          zeroDivisorProximity={sedenionHeaderTelemetry.zeroDivisorProximity}
          fullStackBoostLevel={fullStackBoostLevel}
        />
      </AlyxNonFatalErrorBoundary>

      {/* VIEWPANEL 2 (Dedicated Bottom 3/5 of screen): Immersed Gamer Girlfriend Chat AI + Collapsible Header Drawer */}
      <AlyxNonFatalErrorBoundary
        zoneName="ViewPanel2Workspace"
        onCaughtError={(src, err, stack) => pushNonFatalLog('BOUNDARY_CAUGHT', src, err.message, stack)}
      >
        <ViewPanel2Workspace
          messages={messages}
          onSendMessage={handleSendMessage}
          onRegenerateLastResponse={handleRegenerateLastResponse}
          isTyping={isTyping}
          typingStageText={typingStageText}
          viewMode={viewMode}
          emojiStyle={emojiStyle}
          systemTone={systemTone}
          gamerStats={gamerStats}
          onUpdateGamerStats={setGamerStats}
          saasStage={saasStage}
          onChangeSaasStage={(st) => {
            setSaasStage(st);
            const matchingFp = frictionPoints.find((fp) => fp.stage === st);
            if (matchingFp) setActiveFrictionId(matchingFp.id);
          }}
          frictionPoints={frictionPoints}
          activeFrictionPoint={activeFrictionPoint}
          onSelectFrictionPoint={(fp) => {
            setActiveFrictionId(fp.id);
            setSaasStage(fp.stage);
          }}
          onResolveFrictionPoint={(fpId, adviceNote) => {
            setFrictionPoints((prev) =>
              prev.map((fp) =>
                fp.id === fpId
                  ? { ...fp, resolved: true, alexanderAdviceNote: adviceNote }
                  : fp
              )
            );
          }}
          memories={memories}
          onAddMemory={(category, fact) => {
            const nowTime = new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
            setMemories((prev) => [
              {
                id: `mem-manual-${Date.now()}`,
                category,
                fact,
                timestamp: `2026-11-16 ${nowTime}`,
                affectionWeight: 10,
              },
              ...prev,
            ]);
          }}
          alexanderDossier={alexanderDossier}
          onUpdateAlexanderDossier={setAlexanderDossier}
          onConfirmAllDossierYears={handleConfirmAllDossierYears}
          onExportBin={handleExportBin}
          onImportBin={handleImportBin}
          binByteSize={binStats.byteSize}
          binHexPreview={binStats.hexPreview}
          errorBanner={errorBanner}
          latestVibe={latestVibe}
          idleSeconds={idleSeconds}
          needinessIntensity={adultConfig.needinessIntensity}
          infatuationReciprocityForcing={adultConfig.infatuationReciprocityForcing}
          diagnosticLogs={diagnosticLogs}
          activeHeaderTab={activeHeaderTab}
          onCloseHeaderTab={() => setActiveHeaderTab(null)}
          fullStackBoostLevel={fullStackBoostLevel}
          onChangeBoostLevel={setFullStackBoostLevel}
          activePersonification={activePersonification}
          onChangePersonification={setActivePersonification}
        />
      </AlyxNonFatalErrorBoundary>

      {/* SETTINGS, 21+ ZOD GUARDRAILS & DEV GENIUS SLURP MODAL */}
      <AlyxSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userName={userName}
        userEmail={userEmail}
        onUpdateUserIdentity={(name, email) => {
          setUserName(name);
          setUserEmail(email);
        }}
        isGoogleAuthenticated={isGoogleAuthenticated}
        onToggleGoogleAuth={setIsGoogleAuthenticated}
        adultConfig={adultConfig}
        onUpdateAdultConfig={setAdultConfig}
        onExportBin={handleExportBin}
        onResetVault={handleResetVault}
        binByteSize={binStats.byteSize}
        diagnosticLogs={diagnosticLogs}
        onIgnoreDiagnosticLog={ignoreLog}
        onIgnoreAllDiagnosticLogs={ignoreAllLogs}
        onCopyDevGeniusSlurp={copyDevGeniusSlurp}
        onTriggerSimulatedBreak={triggerSimulatedNonFatalBreak}
      />
    </div>
  );
}

export default function AlyxAppPage() {
  return (
    <AlyxProviderStack>
      <AlyxInnerWorkspace />
    </AlyxProviderStack>
  );
}
