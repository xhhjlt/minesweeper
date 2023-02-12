export function shuffle<T>(arr: Array<T>): Array<T> {
  const copy: Array<T> = arr.slice();
  const result: Array<T> = [];
  while (copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    result.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }
  return result as Array<T>;
}