export function genresQueryFormatter(value: string): string | string[] {
  if (value.indexOf(',') !== -1) {
    return value.split(',');
  }

  return value;
}