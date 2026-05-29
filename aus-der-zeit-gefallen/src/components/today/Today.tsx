import { motion } from 'framer-motion';
import { useExperience } from '../../state/ExperienceContext';
import { palettes } from '../../styles/palettes';
import { labels } from '../../data/content';
import { sceneVariants } from '../../styles/motionPresets';
import { StationLayout } from '../station/StationLayout';
import { Button } from '../ui/Button';
import { TodayScene } from '../scenes/TodayScene';

// Der Schnitt ins Heute. Bewusst gewoehnlich, ein Schreibtisch, ein Bildschirm,
// das kalte blaue Leuchten. Klar und unverfremdet, ohne Patina. Fuer einen
// Moment der sichere Endpunkt der Reise. Genau diese Sicherheit wird gleich
// genommen.
export function Today({ reduced }: { reduced: boolean }) {
  const { dispatch } = useExperience();
  const palette = palettes.today;

  return (
    <motion.div
      variants={sceneVariants(reduced)}
      initial="initial"
      animate="enter"
      exit="exit"
      className="w-full"
    >
      <StationLayout
        scene={<TodayScene palette={palette} reduced={reduced} />}
        patina={0}
        reduced={reduced}
      >
        <Button onClick={() => dispatch({ type: 'NEXT' })}>{labels.next}</Button>
      </StationLayout>
    </motion.div>
  );
}
