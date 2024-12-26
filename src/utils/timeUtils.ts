export function normalizeTimeInput(input: string): string {
  // Remove all non-numeric characters and convert full-width numbers to half-width
  const normalized = input
    .replace(/[：]/g, ':') // Convert full-width colon to half-width
    .replace(/[０-９]/g, char => String.fromCharCode(char.charCodeAt(0) - 0xFEE0)); // Convert full-width numbers

  // Format as HH:MM if possible
  if (normalized.length === 4) {
    return `${normalized.slice(0, 2)}:${normalized.slice(2)}`;
  }

  return normalized;
}

export function validateTimeFormat(time: string): boolean {
  const [hours, minutes] = time.split(':').map(Number);
  return (
    !isNaN(hours) &&
    !isNaN(minutes) &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59
  );
}