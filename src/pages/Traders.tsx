import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getTraders, Trader } from "@/api/traders";
import { Users, TrendingUp } from "lucide-react";

const Traders = () => {
  const navigate = useNavigate();
  const [traders, setTraders] = useState<Trader[]>([]);

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
      <h1 className="text-3xl font-bold mb-6">Elite Traders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {traders.map((trader) => (
          <motion.div
            key={trader.id}
            className="cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleTraderClick(trader.id)}
          >
            <div className="glass rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold">{trader.name}</h2>
              <div className="flex items-center space-x-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span>{trader.followers.toLocaleString()} followers</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span>{trader.winRate}% win rate</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Traders;