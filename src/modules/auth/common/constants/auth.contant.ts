export const AUTHENTICATED_USER_KEY = 'user';
export const AUTH_USER_TOKEN_KEY = 'x-access-token';

export const USER_CLAIM_KEY_PREFIX = Object.freeze(
  (strings: TemplateStringsArray, value: string) => {
    return `user-claim:${value}`;
  },
);

export const AUTH_TOKEN_KEY_PREFIX = Object.freeze(
  (strings: TemplateStringsArray, value: string) => {
    return `auth-token:${value}`;
  },
);

export const EMAIL_CLAIM_KEY_PREFIX = Object.freeze(
  (strings: TemplateStringsArray, value: string) => {
    return `email-code-cache-key:${value}`;
  },
);
