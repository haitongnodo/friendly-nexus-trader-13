export const getBirdeyeApiKey = () => {
  return localStorage.getItem('BIRDEYE_API_KEY') || '';
};

export const setBirdeyeApiKey = (key: string) => {
  localStorage.setItem('BIRDEYE_API_KEY', key);
};