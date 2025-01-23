export const getBirdeyeApiKey = () => {
  return localStorage.getItem('BIRDEYE_API_KEY') || 'de50b259bbc04c419443ba226fa22c71';
};

export const setBirdeyeApiKey = (key: string) => {
  localStorage.setItem('BIRDEYE_API_KEY', key);
};