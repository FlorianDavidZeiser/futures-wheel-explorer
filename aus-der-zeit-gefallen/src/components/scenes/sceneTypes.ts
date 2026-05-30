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
}

// Gemeinsames Seitenverhaeltnis aller lebenden Bilder.
export const SCENE_VIEWBOX = '0 0 800 460';
