import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

// Ein Textbereich, der fast immer ganz auf den Schirm passt. Falls ausnahmsweise
// doch etwas ueberlaeuft (sehr lange Geschichte auf kleinem Geraet), erscheint ein
// dezenter Verlauf mit Pfeil als sichtbarer Hinweis, statt eines stummen Scrolls.
export function ScrollText({
  children,
  maxHeight,
  reduced,
}: {
  children: ReactNode;
  maxHeight: string;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
    check();
    el.addEventListener('scroll', check, { passive: true });
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(check);
      ro.observe(el);
    }
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      ro?.disconnect();
      window.removeEventListener('resize', check);
    };
  }, [children]);

  return (
    <div className="relative w-full">
      <div
        ref={ref}
        data-scroll
        className="no-scrollbar flex w-full flex-col items-center"
        style={{ maxHeight, overflowY: 'auto' }}
      >
        {children}
      </div>
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: more ? 1 : 0 }}
        transition={{ duration: reduced ? 0.15 : 0.4, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center"
        style={{ height: '2.6rem', background: 'linear-gradient(to top, var(--bg), transparent)' }}
      >
        <motion.span
          animate={reduced ? { y: 0 } : { y: [0, 3, 0] }}
          transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--ink-faint)', fontSize: '0.95rem', lineHeight: 1, marginBottom: '0.2rem' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </div>
  );
}
