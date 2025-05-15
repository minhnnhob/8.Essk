export function splitText(selector, type) {
  const split = new SplitText(selector, {
    types: type,
  });
  let targets;

  if (type === "chars") {
    targets = split.chars;
  } else if (type === "words") {
    targets = split.words;
  } else if (type === "lines") {
    targets = split.lines;
  } else {
    console.warn("Unsupported type:", type);
    return;
  }

  return targets;
}
