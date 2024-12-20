import type { ThumbHashElement } from "../index.js";

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

  /** Make sure only one IntersectionObserver exists */
  observer ??= new IntersectionObserver(callback, {
    rootMargin: "100% 100% 100% 100%",
  });

  observer.observe(element);
}

/** Unobserve an element */
export function unobserve(element: ThumbHashElement) {
  observer?.unobserve(element);
}