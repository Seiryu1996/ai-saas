export const PREPAID_PACKAGES = {
  MINI: {
    id: 'mini',
    name: 'ミニパック',
    credits: 25,
    price: 100,
    priceId: 'price_1RxxoO0wr7BuiSCuBcvPhNCu',
    description: 'お試し用のミニパック',
    popular: false,
  },
  STARTER: {
    id: 'starter',
    name: 'スターターパック',
    credits: 150,
    price: 500,
    priceId: 'price_1RxxpF0wr7BuiSCuNrAThCH7',
    description: '初心者におすすめ',
    popular: false,
  },
  STANDARD: {
    id: 'standard',
    name: 'スタンダードパック',
    credits: 330,
    price: 1000,
    priceId: 'price_1Rxxpf0wr7BuiSCuig6PbafY',
    description: '人気のスタンダードパック',
    popular: true,
  },
  PREMIUM: {
    id: 'premium',
    name: 'プレミアムパック',
    credits: 660,
    price: 2000,
    priceId: 'price_1Rxxq40wr7BuiSCuhxKt35yq',
    description: 'コスパ抜群のプレミアムパック',
    popular: false,
  },
  DELUXE: {
    id: 'deluxe',
    name: 'デラックスパック',
    credits: 1100,
    price: 3000,
    priceId: 'price_1RxxqM0wr7BuiSCuyrvELXw6',
    description: 'たっぷり使えるデラックスパック',
    popular: false,
  },
  ULTIMATE: {
    id: 'ultimate',
    name: 'アルティメットパック',
    credits: 1650,
    price: 4000,
    priceId: 'price_1Rxxqj0wr7BuiSCuZw8sRjac',
    description: '最大容量のアルティメットパック',
    popular: false,
  },
} as const;

export const prepaidPackages = Object.values(PREPAID_PACKAGES);

export type PrepaidPackageId = keyof typeof PREPAID_PACKAGES;