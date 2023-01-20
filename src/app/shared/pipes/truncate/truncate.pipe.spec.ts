import { TruncatePipe } from './truncate.pipe'

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('truncate string', () => {
    expect(pipe.transform('123456789', 3, '...')).toBe('123...');
  });
});
