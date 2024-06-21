import { TitleCasePipe } from './title-case.pipe';

describe('TitleCasePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  const pipe = new TitleCasePipe();
  it('transforms "the dark night rises" to "The Dark Knight Rises"', () => {
    expect(pipe.transform('the dark knight rises')).toBe(
      'The Dark Knight Rises'
    );
  } );
});
