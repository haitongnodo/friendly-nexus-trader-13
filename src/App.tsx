import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Traders from "./pages/Traders";
import CreateAgent from "./pages/CreateAgent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <>
                  <Navigation />
                  <div className="pt-16">
                    <Routes>
                      <Route path="/" element={<Navigate to="/chat" replace />} />
                      <Route path="/chat" element={<Index />} />
                      <Route path="/traders" element={<Traders />} />
                      <Route path="/create-agent" element={<CreateAgent />} />
                      {/* Add other routes as we implement them */}
                    </Routes>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;