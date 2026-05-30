// Ein Atemzug zwischen den Zeiten. Ruhiger, fast leerer Scrollraum, in dem nur
// die hochlaufende Jahreszahl sichtbar ist und sonst Stille und Schwarzraum. Er
// trennt die Stationen hoerbar und gibt jeder ihr eigenes Gewicht.
export function Spacer({ height = '56vh' }: { height?: string }) {
  return <div aria-hidden style={{ height }} />;
}
