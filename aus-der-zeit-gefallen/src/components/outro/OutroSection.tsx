import { motion } from 'framer-motion';
import { useExperience } from '../../state/ExperienceContext';
import { palettes, paletteVars } from '../../styles/palettes';
import { outroActions } from '../../data/content';
import { reveal } from '../../styles/motionPresets';
import { Button } from '../ui/Button';

// Der Ausklang. Stille und viel Schwarzraum. Kein erklaerender Text, keine Moral,
// kein Call to Action. Nach einer Weile, sehr dezent, nur die Moeglichkeit, noch
// einmal zu beginnen.
export function OutroSection({ reduced }: { reduced: boolean }) {
  const { reset } = useExperience();

  return (
    <section
      className="relative flex min-h-[120vh] w-full flex-col items-center justify-center px-6"
      style={{ ...paletteVars(palettes.today), background: palettes.today.bgDeep }}
    >
      <motion.div
        variants={reveal(reduced)}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.6 }}
      >
        <Button variant="ghost" onClick={reset}>
          {outroActions.again}
        </Button>
      </motion.div>
    </section>
  );
}
