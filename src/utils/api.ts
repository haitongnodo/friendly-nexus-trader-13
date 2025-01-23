// Mock function to get traders data
export const getTraders = async () => {
  // This is a mock implementation
  return [
    {
      id: '1',
      name: 'Trader One',
      walletAddress: '0x1234...5678',
    },
    {
      id: '2',
      name: 'Trader Two',
      walletAddress: '0x8765...4321',
    },
  ];
};