export const WORKER_URL = 'https://posweb-licensing.chiacchio-eze01.workers.dev';

// Free trial length. TRIAL_PROMO overrides the standard length while a promo runs.
// To end the promo, set TRIAL_PROMO to null and redeploy.
export const STANDARD_TRIAL_DAYS = 7;
export const TRIAL_PROMO: { days: number; label: string } | null = {
  days: 30,
  label: 'Promo de noviembre',
};
export const TRIAL_DAYS = TRIAL_PROMO?.days ?? STANDARD_TRIAL_DAYS;
