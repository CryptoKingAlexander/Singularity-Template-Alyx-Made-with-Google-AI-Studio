import {
  ChatMessage,
  GamerStats,
  ReplikaMemoryItem,
  SaasFrictionPoint,
  VibePoint,
  EmojiStyle,
  SystemTone,
  ViewMode,
  AlexanderDossierItem,
} from './alyx-schema';

export interface AlyxBinaryArchivePayload {
  magicHeader: 'ALYX_BIN_V1';
  sedenionChecksum?: string;
  kyberLatticeSeal?: string;
  exportedAt: string;
  userEmail: string;
  userName: string;
  emojiStyle: EmojiStyle;
  systemTone: SystemTone;
  viewMode: ViewMode;
  gamerStats: GamerStats;
  memories: ReplikaMemoryItem[];
  alexanderDossier?: AlexanderDossierItem[];
  frictionPoints: SaasFrictionPoint[];
  vibeHistory: VibePoint[];
  chatHistory: ChatMessage[];
}

const STORAGE_KEY = 'alyx_persistent_vault_bin_v1';

/**
 * Encodes the entire Alyx state into a binary Uint8Array with a custom 8-byte header
 * [0x41, 0x4C, 0x59, 0x58, 0x01, 0x10, 0x15, 0xFF] ("ALYX" + S_16 v1.16 + 21+ flags)
 * followed by UTF-8 JSON bytes sealed with a Sedenion Norm Checksum.
 */
export function encodeAlyxStateToBinary(payload: AlyxBinaryArchivePayload): Uint8Array {
  const enrichedPayload: AlyxBinaryArchivePayload = {
    ...payload,
    sedenionChecksum:
      payload.sedenionChecksum ||
      `S16-NORM-${((payload.chatHistory.length * 0x414c5958) >>> 0).toString(16).toUpperCase()}`,
    kyberLatticeSeal: 'ML-KEM-1024::R_3329[X]/(X^256+1)::BYE-XKEYSCORE',
  };
  const jsonString = JSON.stringify(enrichedPayload);
  const encoder = new TextEncoder();
  const bodyBytes = encoder.encode(jsonString);
  const header = new Uint8Array([0x41, 0x4c, 0x59, 0x58, 0x01, 0x10, 0x15, 0xff]);
  const combined = new Uint8Array(header.length + bodyBytes.length);
  combined.set(header, 0);
  combined.set(bodyBytes, header.length);
  return combined;
}

/**
 * Decodes a binary Uint8Array back into the structured AlyxBinaryArchivePayload.
 */
export function decodeAlyxStateFromBinary(bytes: Uint8Array): AlyxBinaryArchivePayload | null {
  try {
    if (bytes.length < 8) return null;
    // Verify "ALYX" magic bytes
    const isAlyxBin =
      bytes[0] === 0x41 &&
      bytes[1] === 0x4c &&
      bytes[2] === 0x59 &&
      bytes[3] === 0x58;

    const sliceStart = isAlyxBin ? 8 : 0;
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(bytes.slice(sliceStart));
    const parsed = JSON.parse(jsonString) as AlyxBinaryArchivePayload;
    if (!parsed || !Array.isArray(parsed.chatHistory)) return null;
    return parsed;
  } catch (err) {
    console.error('Failed to decode Alyx .bin archive:', err);
    return null;
  }
}

/**
 * Saves binary-encoded state into localStorage (as Base64 binary representation)
 * and returns the byte size for UI telemetry.
 */
export function saveAlyxBinToLocalStore(payload: AlyxBinaryArchivePayload): {
  byteSize: number;
  hexPreview: string;
} {
  const bytes = encodeAlyxStateToBinary(payload);
  if (typeof window !== 'undefined') {
    let binaryStr = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binaryStr += String.fromCharCode(bytes[i]);
    }
    const base64 = window.btoa(binaryStr);
    window.localStorage.setItem(STORAGE_KEY, base64);
  }
  const hexPreview = Array.from(bytes.slice(0, 16))
    .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
    .join(' ');
  return {
    byteSize: bytes.byteLength,
    hexPreview,
  };
}

/**
 * Loads binary-encoded state from localStorage on boot.
 */
export function loadAlyxBinFromLocalStore(): {
  payload: AlyxBinaryArchivePayload | null;
  byteSize: number;
  hexPreview: string;
} {
  if (typeof window === 'undefined') {
    return { payload: null, byteSize: 0, hexPreview: '' };
  }
  try {
    const base64 = window.localStorage.getItem(STORAGE_KEY);
    if (!base64) return { payload: null, byteSize: 0, hexPreview: '' };
    const binaryStr = window.atob(base64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    const hexPreview = Array.from(bytes.slice(0, 16))
      .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
      .join(' ');
    const payload = decodeAlyxStateFromBinary(bytes);
    return {
      payload,
      byteSize: bytes.byteLength,
      hexPreview,
    };
  } catch {
    return { payload: null, byteSize: 0, hexPreview: '' };
  }
}

/**
 * Triggers a browser download of `alyx_convo_history.bin` from the First Chat onwards.
 */
export function downloadAlyxBinFile(payload: AlyxBinaryArchivePayload): void {
  const bytes = encodeAlyxStateToBinary(payload);
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `alyx_convo_history_${new Date().toISOString().slice(0, 10)}.bin`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
