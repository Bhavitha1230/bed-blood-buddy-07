import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
<<<<<<< HEAD
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import Index from "./pages/Index";
import Hospitals from "./pages/Hospitals";
import BloodBank from "./pages/BloodBank";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
=======
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import BedAvailabilityPage from "./pages/BedAvailabilityPage.tsx";
import BloodInventoryPage from "./pages/BloodInventoryPage.tsx";
import AlertsPage from "./pages/AlertsPage.tsx";
import HospitalMapPage from "./pages/HospitalMapPage.tsx";
import AIChatPage from "./pages/AIChatPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
>>>>>>> madhavi/main

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
<<<<<<< HEAD
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/blood-bank" element={<BloodBank />} />
          <Route path="/admin" element={<Admin />} />
=======
          <Route path="/beds" element={<BedAvailabilityPage />} />
          <Route path="/blood" element={<BloodInventoryPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/map" element={<HospitalMapPage />} />
          <Route path="/assistant" element={<AIChatPage />} />
          <Route path="/login" element={<LoginPage />} />
>>>>>>> madhavi/main
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
