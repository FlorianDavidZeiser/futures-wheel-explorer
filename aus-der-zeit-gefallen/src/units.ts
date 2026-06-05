import { palettes, type LookId } from './styles/palettes';
import { stations, type StationId } from './data/content';

// Die Reise als Folge von Units, jede an EINEM Ort. Eine Station ist eine Unit
// mit drei Beats, die sich an Ort und Stelle entfalten. Der Wechsel zwischen
// Beats ist der kleine Uebergang, der Wechsel zwischen Units der grosse.
export interface Unit {
  key: string;
  kind: 'introA' | 'introB' | 'station' | 'silhouette';
  /** Feste Jahreszahl der Unit. Bei der Heute-Unit der Startwert, von dem aus die
   *  Zeit im letzten Beat weiterlaeuft. */
  year: number | null;
  look: LookId;
  /** Museale Patina der Station. Bei der Heute-Unit treibt sie der Schluss-Lauf. */
  patina: number;
  /** Zahl der Beats, die sich an diesem Ort nacheinander zeigen. */
  beatCount: number;
  stationId?: StationId;
  /** Die Heute-Unit, der Nutzer selbst. Beat 0 Heute, Beat 1 der eigene Beruf,
   *  Beat 2 das fliessende Hochlaufen der Zeit bis 2070 mit Schlusszeile. */
  isHeute?: boolean;
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

  // Die Heute-Station, der Nutzer selbst. Drei Beats: Heute, der eigene Beruf,
  // und dann, im selben Bild, das Hochlaufen der Zeit bis 2070 mit der
  // Schlusszeile. Kein weiterer Screen danach.
  out.push({ key: 'heute', kind: 'silhouette', year: 2026, look: 'today', patina: 0, beatCount: 3, isHeute: true });

  return out;
}

export const units: Unit[] = build();

// Der Schluss-Lauf der Jahreszahl im letzten Beat der Heute-Unit.
export const RUN = {
  startYear: 2026,
  endYear: 2070,
} as const;
