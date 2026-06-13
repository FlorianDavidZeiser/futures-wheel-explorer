import type { ReactNode } from 'react';

// Ein Textbereich, der dank des oberen-Drittel-Layouts fast immer ganz auf den
// Schirm passt. Falls auf einem sehr kleinen Geraet doch etwas ueberlaeuft,
// scrollt der Bereich still, ohne Pfeil und ohne sichtbaren Verlauf.
export function ScrollText({ children, maxHeight }: { children: ReactNode; maxHeight: string }) {
  return (
    <div
      data-scroll
      className="no-scrollbar flex w-full flex-col items-center"
      style={{ maxHeight, overflowY: 'auto' }}
    >
      {children}
    </div>
  );
}
