import { palettes, type LookId } from './styles/palettes';
import { stations, type StationId } from './data/content';

// Die Reise als Folge von Units, jede an EINEM Ort. Eine Station ist eine Unit
// mit drei Beats, die sich an Ort und Stelle entfalten. Der Wechsel zwischen
// Beats ist der kleine Uebergang, der Wechsel zwischen Units der grosse.
export interface Unit {
  key: string;
  kind: 'introA' | 'introB' | 'station' | 'silhouette';
  /** Feste Jahreszahl der Unit, konstant ueber ihre Beats. */
  year: number | null;
  look: LookId;
  /** Museale Patina, konstant innerhalb der Unit. */
  patina: number;
  /** Zahl der Beats, die sich an diesem Ort nacheinander zeigen. */
  beatCount: number;
  stationId?: StationId;
  /** Heute-Unit, entfaltet sich in drei Beats wie eine Station. */
  isHeute?: boolean;
  /** Ausklang, zeigt nach einer Stille die Schlusszeile und noch einmal. */
  showClosing?: boolean;
}

function build(): Unit[] {
  const out: Unit[] = [];
  out.push({ key: 'introA', kind: 'introA', year: null, look: 'intro', patina: 0, beatCount: 1 });
  out.push({ key: 'introB', kind: 'introB', year: null, look: 'intro', patina: 0, beatCount: 1 });

  for (const s of stations) {
    out.push({
      key: s.id,
      kind: 'station',
      year: s.year,
      look: s.id,
      patina: palettes[s.id].patinaBase,
      beatCount: 3,
      stationId: s.id,
    });
  }

  // Die Heute-Station, gleicher Drei-Beat-Rahmen.
  out.push({ key: 'heute', kind: 'silhouette', year: 2026, look: 'today', patina: 0, beatCount: 3, isHeute: true });

  // Die Wendung, jeder Schritt ein grosser Uebergang, Jahr und Patina steigen.
  const wendung = [
    { year: 2030, patina: 0.22 },
    { year: 2035, patina: 0.42 },
    { year: 2045, patina: 0.62 },
    { year: 2060, patina: 0.82 },
  ];
  for (const w of wendung) {
    out.push({ key: `w${w.year}`, kind: 'silhouette', year: w.year, look: 'today', patina: w.patina, beatCount: 1 });
  }

  // Bei 2070 Halt, dann der Ausklang.
  out.push({ key: 'ausklang', kind: 'silhouette', year: 2070, look: 'today', patina: 1, beatCount: 1, showClosing: true });

  return out;
}

export const units: Unit[] = build();
