// Schlanker State. Das Stueck ist linear, der Zustand ist klein.
//
// Im Wesentlichen der eingegebene Beruf und die aktuelle Position im Ablauf.

import { stations, today, turn } from '../data/content';

export type Phase = 'intro' | 'stations' | 'today' | 'turn' | 'outro';

export interface ExperienceState {
  /** Vom Nutzer eingegeben, kann leer sein. */
  profession: string;
  /** Position innerhalb der historischen Stationen, 0 bis 3. */
  step: number;
  /** Die aktuell angezeigte Jahreszahl. */
  currentYear: number;
  phase: Phase;
}

export const initialState: ExperienceState = {
  profession: '',
  step: 0,
  currentYear: stations[0].year,
  phase: 'intro',
};

export type Action =
  | { type: 'BEGIN'; profession: string }
  | { type: 'NEXT' }
  | { type: 'CONCLUDE' }
  | { type: 'RESET' };

export function reducer(state: ExperienceState, action: Action): ExperienceState {
  switch (action.type) {
    case 'BEGIN':
      // Der Gang beginnt bei der ersten historischen Station.
      return {
        ...state,
        profession: action.profession.trim(),
        phase: 'stations',
        step: 0,
        currentYear: stations[0].year,
      };

    case 'NEXT': {
      // Vorwaerts, immer nur vorwaerts. Die Zeit laeuft in eine Richtung.
      if (state.phase === 'stations') {
        const nextStep = state.step + 1;
        if (nextStep < stations.length) {
          return { ...state, step: nextStep, currentYear: stations[nextStep].year };
        }
        // Nach der vierten Station traegt die Jahreszahl in die Gegenwart.
        return { ...state, phase: 'today', currentYear: today.year };
      }
      if (state.phase === 'today') {
        // In die Wendung. Ab hier gibt es keinen Knopf mehr,
        // die Zeit laeuft von selbst weiter.
        return { ...state, phase: 'turn', currentYear: turn.startYear };
      }
      return state;
    }

    case 'CONCLUDE':
      // Die Jahreszahl ist bei 2070 zur Ruhe gekommen, die Patina liegt.
      return { ...state, phase: 'outro', currentYear: turn.endYear };

    case 'RESET':
      // Noch einmal, von vorn.
      return { ...initialState };

    default:
      return state;
  }
}
