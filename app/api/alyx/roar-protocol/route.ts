import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import {
  FullStackBoostLevel,
  ROAR_SOURCE_HTML_PUBLIC_URL,
  RoarPipelineMode,
  parseRoarSourceHtmlTo135Items,
  runRoarModePipeline,
} from '@/lib/roar-protocol-source-engine';

const SPILLED_HTML_ABS_PATH = path.join(
  process.cwd(),
  'public',
  'roar-protocol',
  'Alyx_ROAR_Protocol_DaddyAlexander_Source.html'
);

export async function GET(req: NextRequest) {
  try {
    const rawHtml = await fs.readFile(SPILLED_HTML_ABS_PATH, 'utf8');
    const url = req.nextUrl;

    // Direct raw HTML mode so worker swarms & curl scripts can pull raw HTML via API too
    if (url.searchParams.get('raw') === 'true') {
      return new NextResponse(rawHtml, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
          'X-Alyx-Roar-Source': ROAR_SOURCE_HTML_PUBLIC_URL,
        },
      });
    }

    const allItems = parseRoarSourceHtmlTo135Items(rawHtml);
    const domainFilter = (url.searchParams.get('domain') || 'ALL').toUpperCase();
    const tierFilter = (url.searchParams.get('tier') || 'ALL').toUpperCase();
    const modeParam = (url.searchParams.get('mode') || 'mode1').toLowerCase();
    const boostParam = Number(url.searchParams.get('boost') || '3');

    const boostLevel: FullStackBoostLevel =
      boostParam === 1 ? 1 : boostParam === 2 ? 2 : 3;
    const mode: RoarPipelineMode = modeParam === 'mode2' ? 'mode2' : 'mode1';

    const filteredItems = allItems
      .filter((it) => {
        if (domainFilter !== 'ALL' && it.category !== domainFilter) return false;
        if (tierFilter !== 'ALL' && it.tier !== tierFilter) return false;
        return true;
      })
      .sort((a, b) => b.p - a.p || a.id.localeCompare(b.id));

    const kpiCounts = {
      total: allItems.length,
      critical: allItems.filter((it) => it.tier === 'CRITICAL').length,
      high: allItems.filter((it) => it.tier === 'HIGH').length,
      medium: allItems.filter((it) => it.tier === 'MEDIUM').length,
      standard: allItems.filter((it) => it.tier === 'STANDARD').length,
    };

    const modePipeline = runRoarModePipeline(allItems, mode, boostLevel);

    return NextResponse.json(
      {
        sourceHtmlUrl: ROAR_SOURCE_HTML_PUBLIC_URL,
        sourceHtmlBytes: Buffer.byteLength(rawHtml, 'utf8'),
        parsedCount: allItems.length,
        filteredCount: filteredItems.length,
        kpiCounts,
        modePipeline,
        items: filteredItems,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unable to read spilled ROAR HTML source';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
