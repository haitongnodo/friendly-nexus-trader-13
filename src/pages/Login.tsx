import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Twitter, MessageSquare } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    // TODO: Implement actual wallet connection
    setTimeout(() => {
      setIsLoading(false);
      navigate("/chat");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to NODO</h1>
          <p className="text-gray-400">Your AI Trading Companion</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-gray-400">Connect with</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleConnect}
            disabled={isLoading}
            className="w-full orange-gradient text-white rounded-lg p-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Connect SUI Wallet</span>
          </button>

          <button className="w-full glass text-white rounded-lg p-3 font-medium hover:bg-white/20 transition-colors flex items-center justify-center space-x-2">
            <Twitter className="w-5 h-5" />
            <span>Continue with Twitter</span>
          </button>
        </div>

        <p className="text-sm text-gray-400">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;