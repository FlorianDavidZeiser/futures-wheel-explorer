import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { reducer, initialState, type Action, type ExperienceState } from './reducer';

interface ContextValue {
  state: ExperienceState;
  dispatch: React.Dispatch<Action>;
}

const ExperienceContext = createContext<ContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ExperienceContext.Provider value={{ state, dispatch }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience(): ContextValue {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error('useExperience muss innerhalb von ExperienceProvider verwendet werden.');
  }
  return ctx;
}
