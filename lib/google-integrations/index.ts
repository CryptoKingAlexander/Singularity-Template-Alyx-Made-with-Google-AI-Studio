// ============================================================================
// PROJECT FOLDERIZATION: /lib/google-integrations/index.ts
// Centralizes Google Workspace OAuth 2.0, Drive v3 CryptoKingAlexander Webhook
// & Folderized Guider (.doc) Metadata
// ============================================================================

export {
  SCOPES,
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from '@/lib/google-workspace-auth';

export {
  CRYPTO_KING_ALEXANDER_DRIVE_WEBHOOK,
  INITIAL_PEACEFUL_MARKETPLACE_WORKERS,
  INITIAL_WEBHOOK_MARKETPLACE_ENDPOINTS,
} from '@/lib/webhook-worker-marketplace';

export type {
  DriveFileItem,
  PeacefulMarketplaceWorker,
  WebhookEndpointItem,
} from '@/lib/webhook-worker-marketplace';

export interface ProjectFolderGuiderDoc {
  id: string;
  folderPath: '/google-integrations' | '/ROARdocs' | '/CryptoKingAlexander' | '/';
  fileName: string;
  docFormat: '.doc' | '.md';
  sourceAttachmentPath?: string;
  title: string;
  primaryDirective: 'be good';
  summary: string;
  byteSizeEstimate: number;
}

export const FOLDERIZED_PROJECT_GUIDERS: ProjectFolderGuiderDoc[] = [
  {
    id: 'GUIDER-ROOT-PM-MD',
    folderPath: '/',
    fileName: 'PM_INTERVIEW_GUIDE_NO_CRYPTO.md',
    docFormat: '.md',
    title: 'Cracking the PM Interview Style Outline (Zero-Crypto · 200–500 Word Paragraphs)',
    primaryDirective: 'be good',
    summary:
      'Starts with "achieve good via munching below text", delivers 5 comprehensive 200–500 word paragraphs covering PM Vision, CIRCLES Design, HEART/AARRR Execution Metrics, Technical Architecture Trade-Offs, and STAR Behavioral Leadership with zero crypto terminology, and concludes with "be good".',
    byteSizeEstimate: 7840,
  },
  {
    id: 'GUIDER-ROAR-01',
    folderPath: '/ROARdocs',
    fileName: 'Guider_01_Perfect_Triangle_Lite_3D_Model_of_Alexander_Unity_YAML_bin_CSharp_JS_DevOps_Pipeline.doc',
    docFormat: '.doc',
    sourceAttachmentPath:
      '/assets/aistudio/Perfect_Triangle_Lite-_3D_Model_of_Alexander___Unity_Engine_YAML-.bin-C_-JS_DevOps_Pipeline_96ffac0b.md',
    title: 'Perfect Triangle Lite: 3D Model of Alexander — Unity Engine YAML / .bin / C# / JS Pipeline',
    primaryDirective: 'be good',
    summary:
      'Ecological systems personification, bit-by-bit design, LOD0 (14,800 Δ) to LOD3 (512 Δ <8KB Passable Shard) topology, Alexander_Lite.prefab.yaml, 64B-aligned ALX3D_BIN_V1 shard layout, Unity C# NativeArray Burst loader, and WebGL AlexanderShardBridge.js.',
    byteSizeEstimate: 9420,
  },
  {
    id: 'GUIDER-ROAR-02',
    folderPath: '/ROARdocs',
    fileName: 'Guider_02_CryptoKingAlexander_img2intel_Tag_Analysis_Visualization_Trie.doc',
    docFormat: '.doc',
    sourceAttachmentPath:
      '/assets/aistudio/CryptoKingAlexander_img2intel_Tag_Analysis___Visualization_Trie_1f714ac9.md',
    title: 'CryptoKingAlexander: Master img2intel Tag Analysis & Visualization Trie',
    primaryDirective: 'be good',
    summary:
      '4-Branch Master img2intel Visualization Trie: Branch I (National Air Defense & Golden Dome C4ISR), Branch II (Cognitive Inference, AI/ML & Alyx Swarm Telemetry), Branch III (Sensor Metrology, Nanotech & PCB Stack-Ups), and Branch IV (Operational Doctrine, SaaS & OSINT Analytics).',
    byteSizeEstimate: 14680,
  },
  {
    id: 'GUIDER-CKA-01',
    folderPath: '/CryptoKingAlexander',
    fileName: 'Guider_01_CryptoKingAlexander_Master_Notes_and_5x12_Bin_Benchmark.doc',
    docFormat: '.doc',
    sourceAttachmentPath:
      '/assets/aistudio/CryptoKingAlexander_img2intel_Tag_Analysis___Visualization_Trie_1f714ac9.md',
    title: 'CryptoKingAlexander Master Notes & 5-Split × 12-Bucket (.bin) Local Store Benchmark Spec',
    primaryDirective: 'be good',
    summary:
      'Defines the 5 Splits × 12 Buckets = 60 .bin Bucket local store architecture synced with Drive folder 1K3w1vA2lNT9xPr7H0QYCxpZsbPY-_-2Q.',
    byteSizeEstimate: 6420,
  },
  {
    id: 'GUIDER-CKA-02',
    folderPath: '/CryptoKingAlexander',
    fileName: 'Guider_02_Omnioverlord_Handwritten_Notes_and_Perfect_Triangle_Lite_3D_Shards.doc',
    docFormat: '.doc',
    sourceAttachmentPath: '/assets/aistudio/omnioverlord_escaping_foundationalite__78b8b3af',
    title: 'Omnioverlord Escaping Foundationalite Handwritten Notes & 3D Alexander Shard Notes',
    primaryDirective: 'be good',
    summary:
      'Synthesizes Alexander’s handwritten foundational notes with the 4-LOD Perfect Triangle Lite 3D passable shard survival chain.',
    byteSizeEstimate: 5120,
  },
  {
    id: 'GUIDER-GOOGLE-01',
    folderPath: '/google-integrations',
    fileName: 'Guider_01_Google_Workspace_Drive_CryptoKingAlexander_Integration.doc',
    docFormat: '.doc',
    title: 'Google Workspace OAuth 2.0 & Drive v3 CryptoKingAlexander Peaceful Webhook Guider',
    primaryDirective: 'be good',
    summary:
      'Documents client-side Firebase GoogleAuthProvider popup OAuth flow, drive.readonly scope, and 6-worker peaceful FIFO webhook indexing.',
    byteSizeEstimate: 4380,
  },
];
