// Uzbek phone mask: +998 ## ### ## ## — 9 national digits after the +998 prefix.
const NATIONAL_LEN = 9;

/** Digits typed after the +998 country code, capped at 9. Accepts raw or already-masked input. */
export function uzNationalDigits(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('998')) digits = digits.slice(3);
  return digits.slice(0, NATIONAL_LEN);
}

/** Format any input into `+998 90 123 45 67`. Empty input stays empty (so placeholder shows). */
export function formatUzPhone(value: string): string {
  const d = uzNationalDigits(value);
  if (!d) return '';
  let out = `+998 ${d.slice(0, 2)}`;
  if (d.length > 2) out += ` ${d.slice(2, 5)}`;
  if (d.length > 5) out += ` ${d.slice(5, 7)}`;
  if (d.length > 7) out += ` ${d.slice(7, 9)}`;
  return out;
}

/** True once all 9 national digits are present. */
export function isUzPhoneComplete(value: string): boolean {
  return uzNationalDigits(value).length === NATIONAL_LEN;
}
