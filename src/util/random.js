function choice(m, n) {
  return Math.floor(Math.random() * (n - m) + m)
}

export function shuffle(array) {
  const length = array.length
  let i = length
  let j

  if (length === 0) {
    return []
  }

  while (--i) {
    j = choice(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}