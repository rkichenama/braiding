import { BraidingState } from './context';
import { decPattern, encPattern } from './util/funcs';

/**
 * Serializes the BraidingState into a format suitable for the URL hash.
 */
export const serialize = (state: BraidingState) => {
  return encPattern(state);
};

/**
 * Deserializes a string (from the URL hash) back into a partial BraidingState.
 */
export const deserialize = (str: string) => {
  const encoded = str.replace(/^#/, '');
  return decPattern(encoded);
};
