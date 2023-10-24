import { toShortMonth } from '@/utils/dates';

export function buildBlogUrl(year, month, day, slug) {
  const urlBits = ['/blog'];

  if (year !== undefined) {
    urlBits.push(year.toString());

    if (month !== undefined) {
      urlBits.push(toShortMonth(month));

      if (day !== undefined) {
        urlBits.push(day.toString());

        if (slug !== undefined) {
          urlBits.push(slug);
        }
      }
    }
  }

  // For the trailing slash, for back-compat.
  urlBits.push('');

  return urlBits.join("/");
}

export function truncateWords(text) {
  const bits = text.split(' ');
  let revised = bits.slice(0, 10).join(' ');

  if (revised.length != text.length) {
    revised = `${revised}...`;
  }

  return revised;
}
