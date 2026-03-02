/**
 * Basic test to verify Jest and fast-check are configured correctly
 */
import fc from 'fast-check'

describe('Testing Infrastructure Setup', () => {
  test('Jest is configured and running', () => {
    expect(true).toBe(true)
  })

  test('fast-check is available and working', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return typeof n === 'number'
      }),
      { numRuns: 10 }
    )
  })
})
