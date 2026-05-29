import { motion } from 'framer-motion';
import { useExperience } from '../../state/ExperienceContext';
import { stations, labels, type StationId } from '../../data/content';
import { palettes } from '../../styles/palettes';
import { sceneVariants } from '../../styles/motionPresets';
import { StationLayout } from './StationLayout';
import { Button } from '../ui/Button';
import { LamplighterScene } from '../scenes/LamplighterScene';
import { KnockerUpScene } from '../scenes/KnockerUpScene';
import { SwitchboardScene } from '../scenes/SwitchboardScene';
import { HumanComputerScene } from '../scenes/HumanComputerScene';
import type { SceneProps } from '../scenes/sceneTypes';

const sceneFor: Record<StationId, (p: SceneProps) => JSX.Element> = {
  lamplighter: LamplighterScene,
  knockerup: KnockerUpScene,
  switchboard: SwitchboardScene,
  computer: HumanComputerScene,
};

// Eine der vier historischen Stationen. Lebendes Bild, Berufsname, Geschichte,
// Abloese-Zeile, und ein dezenter Knopf, der die naechste Station bringt.
export function Station({ step, reduced }: { step: number; reduced: boolean }) {
  const { dispatch } = useExperience();
  const station = stations[step];
  const palette = palettes[station.id];
  const Scene = sceneFor[station.id];

  return (
    <motion.div
      variants={sceneVariants(reduced)}
      initial="initial"
      animate="enter"
      exit="exit"
      className="w-full"
    >
      <StationLayout
        scene={<Scene palette={palette} reduced={reduced} />}
        patina={palette.patinaBase}
        profession={station.profession}
        story={station.story}
        replacedBy={station.replacedBy}
        reduced={reduced}
      >
        <Button onClick={() => dispatch({ type: 'NEXT' })}>{labels.next}</Button>
      </StationLayout>
    </motion.div>
  );
}
