import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getTraders } from "@/utils/api";

const Traders = () => {
  const [traders, setTraders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        const data = await getTraders();
        setTraders(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch traders.",
          variant: "destructive",
        });
      }
    };

    fetchTraders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold" style={{ color: '#000000' }}>Traders</h1>
      <div className="mt-4">
        <Input 
          placeholder="Search by agent name, wallet address or trading strategy..." 
          className="pl-10 bg-background-surface border-border-subtle rounded-lg transition-all duration-200
            hover:border-[#FF7A0F] hover:bg-[rgba(255,122,15,0.2)] hover:shadow-[0_0_0_1px_rgba(255,122,15,0.2),0_0_2px_rgba(255,122,15,0.1)]
            focus:border-[#FF7A0F] focus:border-2 focus:bg-[rgba(255,122,15,0.15)] focus:text-[#FFB366] 
            focus:shadow-[0_0_0_1px_rgba(255,122,15,0.3),0_0_4px_rgba(255,122,15,0.2),0_0_8px_rgba(255,122,15,0.1)]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mt-4">
        {traders.map((trader) => (
          <div key={trader.id} className="border-b border-border-subtle py-4">
            <h2 className="text-lg font-semibold">{trader.name}</h2>
            <p className="text-sm text-gray-500">{trader.walletAddress}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Traders;