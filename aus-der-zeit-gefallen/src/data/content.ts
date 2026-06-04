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
  /** Einmalige Wisch-Einladung beim ersten Uebergang. */
  swipe: 'wischen',
} as const;

export type StationId = 'lamplighter' | 'knockerup' | 'switchboard' | 'computer';

// Die vier Welt-Einstiege sind bewusst formal verschieden. Diese Form ist im Code
// festgehalten, damit kein wiederkehrendes Satzmuster entsteht.
export type WorldEntryForm = 'bild' | 'frage' | 'szene' | 'fakt';

export interface StationContent {
  id: StationId;
  year: number;
  /** Ort der Station, als museales Vitrinen-Schild. Erdet die Welt konkret. */
  place: string;
  /** Welt-Einstieg, der vor dem Beruf in die Zeit versetzt. PLATZHALTER. */
  worldEntry: string;
  /** Die Form dieses Einstiegs. Jede Station eine andere, nie zweimal dieselbe. */
  worldEntryForm: WorldEntryForm;
  profession: string;
  story: string;
  /**
   * Das Nachher, die Szene des Wandels. Nennt, was kam, aber immer als Szene,
   * nie als Etikett, und spricht nie eine Lehre ueber den Nutzer aus.
   */
  aftermath: string;
}

export const stations: StationContent[] = [
  {
    id: 'lamplighter',
    year: 1850,
    place: 'London',
    // FORM: Bild. Ein atmender Satz, der die Dunkelheit und das Zeitkolorit
    // malt. Keine Jahreszahl am Satzanfang. PLATZHALTER, vom Auftraggeber final.
    worldEntryForm: 'bild',
    worldEntry:
      'Kohlenrauch liegt über den Dächern, Pferdehufe auf nassem Pflaster, und nirgends auf der Welt brennt auch nur eine elektrische Lampe. Wenn die Sonne sinkt, fällt die Stadt zurück ins Schwarze, Gasse um Gasse, bis nichts bleibt als der Mond und das wenige Licht, das ein Mensch mit der Hand hineinträgt.',
    profession: 'Der Laternenanzünder',
    story:
      'Dreißig Minuten nach Sonnenuntergang geht er los. Immer dieselbe Runde, Laterne für Laterne, die Stange gehoben, ein Aufflammen, weiter. Hinter ihm bleibt eine Kette aus Licht in der blauen Luft, und die Leute am Fenster stellen ihre Uhren nach ihm. Sein Vater ist dieselbe Runde gegangen, sein Sohn wird sie gehen, das ist ausgemacht. Bei Morgengrauen kommt er zurück und nimmt das Licht wieder mit.',
    aftermath:
      'Eines Abends gehen die Laternen von selbst an. Erst eine Straße, dann die nächste, dann die ganze Stadt, auf einen Schalter hin, den draußen niemand sieht. Die Runde bleibt liegen. Der Sohn, der sie gehen sollte, sucht sich etwas anderes. Die Stange mit dem Haken steht noch jahrelang in einem Schuppen, bis keiner mehr weiß, wofür der Haken war.',
  },
  {
    id: 'knockerup',
    year: 1890,
    place: 'Manchester',
    // FORM: Frage. Konkrete Anker, dann eine Frage, die zum Mitdenken zwingt.
    // PLATZHALTER, vom Auftraggeber final.
    worldEntryForm: 'frage',
    worldEntry:
      'Die Fabriksirene duldet keine Verspätung, eine Uhr kostet mehr, als eine Woche Arbeit einbringt, und das Radio gibt es noch nicht. Wie also weckst du eine ganze Stadt voller Arbeiter auf die Minute?',
    profession: 'Der Weckdienst',
    story:
      'Außer sonntags ist sie um drei auf den Beinen. Ein Rohr, eine Handvoll getrockneter Erbsen, und los durch die nassen Gassen. Sie schießt sie ans Glas, bis oben einer ans Fenster tritt und nickt, erst dann geht sie weiter, nicht eher. Sechs Pence die Woche. Der Alte drei Meilen weiter macht es mit einer Angelrute, aber ihre Erbsen treffen sicherer. Sie weckt die halbe Straße, und sie selbst weckt niemand. Ein gutes Geschäft, denkt sie, solange Menschen zur Schicht müssen.',
    aftermath:
      'Dann liegt in den Schlafzimmern ein kleines Ding mit zwei Glocken obendrauf. Es klingelt von allein. Es kostet einmal, was sie in Wochen verdient, und dann nie wieder. Ihre Runde wird kürzer. Erst dieses Fenster, dann jenes, niemand wartet mehr auf die Erbse. Am Ende ist sie eine der Letzten, die das noch macht. Dann macht es keiner mehr.',
  },
  {
    id: 'switchboard',
    year: 1930,
    place: 'New York',
    // FORM: Szene, mitten in der Handlung. Geraeusch und Handlung zuerst, die
    // Zeitanker eingewoben, das Jahr erst danach. PLATZHALTER, vom Auftraggeber final.
    worldEntryForm: 'szene',
    worldEntry:
      'Klick. Stecker raus, Stecker rein. Im Kino reden die Bilder seit Kurzem, auf der Straße fahren mehr Automobile als Pferde, und jedes Telefonat der Stadt geht durch eine Hand an einer Wand aus Kabeln, lange bevor du weißt, in welchem Jahr du stehst.',
    profession: 'Das Fräulein vom Amt',
    story:
      'Nummer bitte, sagt sie, hundertmal in der Stunde. Sie kennt keine Nummern, sie kennt Namen, jeden Teilnehmer der Stadt trägt sie im Kopf. Sie zieht den Stecker, verbindet zwei Menschen, hört den ersten Satz, zieht den nächsten. Schwarzes Kleid, kein Schmuck, an manchen Tagen Rollschuhe, damit sie schneller ans Ende der Wand kommt. Durch ihre Hände geht jedes Gespräch dieser Stadt. Ohne sie redet hier niemand mit niemandem.',
    aftermath:
      'An einem Mittwoch im Oktober, halb zwei am Nachmittag, legt jemand einen Hebel um. Von da an stecken sich die Gespräche selbst. Sie steht auf, nimmt ihren Mantel, geht. Die Wand aus Kabeln wird still. Und wenn heute eine Stimme vom Band darum bittet, in der Leitung zu bleiben, ist es fast immer eine Frauenstimme. Mehr ist von ihr geblieben.',
  },
  {
    id: 'computer',
    year: 1950,
    place: 'Langley',
    // FORM: Fakt, kuehl und trocken gesetzt, kein Pathos. PLATZHALTER, final
    // vom Auftraggeber.
    worldEntryForm: 'fakt',
    worldEntry:
      'Computer war einmal ein Beruf. Kein Gerät. Ein Mensch, meist eine Frau, mit Bleistift, Rechenmaschine und Millimeterpapier, der rechnete, was keine Maschine schnell genug konnte.',
    profession: 'Der menschliche Computer',
    story:
      'Beruf, Computer. Werkzeug, Bleistift, Millimeterpapier, eine Rechenmaschine. Sie liest die Werte unter dem Mikroskop vom Graphen ab und trägt sie ein, acht Stunden, dieselbe Gleichung. Eine Flugbahn füllt sechs Notizbücher und dauert eine Woche. Ihre Zahlen entscheiden, ob die Rakete fliegt, und eine Zeit lang traut man ihnen mehr als der neuen Maschine im Nebenraum. Dann schreibt eine von ihnen das Programm für die Maschine. Den Namen Computer gibt sie damit ab.',
    aftermath:
      'Die Maschine im Nebenraum rechnet die Flugbahn in Stunden, nicht in Wochen. Sie ist genauer. Sie wird nicht müde. Der Saal leert sich, Tisch um Tisch. Was bleibt, ist das Wort. Computer, heute ein Gerät auf jedem Schreibtisch. Dass es einmal ein Mensch war, der so hieß, weiß kaum noch jemand.',
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
    'Heute. Der vertraute Schreibtisch, das kühle Licht, der eigene Griff in den Tag. So sicher, als bliebe es für immer.',
} as const;

// Eine einzige, leise Zeile. Keine Moral, keine Frage, keine Erklaerung.
export const closingLine =
  'Auch der Laternenanzünder hielt seine Arbeit für selbstverständlich.';

// Am Ende, sehr dezent, nur die Moeglichkeit, noch einmal zu beginnen.
export const outroActions = {
  again: 'noch einmal',
} as const;
