// Alle Texte des Stuecks liegen woertlich hier.
//
// Die Geschichtstexte sind final und werden nicht veraendert. Wiederhergestellt
// wurde nur die korrekte Orthografie. Die Welt-Einstiege und die Heute-Zeile sind
// PLATZHALTER, die der Auftraggeber final selbst schreibt. Sie stehen hier, damit
// die Struktur steht und die vier Einstiege formal sichtbar verschieden sind.
//
// Regel: keine langen Gedankenstriche. Nur Bindestriche, Kommas, Punkte.

export const intro = {
  title: 'Aus der Zeit gefallen',
  lead:
    'Manche Berufe waren einmal selbstverständlich. Jeden Tag gebraucht, dann über Nacht vergessen. Eine kurze Reise durch Arbeit, die es nicht mehr gibt.',
  question: 'Eine Frage vorab. Was arbeitest du gerade?',
  start: 'Beginnen',
  /** Sehr dezenter Hinweis am Ende von Screen A, um selbst weiterzugehen. */
  forward: 'weiter',
} as const;

export type StationId = 'lamplighter' | 'knockerup' | 'switchboard' | 'computer';

// Die vier Welt-Einstiege sind bewusst formal verschieden. Diese Form ist im Code
// festgehalten, damit kein wiederkehrendes Satzmuster entsteht.
export type WorldEntryForm = 'bild' | 'frage' | 'szene' | 'fakt';

export interface StationContent {
  id: StationId;
  year: number;
  /** Welt-Einstieg, der vor dem Beruf in die Zeit versetzt. PLATZHALTER. */
  worldEntry: string;
  /** Die Form dieses Einstiegs. Jede Station eine andere, nie zweimal dieselbe. */
  worldEntryForm: WorldEntryForm;
  profession: string;
  story: string;
}

export const stations: StationContent[] = [
  {
    id: 'lamplighter',
    year: 1850,
    // FORM: Bild. Ein langer, atmender Satz, der die Dunkelheit malt. Keine
    // Jahreszahl am Satzanfang. PLATZHALTER, vom Auftraggeber zu ersetzen.
    worldEntryForm: 'bild',
    worldEntry:
      'Wenn die Sonne sinkt, fällt die Stadt zurück ins Schwarze, Gasse um Gasse, Fenster um Fenster, bis nichts mehr bleibt als der Mond und das wenige Licht, das ein Mensch mit der Hand hineinträgt.',
    profession: 'Der Laternenanzünder',
    story:
      'Dreißig Minuten nach Sonnenuntergang geht er los. Immer dieselbe Runde, Laterne für Laterne, die Stange gehoben, ein Aufflammen, weiter. Hinter ihm bleibt eine Kette aus Licht in der blauen Luft, und die Leute am Fenster stellen ihre Uhren nach ihm. Sein Vater ist dieselbe Runde gegangen, sein Sohn wird sie gehen, das ist ausgemacht. Bei Morgengrauen kommt er zurück und nimmt das Licht wieder mit.',
  },
  {
    id: 'knockerup',
    year: 1920,
    // FORM: Frage. Zwingt zum Mitdenken, statt aufzuzaehlen. PLATZHALTER.
    worldEntryForm: 'frage',
    worldEntry:
      'Wie weckst du eine ganze Stadt voller Arbeiter auf die Minute, wenn kaum einer eine Uhr besitzt und das verschlossene Fabriktor den Tageslohn kostet?',
    profession: 'Der Weckdienst',
    story:
      'Außer sonntags bin ich um drei auf den Beinen. Mein Rohr, eine Handvoll getrockneter Erbsen, und los durch die nassen Gassen. Ich schieße sie ans Glas, bis oben einer ans Fenster tritt und nickt, erst dann gehe ich weiter, nicht eher. Sechs Pence die Woche. Der Alte drei Meilen weiter macht es mit einer Angelrute, aber meine Erbsen treffen sicherer. Mich weckt keiner. Es ist ein gutes Geschäft, denke ich, solange Menschen zur Schicht müssen.',
  },
  {
    id: 'switchboard',
    year: 1930,
    // FORM: Szene, mitten in der Handlung. Geraeusch, Stimme, Handlung zuerst,
    // die Zeit erst danach. Kurze Saetze. PLATZHALTER.
    worldEntryForm: 'szene',
    worldEntry:
      'Klick. Stecker raus, Stecker rein. Nummer bitte. Eine Hand fährt über die Wand aus Kabeln, lange bevor du weißt, in welchem Jahr du stehst.',
    profession: 'Das Fräulein vom Amt',
    story:
      'Nummer bitte, sagst du, hundertmal in der Stunde. Du kennst keine Nummern, du kennst Namen, jeden Teilnehmer der Stadt trägst du im Kopf. Du ziehst den Stecker, verbindest zwei Menschen, hörst den ersten Satz, ziehst den nächsten. Schwarzes Kleid, kein Schmuck, an manchen Tagen Rollschuhe, damit du schneller ans Ende der Wand kommst. Durch deine Hände geht jedes Gespräch dieser Stadt. Ohne dich redet hier niemand mit niemandem.',
  },
  {
    id: 'computer',
    year: 1950,
    // FORM: Fakt, kuehl und trocken gesetzt, kurze Saetze, kein Pathos.
    // PLATZHALTER.
    worldEntryForm: 'fakt',
    worldEntry:
      'Computer war einmal ein Beruf. Kein Gerät. Ein Mensch, der rechnete, acht Stunden am Tag, mit der Hand.',
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
  // Das Hochlaufen geschieht in Schritten, erst klein, dann beschleunigend. Die
  // Stops sind die Scroll-Fortschritte, an denen das jeweilige Jahr greift, mit
  // abnehmendem Abstand, damit die Zeit spuerbar schneller wird.
  // Jeder Schritt bekommt Verweilzeit. Die Abstaende nehmen ab, erst zoegerlich,
  // dann beschleunigt die Zeit unter den Fuessen. 2070 ist bei 0.8 erreicht,
  // danach ein Halt mit Stille, bevor die Schlusszeile erscheint.
  sequence: [2026, 2030, 2035, 2045, 2060, 2070],
  stepStops: [0, 0.22, 0.42, 0.58, 0.7, 0.8],
  /** An der Stelle, wo bei den anderen die Andeutung stand, nur ein Fragezeichen. */
  mark: '?',
  /** Beruf, wenn der Nutzer nichts eingegeben hat. */
  fallbackProfession: 'dein Beruf',
  // Die Heute-Zeile an der Stelle des Welt-Einstiegs der fuenften Station. Sie
  // laesst das Heute genauso selbstverstaendlich erscheinen wie den anderen ihre
  // Zeit. Angedeutet, nie als Lehre. PLATZHALTER, vom Auftraggeber zu schreiben.
  todayLine:
    'Heute. Der vertraute Schreibtisch, das kühle Licht, der eigene Griff in den Tag. So selbstverständlich, als bliebe es für immer.',
} as const;

// Eine einzige, leise Zeile. Keine Moral, keine Frage, keine Erklaerung.
export const closingLine =
  'Auch der Laternenanzünder hielt seine Arbeit für selbstverständlich.';

// Am Ende, sehr dezent, nur die Moeglichkeit, noch einmal zu beginnen.
export const outroActions = {
  again: 'noch einmal',
} as const;
