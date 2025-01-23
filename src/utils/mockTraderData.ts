import { faker } from '@faker-js/faker';

export interface Trader {
  id: string;
  agent: string;
  address: string;
  winRate: string;
  pnl24h: string;
  pnl4d: string;
  volume: string;
  copiers: string;
  strategy: 'Momentum' | 'Mean Reversion' | 'Breakout' | 'Scalping' | 'Grid Trading';
  pairs: string[];
}

const tradingPairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'AVAX/USDT', 'BNB/USDT', 'ADA/USDT'];
const strategies = ['Momentum', 'Mean Reversion', 'Breakout', 'Scalping', 'Grid Trading'] as const;

export const generateTraders = (count: number): Trader[] => {
  return Array(count).fill(null).map((_, index) => {
    const winRate = faker.number.float({ min: 50, max: 95, fractionDigits: 1 });
    const pnl24h = faker.number.float({ min: -10000, max: 10000, fractionDigits: 2 });
    const pnl4d = faker.number.float({ min: -25000, max: 25000, fractionDigits: 2 });
    const volume = faker.number.float({ min: 100000, max: 5000000, fractionDigits: 2 });
    const copiers = faker.number.int({ min: 10, max: 2000 });
    
    return {
      id: faker.string.uuid(),
      agent: `AI Agent #${(index + 1).toString().padStart(3, '0')}`,
      address: faker.string.hexadecimal({ length: 40, prefix: '0x' }),
      winRate: `${winRate}%`,
      pnl24h: pnl24h > 0 ? `+$${pnl24h.toLocaleString()}` : `-$${Math.abs(pnl24h).toLocaleString()}`,
      pnl4d: pnl4d > 0 ? `+$${pnl4d.toLocaleString()}` : `-$${Math.abs(pnl4d).toLocaleString()}`,
      volume: `$${volume.toLocaleString()}`,
      copiers: copiers.toString(),
      strategy: strategies[Math.floor(Math.random() * strategies.length)],
      pairs: faker.helpers.arrayElements(tradingPairs, { min: 1, max: 4 }),
    };
  });
};