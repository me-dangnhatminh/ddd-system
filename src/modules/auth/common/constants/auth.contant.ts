export const AUTHENTICATED_USER_KEY = 'user';
export const AUTH_USER_TOKEN_KEY = 'x-access-token';

/**
 * @returns user-token:${value}
 * @example USER_TOKEN_CACHE_KEY_PREFIX`${"demo@gmail"}` return user-token:demo@gmail
 * @example USER_TOKEN_CACHE_KEY_PREFIX`abc xyz ${"demo@gmail"}` return user-token:demo@gmail
 */
export const USER_TOKEN_CACHE_KEY_PREFIX = Object.freeze(
  (strings: TemplateStringsArray, value: string) => {
    return `user-token-cache-key:${value}`;
  },
);
