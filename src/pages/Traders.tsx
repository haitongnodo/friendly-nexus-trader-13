import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getTraders } from "@/api/traders"; // Assuming you have an API function to fetch traders
import TraderProfile from "@/components/trader/TraderProfile";

const Traders = () => {
  const navigate = useNavigate();
  const [traders, setTraders] = useState([]);

  useEffect(() => {
    const fetchTraders = async () => {
      const data = await getTraders();
      setTraders(data);
    };

    fetchTraders();
  }, []);

  const handleTraderClick = (traderId: string) => {
    navigate(`/traders/${traderId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Traders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {traders.map((trader) => (
          <motion.div
            key={trader.id}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleTraderClick(trader.id)}
          >
            <div className="bg-[#151822] rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-semibold">{trader.name}</h2>
              <p className="text-gray-400">Followers: {trader.followers}</p>
              <p className="text-gray-400">Win Rate: {trader.winRate}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Traders;
