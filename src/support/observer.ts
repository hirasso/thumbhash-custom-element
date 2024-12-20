import type { ThumbHashElement } from "../index.js";

const observedElements = new WeakSet<ThumbHashElement>();

let observer: IntersectionObserver | undefined;

/** Render if intersecting */
const callback: IntersectionObserverCallback = (entries, observer) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;

    const element = target as ThumbHashElement;
    unobserve(element);
    element.render();
  });
};

/** Observe an element */
export function observe(element: ThumbHashElement) {
  /** IntersectionObserver is not available or we're not in a window context */
  if (window?.IntersectionObserver == null) {
    element.render();
    return;
  }

  /** Bail early if already observing */
  if (observedElements.has(element)) {
    return;
  }

  /** Make sure only one IntersectionObserver exists */
  observer ??= new IntersectionObserver(callback, {
    rootMargin: "100% 100% 100% 100%",
  });

  observer.observe(element);
  observedElements.add(element);
}

/** Unobserve an element */
export function unobserve(element: ThumbHashElement) {
  if (!observedElements.has(element)) return;

  observer?.unobserve(element);
  observedElements.delete(element);
}