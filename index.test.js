const { nope } = require('./index');

describe('pope of nope', () => {
  test('allow me to pass a formatter to a string', () => {
    const result = nope(
      'Hello, you are now {{ number | currency }} richer',
      { number: 80000 },
      {
        currency: () => {
          return '80,000';
        },
      }
    );
    expect(result).toBe('Hello, you are now 80,000 richer');
  });
});
