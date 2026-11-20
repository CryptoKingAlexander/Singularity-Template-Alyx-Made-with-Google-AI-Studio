import { NextRequest, NextResponse } from 'next/server';

const CRYPTO_KING_ALEXANDER_FOLDER_ID = '1K3w1vA2lNT9xPr7H0QYCxpZsbPY-_-2Q';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Missing or invalid Authorization Bearer token for Google Drive' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const folderId = searchParams.get('folderId') || CRYPTO_KING_ALEXANDER_FOLDER_ID;

  try {
    // 1. Fetch folder metadata
    const folderMetaUrl = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(
      folderId
    )}?fields=id,name,mimeType,webViewLink,modifiedTime&supportsAllDrives=true`;

    // 2. List files inside the folder
    const query = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
    const filesListUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&pageSize=50&fields=files(id,name,mimeType,size,modifiedTime,webViewLink,iconLink)&orderBy=modifiedTime desc&includeItemsFromAllDrives=true&supportsAllDrives=true`;

    const [folderRes, filesRes] = await Promise.all([
      fetch(folderMetaUrl, {
        headers: { Authorization: authHeader },
      }),
      fetch(filesListUrl, {
        headers: { Authorization: authHeader },
      }),
    ]);

    if (folderRes.status === 401 || filesRes.status === 401) {
      return NextResponse.json(
        { error: 'Google Drive session expired or unauthorized. Please sign in again.' },
        { status: 401 }
      );
    }

    const folderData = folderRes.ok
      ? await folderRes.json()
      : {
          id: folderId,
          name: 'CryptoKingAlexander',
          webViewLink: `https://drive.google.com/drive/folders/${folderId}`,
        };

    const filesData = filesRes.ok ? await filesRes.json() : { files: [] };

    return NextResponse.json({
      folder: {
        id: folderData.id || folderId,
        name: folderData.name || 'CryptoKingAlexander',
        webViewLink:
          folderData.webViewLink || `https://drive.google.com/drive/folders/${folderId}`,
        modifiedTime: folderData.modifiedTime || new Date().toISOString(),
      },
      files: Array.isArray(filesData.files) ? filesData.files : [],
      syncedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to query Google Drive folder';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
