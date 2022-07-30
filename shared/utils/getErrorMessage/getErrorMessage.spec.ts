import getErrorMessage from './getErrorMessage';

describe('getErrorMessage', () => {
  it('should return error message', () => {
    const error = new Error('error message');
    expect(getErrorMessage(error)).toBe('error message');
  });
});
