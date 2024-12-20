import type { ThumbHashElement } from "../index.js";

const observedElements = new Set<ThumbHashElement>();

let observer: IntersectionObserver | undefined;

/** Render if intersecting */
const callback: IntersectionObserverCallback = (entries, observer) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;

    const element = target as ThumbHashElement;
    unobserve(element, observer);
    element.render();
  });
};

/** Unobserve an element */
function unobserve(element: ThumbHashElement, observer: IntersectionObserver) {
  if (!observedElements.has(element)) return;

  observer.unobserve(element);
  observedElements.delete(element);
}

/** Observe an element */
export function observe(element: ThumbHashElement) {
  /** IntersectionObserver is not available or we're not in a window context */
  if (!window?.IntersectionObserver) {
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
