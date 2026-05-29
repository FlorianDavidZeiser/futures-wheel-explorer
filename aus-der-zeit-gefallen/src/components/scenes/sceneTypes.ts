import type { Palette } from '../../styles/palettes';

export interface SceneProps {
  palette: Palette;
  /** Bei Reduced Motion ruhen alle Schleifen, das Bild bleibt still. */
  reduced: boolean;
}

// Gemeinsames Seitenverhaeltnis aller lebenden Bilder.
export const SCENE_VIEWBOX = '0 0 800 460';
