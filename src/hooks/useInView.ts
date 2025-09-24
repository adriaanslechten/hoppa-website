// src/hooks/useInView.ts
import { useEffect, useRef, useState, MutableRefObject } from "react";

export type UseInViewOptions = {
  /** Trigger only the first time the element enters the viewport */
  once?: boolean;
  /** Root margin to start reveal a bit earlier/later e.g. "-80px" */
  rootMargin?: string;
  /** Intersection threshold */
  threshold?: number | number[];
};

type UseInViewReturn<T extends HTMLElement> = {
  ref: MutableRefObject<T | null>;
  inView: boolean;
};

export function useInView<T extends HTMLElement = HTMLElement>({
  once = true,
  rootMargin = "-10% 0px",
  threshold = 0.1,
}: UseInViewOptions = {}): UseInViewReturn<T> {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect reduced motion – render visible without transitions
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}

export default useInView;
