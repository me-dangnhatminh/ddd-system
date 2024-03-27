/**
 *  Calculate the time difference between the current time and the given time.
 * @param at
 * @param options
 * @returns {number} The time difference in seconds.
 */
const toExpiresIn = (
  at: number | Date,
  options: { now?: Date } = {},
): number => {
  const now = options.now || new Date();
  const expiredAt = at instanceof Date ? at : new Date(at);
  return Math.floor((expiredAt.getTime() - now.getTime()) / 1000);
};

export const DateTimeUtil = Object.freeze({
  toExpiresIn,
});
