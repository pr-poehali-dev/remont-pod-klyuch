// BUILD: 2026-01-26-14:25:00-ROUTING-FIX
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieConsent from "./components/CookieConsent";
import ScrollToTop from "./components/ScrollToTop";
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
import MobileLogin from "./pages/MobileLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import AppDownload from "./pages/AppDownload";
import Dashboard from "./pages/Dashboard";
import NotificationSettings from "./pages/NotificationSettings";
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
          <Route path="/mobile-login" element={<MobileLogin />} />
          <Route path="/mobile-app" element={<MobileApp />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/app-download" element={<AppDownload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notification-settings" element={<NotificationSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
        <ScrollToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;