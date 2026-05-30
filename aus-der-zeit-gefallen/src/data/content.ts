// Alle Texte des Stuecks liegen woertlich hier.
//
// Diese Texte sind final. Der Wortlaut wurde nicht veraendert, nicht gekuerzt,
// nicht ergaenzt und nicht umformuliert. Wiederhergestellt wurde ausschliesslich
// die korrekte deutsche Orthografie (Umlaute und Eszett).
//
// Regel: keine langen Gedankenstriche. Im gesamten sichtbaren Text werden nur
// normale Bindestriche, Kommas und Punkte verwendet.

export const intro = {
  title: 'Aus der Zeit gefallen',
  // Zwei, drei ruhige Saetze, die nur die Tuer oeffnen. Kein Lehrbuch, keine
  // Aufzaehlung von Treibern. Etwas Leises, fast Literarisches.
  lead:
    'Manche Berufe waren einmal selbstverständlich. Jeden Tag gebraucht, dann über Nacht vergessen. Eine kurze Reise durch Arbeit, die es nicht mehr gibt.',
  question: 'Bevor wir beginnen, eine Frage. Was arbeitest du?',
  start: 'Beginnen',
} as const;

export type StationId = 'lamplighter' | 'knockerup' | 'switchboard' | 'computer';

export interface StationContent {
  id: StationId;
  year: number;
  profession: string;
  story: string;
}

export const stations: StationContent[] = [
  {
    id: 'lamplighter',
    year: 1850,
    profession: 'Der Laternenanzünder',
    story:
      'Dreißig Minuten nach Sonnenuntergang geht er los. Immer dieselbe Runde, Laterne für Laterne, die Stange gehoben, ein Aufflammen, weiter. Hinter ihm bleibt eine Kette aus Licht in der blauen Luft, und die Leute am Fenster stellen ihre Uhren nach ihm. Sein Vater ist dieselbe Runde gegangen, sein Sohn wird sie gehen, das ist ausgemacht. Bei Morgengrauen kommt er zurück und nimmt das Licht wieder mit.',
  },
  {
    id: 'knockerup',
    year: 1920,
    profession: 'Der Weckdienst',
    story:
      'Außer sonntags bin ich um drei auf den Beinen. Mein Rohr, eine Handvoll getrockneter Erbsen, und los durch die nassen Gassen. Ich schieße sie ans Glas, bis oben einer ans Fenster tritt und nickt, erst dann gehe ich weiter, nicht eher. Sechs Pence die Woche. Der Alte drei Meilen weiter macht es mit einer Angelrute, aber meine Erbsen treffen sicherer. Mich weckt keiner. Es ist ein gutes Geschäft, denke ich, solange Menschen zur Schicht müssen.',
  },
  {
    id: 'switchboard',
    year: 1930,
    profession: 'Das Fräulein vom Amt',
    story:
      'Nummer bitte, sagst du, hundertmal in der Stunde. Du kennst keine Nummern, du kennst Namen, jeden Teilnehmer der Stadt trägst du im Kopf. Du ziehst den Stecker, verbindest zwei Menschen, hörst den ersten Satz, ziehst den nächsten. Schwarzes Kleid, kein Schmuck, an manchen Tagen Rollschuhe, damit du schneller ans Ende der Wand kommst. Durch deine Hände geht jedes Gespräch dieser Stadt. Ohne dich redet hier niemand mit niemandem.',
  },
  {
    id: 'computer',
    year: 1950,
    profession: 'Der menschliche Computer',
    story:
      'Beruf, Computer. Werkzeug, Bleistift, Millimeterpapier, eine Rechenmaschine. Sie liest die Werte unter dem Mikroskop vom Graphen ab und trägt sie ein, acht Stunden, dieselbe Gleichung. Eine Flugbahn füllt sechs Notizbücher und dauert eine Woche. Ihre Zahlen entscheiden, ob die Rakete fliegt, und eine Zeit lang traut man ihnen mehr als der neuen Maschine im Nebenraum. Dann schreibt eine von ihnen das Programm für die Maschine. Den Namen Computer gibt sie damit ab.',
  },
];

export const today = {
  year: 2026,
} as const;

// Die fuenfte Station, der Nutzer selbst.
export const turn = {
  startYear: 2026,
  endYear: 2070,
  /** An der Stelle, wo bei den anderen die Andeutung stand, nur ein Fragezeichen. */
  mark: '?',
  /** Beruf, wenn der Nutzer nichts eingegeben hat. */
  fallbackProfession: 'dein Beruf',
} as const;

// Eine einzige, leise Zeile. Keine Moral, keine Frage, keine Erklaerung.
export const closingLine =
  'Auch der Laternenanzünder hielt seine Arbeit für selbstverständlich.';

// Die wenigen, kaum sichtbaren Moeglichkeiten am Ende.
export const outroActions = {
  again: 'noch einmal',
  share: 'teilen',
} as const;
