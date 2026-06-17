// Alle Texte des Stuecks liegen woertlich hier. Finale Fassung (V9).
//
// Jeder Welt-Einstieg benennt das Problem der Zeit, jeder in eigener Form (Bild,
// Frage, Szene, Fakt). Alle Geschichten in dritter Person. Der 2026-Text ist
// bewusst universell und spricht keine Lehre aus.
//
// Regel: Gedankenstriche aeusserst sparsam. Genau einer im ganzen Stueck, bewusst
// gesetzt (Langley, "das rechnet - ausser Menschen"). Sonst nur Bindestriche,
// Kommas, Punkte. Einer ist gut, zehn sind schlecht.

export const intro = {
  title: 'Aus der Zeit gefallen',
  /** Das Eroeffnungszitat, kleiner und kursiv unter dem Titel. */
  quote: 'Alles fließt.',
  lead:
    'Nichts bleibt, wie es war. Was heute selbstverständlich ist, war gestern undenkbar. Und ist morgen vergessen.',
  question: 'Als was arbeitest du gerade?',
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
      'Kohlenrauch hängt über den Dächern. Pferdehufe klackern auf nassem Pflaster. Und nirgends auf der Welt brennt auch nur eine elektrische Lampe. Wenn die Sonne sinkt, fällt die Stadt zurück ins Schwarze. Gasse um Gasse. Bis nichts mehr bleibt. Nur der Mondschein. Wer Licht will, muss es tragen.',
    profession: 'Der Anzünder',
    story:
      'Dreißig Minuten nach Sonnenuntergang geht er los. Immer dieselbe Runde. Laterne für Laterne, die Stange gehoben, ein Zischen, ein Aufflammen, weiter. Hinter ihm glüht eine Kette aus Licht in der blauen Luft, und die Leute am Fenster stellen ihre Uhren nach ihm. Sein Vater ist die Runde gegangen. Er geht die Runde. Sein Sohn wird die Runde gehen. Das ist ausgemacht. Im Morgengrauen kehrt er zurück und löscht das Licht wieder, eine Lampe nach der anderen.',
    aftermath:
      'Nach und nach gehen die Laternen von selbst an. Erst eine Straße, dann die nächste, dann die ganze Stadt. Auf einen Schalter hin, den draußen niemand sieht. Die Runde bleibt liegen. Der Sohn, der sie gehen sollte, sucht sich etwas anderes. Die Stange mit dem Haken lehnt noch jahrelang in einem Schuppen. Bis keiner mehr weiß, wofür der Haken war.',
  },
  {
    id: 'knockerup',
    year: 1890,
    place: 'Manchester',
    // FORM: Frage. Konkrete Anker, dann eine Frage, die zum Mitdenken zwingt.
    // PLATZHALTER, vom Auftraggeber final.
    worldEntryForm: 'frage',
    worldEntry:
      'Die Fabriksirene heult über die Dächer und duldet keine Verspätung. Eine Uhr kostet mehr, als eine Woche Arbeit einbringt. Das Radio gibt es noch nicht. Wie also weckt man eine ganze Stadt voller Arbeiter auf die Minute?',
    profession: 'Der Weckdienst',
    story:
      'Mit einem Rohr und einer Handvoll getrockneter Erbsen geht sie durch die nassen Gassen. Sie schießt sie ans Glas, dass es klackt, bis oben einer ans Fenster tritt und nickt. Erst dann geht sie weiter, nicht eher. Sechs Pence die Woche. Ein alter Mann drei Meilen weiter macht es mit einer Angelrute. Ihre Erbsen aber treffen sicherer. Sie weckt die halbe Stadt. Ein gutes Geschäft, denkt sie, solange Menschen zur Schicht müssen.',
    aftermath:
      'Auf einmal steht in den Schlafzimmern ein kleines Ding mit zwei Glocken obendrauf. Es rasselt von allein. Es kostet einmal, was sie in Wochen verdient. Und kostet dann nie wieder. Ihre Runde wird kürzer. Erst dieses Fenster, dann jenes. Niemand wartet mehr auf die Erbse. Am Ende ist sie eine der Letzten. Bis dann niemand mehr morgens weckend durch die Gassen geht.',
  },
  {
    id: 'switchboard',
    year: 1930,
    place: 'New York',
    // FORM: Szene, mitten in der Handlung. Geraeusch und Handlung zuerst, die
    // Zeitanker eingewoben, das Jahr erst danach. PLATZHALTER, vom Auftraggeber final.
    worldEntryForm: 'szene',
    worldEntry:
      'In den Wohnungen hängt ein neues Gerät an der Wand, aus Holz und Bakelit. Wer hineinspricht, der kann eine Stimme vom anderen Ende der Stadt hören. Ein Wunder, das sich rasend verbreitet. Nur eines kann das Wunder nicht. Zwei Leitungen finden nie von allein zueinander.',
    profession: 'Das Fräulein vom Amt',
    story:
      'Nummer bitte, sagt sie, hundertmal in der Stunde. Sie kennt keine Nummern, sie kennt Namen. Sie zieht den Stecker, sie verbindet zwei Menschen, sie hört den ersten Satz, sie zieht den nächsten. Schwarzes Kleid, kein Schmuck, an manchen Tagen rollt sie auf Rollschuhen ans Ende der Wand, damit es schneller geht. Durch ihre Hände läuft jedes Gespräch der Stadt. Ohne sie redet niemand mit niemandem.',
    aftermath:
      'An einem Mittwoch im Oktober, um halb zwei am Nachmittag, legt jemand einen Hebel um. Von da an stecken sich die Gespräche selbst. Sie steht auf, nimmt ihren Mantel, geht. Die Wand aus Kabeln verstummt. Und wenn heute eine Stimme vom Band darum bittet, in der Leitung zu bleiben, ist es fast immer eine Frauenstimme. Mehr ist von ihr nicht geblieben.',
  },
  {
    id: 'computer',
    year: 1958,
    place: 'Langley',
    // FORM: Fakt, kuehl und trocken gesetzt, kein Pathos. PLATZHALTER, final
    // vom Auftraggeber.
    worldEntryForm: 'fakt',
    worldEntry:
      'Die Welt nach dem Krieg rechnet sich in die Zukunft. Düsenflugzeuge, Staudämme, die Sterne zum Greifen nah. Dabei will jede Brücke, jede Tragfläche und jede Flugbahn exakt und auf viele Stellen genau berechnet sein. Und es gibt nichts auf der Welt, das rechnet – außer Menschen.',
    profession: 'Der menschliche Computer',
    story:
      'Beruf: Computer. Werkzeug: Bleistift, Millimeterpapier und eine Rechenmaschine. Sie liest die Werte unter dem Mikroskop vom Graphen ab und trägt sie ein. Acht Stunden. Dieselbe Gleichung. Eine Flugbahn füllt sechs Notizbücher und dauert eine Woche. Ihre Zahlen entscheiden, ob eine Rakete fliegt oder nicht.',
    aftermath:
      'Eine von ihnen schreibt das Programm für die Maschine im Nebenraum. Die Maschine rechnet die Flugbahn in Stunden, nicht in Wochen. Sie ist genauer. Sie wird nicht müde. Sie hält nie inne. Der Saal leert sich, Tisch um Tisch. Der Beruf verschwindet. Was bleibt, ist das Wort. Computer ist heute ein Gerät auf jedem Schreibtisch. Dass es einmal ein Mensch war, der so hieß, weiß kaum noch jemand.',
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
  fallbackProfession: 'deine Arbeit',
  // Die Heute-Zeile an der Stelle des Welt-Einstiegs der fuenften Station. Bewusst
  // universell, kein Berufsbild, benennt nur das Gefuehl der Selbstverstaendlichkeit.
  // Spricht keine Lehre aus, die Verbindung stellt die Struktur her, nicht der Text.
  todayLine:
    'Und heute. Deine Arbeit. Sie fühlt sich an, als wäre sie immer da gewesen. Als bliebe sie für immer.',
} as const;

// Eine einzige, leise Zeile. Keine Moral, keine Frage, keine Erklaerung.
export const closingLine =
  'Auch der Laternenanzünder hielt seine Arbeit für selbstverständlich.';

// Am Ende, sehr dezent, nur die Moeglichkeit, noch einmal zu beginnen.
export const outroActions = {
  again: 'noch einmal',
} as const;

// Der Epilog, der echte letzte Akkord. Beobachtet und fragt, doziert nie. Die
// Frage am Ende bleibt offen stehen, kein Eingabefeld, kein Call to Action.
export const epilog = {
  intro: 'Vier Berufe. Jeder bestand aus einer einzigen Tätigkeit.',
  // Die Verben einzeln, damit sie nacheinander einblenden, die langsamste Zeile.
  verbs: ['Anzünden.', 'Wecken.', 'Verbinden.', 'Rechnen.'],
  middle: 'Als die eine Tätigkeit ersetzbar wurde, endete der Beruf.',
  question: 'Woraus besteht deine Arbeit?',
} as const;

// Die mitwandernden Ueberschriften erzaehlen schon den Dreischritt: Welt (Ort und
// Jahr), Mensch (der Beruf), Wandel (ein knappes Wort, das das Verschwinden nur
// leise andeutet, nie erklaert, was abloeste).
export const headings = {
  /** Beat 3, der Wandel. Deutet leise auf das Danach. */
  change: 'Danach',
  /** Welt-Beat der Heute-Station. */
  today: 'Heute',
} as const;

