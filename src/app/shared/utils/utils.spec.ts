import { range, pluck } from './utils';

describe('utils', () => {
  describe('range', () => {
    it('returns correct range from 1 to 10', () => {
      expect(range(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
    it('returns correct range from 44 to 48', () => {
      expect(range(44, 48)).toEqual([44, 45, 46, 47]);
    });
  });

  describe('pluck', () => {
    it('returns correct result', () => {
      const data = [
        { id: '01', name: 'foo' },
        { id: '02', name: 'bar' },
        { id: '03', name: 'baz' },
      ];
      expect(pluck(data, 'id')).toEqual(['01', '02', '03']);
    });
  });
});
