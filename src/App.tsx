import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Traders from "@/pages/Traders";
import TraderProfile from "@/components/trader/TraderProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/traders" element={<Traders />} />
        <Route path="/traders/:traderId" element={<TraderProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
