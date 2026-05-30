import { motion } from 'framer-motion';
import { useExperience } from '../../state/ExperienceContext';
import { palettes, paletteVars } from '../../styles/palettes';
import { outroActions } from '../../data/content';
import { reveal } from '../../styles/motionPresets';
import { Button } from '../ui/Button';

// Der Ausklang. Stille und viel Schwarzraum. Kein Abschlusstext, keine Moral, nur
// ganz dezent die Moeglichkeit, noch einmal zu beginnen oder zu teilen.
export function OutroSection({ reduced }: { reduced: boolean }) {
  const { reset } = useExperience();

  const onShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Aus der Zeit gefallen', url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // Stilles Scheitern, der Ausklang bleibt ungestoert.
    }
  };

  return (
    <section
      className="relative flex min-h-[110vh] w-full flex-col items-center justify-center px-6"
      style={{ ...paletteVars(palettes.today), background: palettes.today.bgDeep }}
    >
      <motion.div
        variants={reveal(reduced)}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.6 }}
        className="flex items-center gap-10"
      >
        <Button variant="ghost" onClick={reset}>
          {outroActions.again}
        </Button>
        <Button variant="ghost" onClick={onShare}>
          {outroActions.share}
        </Button>
      </motion.div>
    </section>
  );
}
