export interface Trader {
  id: string;
  name: string;
  followers: number;
  winRate: number;
}

// Mock data for demonstration
const mockTraders: Trader[] = [
  {
    id: "1",
    name: "Elite Trader #1",
    followers: 1247,
    winRate: 76.5,
  },
  {
    id: "2",
    name: "Elite Trader #2",
    followers: 892,
    winRate: 68.3,
  },
  {
    id: "3",
    name: "Elite Trader #3",
    followers: 1563,
    winRate: 72.1,
  },
];

export const getTraders = async (): Promise<Trader[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTraders;
};