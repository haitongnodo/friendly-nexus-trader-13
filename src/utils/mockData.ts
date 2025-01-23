import { faker } from '@faker-js/faker';

export interface TopTrader {
  rank: number;
  medal: string;
  address: string;
  pnl: string;
  volume: string;
  tradeCount: string;
}

export interface HotToken {
  rank: number;
  medal: string;
  name: string;
  description: string;
  price: string;
  liquidity: string;
  volume24h: string;
  change24h: string;
}

const getMedal = (rank: number): string => {
  switch (rank) {
    case 1: return "🥇";
    case 2: return "🥈";
    case 3: return "🥉";
    default: return "";
  }
};

const formatNumber = (num: number, prefix: string = ""): string => {
  if (num >= 1000000) {
    return `${prefix}${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `${prefix}${(num / 1000).toFixed(2)}K`;
  }
  return `${prefix}${num.toFixed(2)}`;
};

const generateHexAddress = (): string => {
  return "0x" + Array.from({ length: 64 })
    .map(() => faker.number.hex({ min: 0, max: 15 }))
    .join("");
};

export const generateTopTraders = (): TopTrader[] => {
  return Array.from({ length: 10 }).map((_, index) => {
    const rank = index + 1;
    const volume = faker.number.float({ min: 1000000, max: 100000000 });
    const pnl = faker.number.float({ min: 100000, max: 20000000 });
    const trades = faker.number.int({ min: 10, max: 10000 });

    return {
      rank,
      medal: getMedal(rank),
      address: generateHexAddress(),
      pnl: formatNumber(pnl, "+$"),
      volume: formatNumber(volume, "$"),
      tradeCount: formatNumber(trades),
    };
  });
};

const TOKEN_NAMES = ["TRUMP", "DEEP", "ET", "MOHAMMAD", "HIPPO", "STARGATE", "USDY", "SUAI", "S"];
const TOKEN_DESCRIPTIONS: Record<string, string> = {
  TRUMP: "Book of Trump",
  DEEP: "DeepBook Token",
  ET: "Eternal Token",
  MOHAMMAD: "Mohammad Token",
  HIPPO: "Hippo Exchange",
  STARGATE: "Stargate Protocol",
  USDY: "USD Yield",
  SUAI: "SUI AI Token",
  S: "S Protocol"
};

export const generateHotTokens = (): HotToken[] => {
  return Array.from({ length: 10 }).map((_, index) => {
    const rank = index + 1;
    const name = TOKEN_NAMES[faker.number.int({ min: 0, max: TOKEN_NAMES.length - 1 })];
    const price = faker.number.float({ min: 0.0001, max: 1000 });
    const liquidity = faker.number.float({ min: 10000, max: 20000000 });
    const volume = faker.number.float({ min: 10000, max: 50000000 });
    const change = faker.number.float({ min: -99, max: 5000 });

    return {
      rank,
      medal: getMedal(rank),
      name,
      description: TOKEN_DESCRIPTIONS[name],
      price: `$${price.toFixed(4)}`,
      liquidity: formatNumber(liquidity, "$"),
      volume24h: formatNumber(volume, "$"),
      change24h: `${change >= 0 ? "🟢" : "🔴"} ${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
    };
  });
};