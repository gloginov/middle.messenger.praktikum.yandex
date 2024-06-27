// @ts-nocheck
export default function findAncestor (el, sel) {
  while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,sel)));
  return el;
}
