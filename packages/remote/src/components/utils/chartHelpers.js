export function getStepSize(maxValue, numSteps = 5) {
  const roughStep = maxValue / numSteps;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual = roughStep / magnitude;

  if (residual >= 5) return 5 * magnitude;
  if (residual >= 2) return 2 * magnitude;
  return magnitude;
}

export function formatCategory(str) {
  return str?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
