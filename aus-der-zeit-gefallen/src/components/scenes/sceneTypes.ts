import type { Palette } from '../../styles/palettes';

export interface SceneProps {
  palette: Palette;
  /** Bei Reduced Motion ruhen alle Schleifen, das Bild bleibt still. */
  reduced: boolean;
  /**
   * Ob die Station erreicht ist. Die eine ruhige Bewegung der Szene startet
   * erst dann, nicht vorher. Standard true.
   */
  active?: boolean;
  /**
   * Der aktuelle Beat (0 Welt, 1 Mensch, 2 Wandel). Bei Beat 2 altert die Szene
   * sichtbar mit und erzaehlt den Wandel, nicht nur der Text.
   */
  beat?: number;
}

// Gemeinsames Seitenverhaeltnis aller lebenden Bilder.
export const SCENE_VIEWBOX = '0 0 800 460';
