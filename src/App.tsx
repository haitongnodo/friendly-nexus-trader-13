import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Traders from "@/pages/Traders";
import TraderProfile from "@/components/trader/TraderProfile";
import Navigation from "@/components/Navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Wrapper component to get URL parameters
const TraderProfileWrapper = () => {
  const { traderId } = useParams<{ traderId: string }>();
  return <TraderProfile traderId={traderId || ""} />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navigation />
        <div className="pt-16"> {/* Add padding to account for fixed header */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/traders" element={<Traders />} />
            <Route path="/traders/:traderId" element={<TraderProfileWrapper />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;