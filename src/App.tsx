import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ChatProvider } from "./contexts/ChatContext";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import ChatWidget from "./components/ChatWidget";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Learn from "./pages/Learn";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AdminLogin from "./pages/AdminLogin";
// Benefit pages
import Sleep from "./pages/benefit/Sleep";
import Mood from "./pages/benefit/Mood";
import Beauty from "./pages/benefit/Beauty";
import GutHealth from "./pages/benefit/GutHealth";
import Energy from "./pages/benefit/Energy";
import Immunity from "./pages/benefit/Immunity";
import CognitiveHealth from "./pages/benefit/CognitiveHealth";
import UltraStrength from "./pages/benefit/UltraStrength";
import WomensHealth from "./pages/benefit/WomensHealth";
import Multivitamins from "./pages/benefit/Multivitamins";
import Kids from "./pages/benefit/Kids";
import Adaptogens from "./pages/benefit/Adaptogens";
import FoundationalWellness from "./pages/benefit/FoundationalWellness";
import Vegetarian from "./pages/benefit/Vegetarian";
// New backend category benefit pages
import Skincare from "./pages/benefit/Skincare";
import AntiAging from "./pages/benefit/AntiAging";
import WellnessSupplements from "./pages/benefit/WellnessSupplements";
import DetoxCleanse from "./pages/benefit/DetoxCleanse";
import NADSupplements from "./pages/benefit/NADSupplements";
import AdminDashbord from "./pages/AdminDashbord";
import { RequireAdmin } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

// Wrapper component that handles scroll-to-top functionality
const AppRouter = () => {
  useScrollToTop();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/account" element={<Account />} />
      
      {/* Benefit pages */}
      <Route path="/benefit/ultra-strength" element={<UltraStrength />} />
      <Route path="/benefit/sleep" element={<Sleep />} />
      <Route path="/benefit/mood" element={<Mood />} />
      <Route path="/benefit/beauty" element={<Beauty />} />
      <Route path="/benefit/womens-health" element={<WomensHealth />} />
      <Route path="/benefit/gut-health" element={<GutHealth />} />
      <Route path="/benefit/immunity" element={<Immunity />} />
      <Route path="/benefit/multivitamins" element={<Multivitamins />} />
      <Route path="/benefit/kids" element={<Kids />} />
      <Route path="/benefit/energy" element={<Energy />} />
      <Route path="/benefit/adaptogens" element={<Adaptogens />} />
      <Route path="/benefit/foundational-wellness" element={<FoundationalWellness />} />
      <Route path="/benefit/cognitive-health" element={<CognitiveHealth />} />
      <Route path="/benefit/vegetarian" element={<Vegetarian />} />
      
      {/* Backend category benefit pages */}
      <Route path="/benefit/skincare" element={<Skincare />} />
      <Route path="/benefit/anti-aging" element={<AntiAging />} />
      <Route path="/benefit/wellness-supplements" element={<WellnessSupplements />} />
      <Route path="/benefit/detox-cleanse" element={<DetoxCleanse />} />
      <Route path="/benefit/nad-supplements" element={<NADSupplements />} />

      {/* Admin */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashbord />
          </RequireAdmin>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <ChatProvider>
          <Toaster />
          <BrowserRouter future={{ v7_startTransition: true }}>
            <AppRouter />
          </BrowserRouter>
          <ChatWidget />
        </ChatProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
