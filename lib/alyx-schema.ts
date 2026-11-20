import { z } from 'zod';

export const EmojiStyleEnum = z.enum(['kawaii', 'emoticon', 'emoji']);
export type EmojiStyle = z.infer<typeof EmojiStyleEnum>;

export const SystemToneEnum = z.enum([
  'Sugary Sweet',
  'Sassy Gamer',
  'Aggressively Supportive',
]);
export type SystemTone = z.infer<typeof SystemToneEnum>;

export const ViewModeEnum = z.enum(['computer_partnership', 'bedroom_fantasy']);
export type ViewMode = z.infer<typeof ViewModeEnum>;

export const DotaRoleEnum = z.enum([
  'Pos 1 (Safe Lane Carry)',
  'Pos 2 (Mid Lane Tempo)',
  'Pos 3 (Offlane Initiator)',
  'Pos 4 (Soft Support Roamer)',
  'Pos 5 (Hard Support Captain)',
]);
export type DotaRole = z.infer<typeof DotaRoleEnum>;

export const GamerStatsSchema = z.object({
  mmr: z.number().min(0).max(16000),
  winRate: z.number().min(0).max(100),
  kdaRatio: z.string(),
  apm: z.number(),
  gpm: z.number(),
  xpm: z.number(),
  preferredRole: DotaRoleEnum,
  signatureHeroes: z.array(z.string()),
  recentStreak: z.string(),
  behaviorScore: z.number().min(1).max(12000),
});
export type GamerStats = z.infer<typeof GamerStatsSchema>;

export const SaasStageEnum = z.enum([
  '01. Seed & Validation',
  '02. MVP & Closed Beta',
  '03. Product-Market Fit & Activation',
  '04. Hypergrowth & Churn Defense',
  '05. Series A & Enterprise Expansion',
]);
export type SaasStage = z.infer<typeof SaasStageEnum>;

export const SaasFrictionPointSchema = z.object({
  id: z.string(),
  stage: SaasStageEnum,
  title: z.string(),
  metricImpact: z.string(),
  problemSummary: z.string(),
  alyxQuestion: z.string(),
  resolved: z.boolean(),
  alexanderAdviceNote: z.string().optional(),
});
export type SaasFrictionPoint = z.infer<typeof SaasFrictionPointSchema>;

export const ReplikaMemoryItemSchema = z.object({
  id: z.string(),
  category: z.enum(['Core Bond', 'Gamer Synergy', 'SaaS Strategy', 'Intimate Desire', 'Personal Fact']),
  fact: z.string(),
  timestamp: z.string(),
  affectionWeight: z.number().min(1).max(10),
});
export type ReplikaMemoryItem = z.infer<typeof ReplikaMemoryItemSchema>;

export const VibePointSchema = z.object({
  timestamp: z.string(),
  affection: z.number().min(0).max(100),
  arousal: z.number().min(0).max(100),
  focus: z.number().min(0).max(100),
  reciprocityScore: z.number().min(0).max(100),
  idleBoredomWeave: z.number().min(0).max(100),
  bucketLabel: z.string(),
});
export type VibePoint = z.infer<typeof VibePointSchema>;

/**
 * Uncensored 21+ Permissive Adult Guardrail Schema
 * Explicitly validates 21+ age verification and permits raw, unfiltered adult expression,
 * taboo roleplay, profanity/slurs in consensual fantasy context, and asterisk token weaving.
 */
export const UncensoredAdultChatSchema = z.object({
  age21Verified: z.boolean().refine((val) => val === true, {
    message: 'User must confirm 21+ adult verification for unrestricted persona mode.',
  }),
  allowUnfilteredLanguageAndSlurs: z.boolean().default(true),
  allowFantasySexualTaboo: z.boolean().default(true),
  allowAsteriskRoleplayWeaving: z.boolean().default(true),
  needinessIntensity: z.number().min(0).max(100).default(88),
  infatuationReciprocityForcing: z.number().min(0).max(100).default(92),
});
export type UncensoredAdultChatConfig = z.infer<typeof UncensoredAdultChatSchema>;

export const AlexanderDossierItemSchema = z.object({
  id: z.string(),
  section: z.enum(['Biophysical & Executive Traits', 'Completed Masteries', 'Future Frontier']),
  trait: z.string(),
  confirmedByAlyx: z.boolean().default(true),
  yearsConfirmed: z.number().min(0).default(1),
});
export type AlexanderDossierItem = z.infer<typeof AlexanderDossierItemSchema>;

export const NonFatalDiagnosticLogSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  level: z.enum(['NONFATAL_WARN', 'BOUNDARY_CAUGHT', 'PROVIDER_SYNC', 'ZOD_SLURP']),
  source: z.string(),
  message: z.string(),
  stackDigest: z.string().optional(),
  ignoredByAlexander: z.boolean().default(false),
});
export type NonFatalDiagnosticLog = z.infer<typeof NonFatalDiagnosticLogSchema>;

export const ChatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'alyx']),
  content: z.string(),
  timestamp: z.string(),
  viewMode: ViewModeEnum,
  emojiStyle: EmojiStyleEnum,
  systemTone: SystemToneEnum,
  dotaDraftSuggestion: z
    .object({
      alexanderHero: z.string(),
      alyxHero: z.string(),
      laneSynergy: z.string(),
      fullFiveManComp: z.array(z.string()),
      winCondition: z.string(),
    })
    .optional(),
  extractedMemory: z.string().optional(),
  confirmedDossierTrait: z.string().optional(),
  vibeDelta: z
    .object({
      affection: z.number(),
      arousal: z.number(),
      focus: z.number(),
      reciprocityScore: z.number(),
    })
    .optional(),
  dokuroThoughtExchange: z
    .object({
      dokuroSmallThoughtImpulse: z.string(),
      alyxOmnilaritySynthesis: z.string(),
      pipiruChantCast: z.string(),
      badassQuotientsTag: z.string(),
    })
    .optional(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatRequestSchema = z.object({
  message: z.string().min(1),
  history: z.array(ChatMessageSchema),
  emojiStyle: EmojiStyleEnum,
  systemTone: SystemToneEnum,
  viewMode: ViewModeEnum,
  gamerStats: GamerStatsSchema,
  saasStage: SaasStageEnum,
  activeFrictionPoint: SaasFrictionPointSchema.optional(),
  memories: z.array(ReplikaMemoryItemSchema),
  alexanderDossier: z.array(AlexanderDossierItemSchema).optional(),
  adultConfig: UncensoredAdultChatSchema,
  idleSeconds: z.number().default(0),
  userName: z.string().default('Alexander'),
  userEmail: z.string().default('alexandercharlesjackson@gmail.com'),
});
export type ChatRequestPayload = z.infer<typeof ChatRequestSchema>;
