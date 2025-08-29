// Shared listing feature constants so UI & server stay in sync
// NOTE: feature keys are snake_case; display by replacing _ with space.
export const LISTING_FEATURES = [
  'piscine',
  'piscine_chauffee',
  'terrasse',
  'cave',
  'climatisation',
  'wifi',
  'tv_connectee',
  'interphone',
  'jardin',
  'balcon',
  'parking',
  'garage',
  'cheminee',
  'cuisine_equipee',
  'ascenseur',
  'alarme',
  'chauffage_central',
  'proche_transports',
  'gardien'
] as const;

export type ListingFeature = typeof LISTING_FEATURES[number];
