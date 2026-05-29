import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  /** 'ghost' ist die kaum sichtbare Variante fuer den Ausklang. */
  variant?: 'quiet' | 'ghost';
  type?: 'button' | 'submit';
}

// Ein dezenter Knopf. Nuechtern, ruhig, keine Marketing-Sprache, keine Effekte.
export function Button({ onClick, children, variant = 'quiet', type = 'button' }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center select-none rounded-sm font-sans tracking-wide ' +
    'transition-colors duration-500 ease-out focus:outline-none';

  const styles =
    variant === 'ghost'
      ? 'text-[0.78rem] uppercase tracking-[0.22em] px-3 py-2'
      : 'text-[0.82rem] uppercase tracking-[0.2em] px-6 py-3 border';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ opacity: 1 }}
      whileTap={{ scale: 0.985 }}
      initial={{ opacity: variant === 'ghost' ? 0.4 : 0.72 }}
      animate={{ opacity: variant === 'ghost' ? 0.4 : 0.72 }}
      className={`${base} ${styles}`}
      style={{
        color: 'var(--ink-soft)',
        borderColor: variant === 'ghost' ? 'transparent' : 'color-mix(in srgb, var(--ink-faint) 55%, transparent)',
      }}
    >
      {children}
    </motion.button>
  );
}
