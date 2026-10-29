export function parseMaxTokens(value) {
  if (value === undefined) return 4096;

  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    throw new Error('OPENROUTER_MAX_TOKENS ต้องเป็นจำนวนเต็มบวก');
  }

  const maxTokens = Number(value);
  if (!Number.isSafeInteger(maxTokens) || maxTokens < 1) {
    throw new Error('OPENROUTER_MAX_TOKENS ต้องเป็นจำนวนเต็มบวก');
  }

  return maxTokens;
}