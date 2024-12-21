/** fixtures */
export const hash = "YTkGJwiQhWUIt4lbgnhZl3asl2BEBGUA";
export const otherHash = "H5cJDYJXd3lwiXeHd3h4h0yA9VNH";

/** querySelector shorthand */
export function $<T extends HTMLElement = HTMLElement>(
  selector: string,
  container: Document | HTMLElement | ShadowRoot = document,
) {
  return container.querySelector<T>(selector);
}

/** querySelectorAll shorthand */
export function $$<T extends HTMLElement = HTMLElement>(
  selector: string,
  container: Document | HTMLElement | ShadowRoot = document,
) {
  return [...container.querySelectorAll<T>(selector)];
}