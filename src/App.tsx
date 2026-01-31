// BUILD: 2026-01-26-14:25:00-ROUTING-FIX
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieConsent from "./components/CookieConsent";
import ScrollToTop from "./components/ScrollToTop";
import InstallPWA from "./components/InstallPWA";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import PricingCalculator from "./pages/PricingCalculator";
import Pricing from "./pages/Pricing";
import Contacts from "./pages/Contacts";
import ForecastForm from "./pages/ForecastForm";
import Accounting from "./pages/Accounting";
import Privacy from "./pages/Privacy";
import TelegramCallback from "./pages/TelegramCallback";
import MobileApp from "./pages/MobileApp";
import MobileBuildGuide from "./pages/MobileBuildGuide";
import UploadAPK from "./pages/UploadAPK";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<PricingCalculator />} />
          <Route path="/agro-calculator" element={<Calculator />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/forecast-form" element={<ForecastForm />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/auth/telegram/callback" element={<TelegramCallback />} />
          <Route path="/mobile-app" element={<MobileApp />} />
          <Route path="/mobile-build-guide" element={<MobileBuildGuide />} />
          <Route path="/upload-apk" element={<UploadAPK />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
        <ScrollToTop />
        <InstallPWA />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;