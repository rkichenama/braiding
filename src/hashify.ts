import { BraidingState } from './context';
import { decPattern, encPattern } from './util/funcs';

// takes state, returns serialized
export const serialize = (state: BraidingState) => {
  const encoded = encPattern(state);
  return encoded;
};

export const deserialize = (str: string) => {
  const encoded = str
    .replace(/^#/, '');
  return decPattern(encoded);
};
