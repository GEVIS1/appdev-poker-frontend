import { vi, describe, it, expect } from 'vitest';

import capitalize from '../../src/utils/capitalize';

describe('capitalize tests', () => {
  it('Should capitalize a string', () => {
    const strings = [
      'a',
      'hello world',
      '4jfskja9',
      '...',
      'these strings should really be generated and not hard coded',
    ]
    const capitalizedStrings = [
      'A',
      'Hello world',
      '4jfskja9',
      '...',
      'These strings should really be generated and not hard coded',
    ]

    for (let i = 0; i < strings.length; i += 1) {
      expect(capitalize(strings[i])).toEqual(capitalizedStrings[i]);
    }
  });
});
