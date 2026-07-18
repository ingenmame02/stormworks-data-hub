/**
 * Locale helpers for part data fields.
 *
 * English is the base field (name, description, ...).
 * Japanese uses the *Ja suffix (nameJa, descriptionJa, ...).
 * Adding another language later can follow the same pattern
 * (e.g. nameZh) without changing call sites much.
 */

export type SupportedLocale = 'ja' | 'en' | string;

export function isJapaneseLocale(locale: SupportedLocale): boolean {
  return locale === 'ja' || locale.startsWith('ja-');
}

/** Pick localized text; fall back to English when translation is empty. */
export function pickLocalized(
  locale: SupportedLocale,
  english: string | undefined | null,
  japanese: string | undefined | null,
): string {
  const en = english ?? '';
  const ja = japanese ?? '';
  if (isJapaneseLocale(locale)) {
    return ja || en;
  }
  return en || ja;
}
