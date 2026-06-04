import { stations, type StationId } from './data/content';
import type { LookId } from './styles/palettes';
import type { Beat } from './components/screen/StationScreen';

// Die flache Abfolge der Screens, von links nach rechts, von der Vergangenheit in
// die Zukunft. Jeder Screen ist eine abgeschlossene Einheit, kein Scrollfeld.
export type Screen =
  | { kind: 'introA'; year: null; look: LookId }
  | { kind: 'introB'; year: null; look: LookId }
  | { kind: 'beat'; year: number; look: LookId; stationId: StationId; beat: Beat }
  | {
      kind: 'silhouette';
      year: number;
      look: LookId;
      patina: number;
      showToday: boolean;
      showClosing: boolean;
    };

const BEATS: Beat[] = ['welt', 'story', 'nachher'];

function build(): Screen[] {
  const out: Screen[] = [];
  out.push({ kind: 'introA', year: null, look: 'intro' });
  out.push({ kind: 'introB', year: null, look: 'intro' });

  for (const s of stations) {
    for (const b of BEATS) {
      out.push({ kind: 'beat', year: s.year, look: s.id, stationId: s.id, beat: b });
    }
  }

  // Die Heute-Station.
  out.push({ kind: 'silhouette', year: 2026, look: 'today', patina: 0, showToday: true, showClosing: false });

  // Die Wendung, die Jahreszahl laeuft weiter, die Patina legt sich.
  const wendung = [
    { year: 2030, patina: 0.22 },
    { year: 2035, patina: 0.42 },
    { year: 2045, patina: 0.62 },
    { year: 2060, patina: 0.82 },
  ];
  for (const w of wendung) {
    out.push({ kind: 'silhouette', year: w.year, look: 'today', patina: w.patina, showToday: false, showClosing: false });
  }

  // Bei 2070 haelt die Zahl, die Patina liegt voll, dann der Ausklang.
  out.push({ kind: 'silhouette', year: 2070, look: 'today', patina: 1, showToday: false, showClosing: true });

  return out;
}

export const screens: Screen[] = build();
