import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Index from "@/pages/Index";
import Traders from "@/pages/Traders";
import TraderProfile from "@/components/trader/TraderProfile";

// Wrapper component to get URL parameters
const TraderProfileWrapper = () => {
  const { traderId } = useParams();
  return <TraderProfile traderId={traderId || ""} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/traders" element={<Traders />} />
        <Route path="/traders/:traderId" element={<TraderProfileWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;