import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Lock, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Truck,
  Plus,
  Minus,
  X
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const Checkout = () => {
  const navigate = useNavigate();
  const { items: cartItems, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  
  useScrollToTop();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    useShippingAsBilling: true,
    saveInfo: true,
    emailOffers: true,
    shippingProtection: false
  });

  const [shippingMethod, setShippingMethod] = useState("");
  const [discountCode, setDiscountCode] = useState("");

  // Calculate totals
  const shipping = subtotal > 75 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const protectionFee = formData.shippingProtection ? 1200 : 0;
  const total = subtotal + shipping + tax + protectionFee;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = () => {
    // Prepare order payload and send to backend
    (async () => {
      try {
        const payload = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          phone: formData.phone,
          items: cartItems.map((it: any) => ({ productId: it.id, quantity: it.quantity, price: it.price })),
          subtotal,
          taxAmount: tax,
          shippingAmount: shipping,
          totalAmount: total,
          paymentMethod: 'COD',
          notes: ''
        };

        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiBase}/api/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) {
          console.error('Checkout failed', data);
          alert(data.message || 'Failed to create order');
          return;
        }

        // Success: clear cart and navigate to confirmation (or home)
        clearCart();
        // If you have an order confirmation page, navigate there. For now navigate to home.
        navigate('/');
      } catch (error) {
        console.error('Checkout error', error);
        alert('An error occurred while placing the order.');
      }
    })();
  };

  const addToOrder = (item: any) => {
    // This would add the recommended item to cart
    console.log("Adding to order:", item);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 lg:px-8 py-16">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-serif font-bold text-foreground">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground">
              Please add items to your cart before proceeding to checkout.
            </p>
            <Button variant="premium" size="lg" onClick={() => navigate("/cart")}>
              View Cart
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Express Checkout */}
            <div className="space-y-4">
              <h1 className="text-2xl font-serif font-bold text-foreground">Checkout</h1>
              
              {/* Cash on Delivery Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Cash on Delivery Available</h3>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Pay when your order is delivered to your doorstep. No online payment required.
                </p>
              </div>
              
              {/* Disabled Express Checkout Options */}
              <div className="space-y-3 opacity-50">
                <Button 
                  variant="outline" 
                  className="w-full h-12 bg-gray-100 text-gray-500 cursor-not-allowed" 
                  disabled
                >
                  <span className="font-semibold">Online Payment - Coming Soon</span>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Online payment options will be available soon
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground">
                By continuing with your order, you agree to pay cash on delivery and our terms of service.
              </p>
            </div>

            {/* Contact */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">Contact</h2>
                <Button variant="link" className="p-0 h-auto">
                  Sign in
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emailOffers"
                    checked={formData.emailOffers}
                    onCheckedChange={(checked) => handleInputChange("emailOffers", checked as boolean)}
                  />
                  <Label htmlFor="emailOffers" className="text-sm">
                    Email me with news and offers
                  </Label>
                </div>
              </div>
            </Card>

            {/* Delivery */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Delivery</h2>
              
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  This product is not available for delivery to your location.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Bloat - 3 Month Delivery</span>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Change delivery address or remove unavailable item.
                  </Button>
                </div>
                
                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>ATTENTION CUSTOMERS:</strong> Due to shipping issues, we are currently unable to deliver to PO Box addresses. For all standard addresses, shipping will continue as normal.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country/Region</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="pk">Pakistan</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter your address"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange("apartment", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="zipCode">ZIP code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Enter mobile # for order, shipping, subscription, and product guidance...</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+92"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Shipping Method */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Shipping & Delivery</h2>
              
              <div className="space-y-4">
                {/* Standard COD Delivery */}
                <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800">Standard Delivery (COD)</p>
                        <p className="text-sm text-blue-700">Delivery within 3-5 business days</p>
                      </div>
                    </div>
                    <span className="font-semibold text-blue-800">
                      {shipping === 0 ? 'Free' : `PKR ${shipping.toLocaleString()}.00`}
                    </span>
                  </div>
                </div>
                
                {/* Optional Shipping Protection */}
                <div className="flex items-center space-x-2 p-3 border rounded-lg bg-gray-50">
                  <Checkbox
                    id="shippingProtection"
                    checked={formData.shippingProtection}
                    onCheckedChange={(checked) => handleInputChange("shippingProtection", checked as boolean)}
                  />
                  <Label htmlFor="shippingProtection" className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Shipping Protection (Optional)</span>
                        <p className="text-sm text-muted-foreground">Coverage for lost or damaged packages</p>
                      </div>
                      <span className="font-semibold">PKR 1,200.00</span>
                    </div>
                  </Label>
                </div>
                
                {/* Disabled Express Options */}
                <div className="opacity-40 pointer-events-none">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Express Delivery - Coming Soon</span>
                    </div>
                    <div className="h-16 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Next Day Delivery - Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Payment Method</h2>
              
              {/* Cash on Delivery - Active Option */}
              <div className="space-y-4">
                <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Cash on Delivery (COD)</span>
                    </div>
                  </div>
                  <p className="text-sm text-green-700 mt-2 ml-7">
                    Pay with cash when your order is delivered. No advance payment required.
                  </p>
                </div>
                
                {/* Disabled Online Payment Options */}
                <div className="opacity-40 pointer-events-none">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg bg-gray-50">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-500">Credit/Debit Card - Coming Soon</span>
                    <div className="flex space-x-2 ml-auto">
                      <div className="w-8 h-5 bg-gray-300 rounded text-white text-xs flex items-center justify-center">V</div>
                      <div className="w-8 h-5 bg-gray-300 rounded text-white text-xs flex items-center justify-center">M</div>
                      <div className="w-8 h-5 bg-gray-300 rounded text-white text-xs flex items-center justify-center">A</div>
                    </div>
                  </div>
                  
                  {/* Disabled Card Details - Keep for future use */}
                  <div className="space-y-4 opacity-30 pointer-events-none">
                    <div>
                      <Label htmlFor="cardNumber" className="text-gray-400">Card number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          value=""
                          placeholder="1234 5678 9012 3456"
                          disabled
                          className="bg-gray-100 text-gray-400"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Lock className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-gray-400">Expiration date (MM/YY)</Label>
                        <Input
                          id="expiryDate"
                          value=""
                          placeholder="MM/YY"
                          disabled
                          className="bg-gray-100 text-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-gray-400">Security code</Label>
                        <div className="relative">
                          <Input
                            id="cvv"
                            value=""
                            placeholder="123"
                            disabled
                            className="bg-gray-100 text-gray-400"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Info className="h-4 w-4 text-gray-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardName" className="text-gray-400">Name on card</Label>
                      <Input
                        id="cardName"
                        value=""
                        disabled
                        className="bg-gray-100 text-gray-400"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 opacity-50">
                      <Checkbox
                        id="useShippingAsBilling"
                        checked={false}
                        disabled
                      />
                      <Label htmlFor="useShippingAsBilling" className="text-sm text-gray-400">
                        Use shipping address as billing address
                      </Label>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <Info className="h-4 w-4 inline mr-1" />
                      Online payment methods will be available soon. For now, enjoy the convenience of Cash on Delivery.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Remember me - Disabled for now */}
            <Card className="p-6 opacity-50">
              <h2 className="text-lg font-semibold text-foreground mb-4">Save Information (Coming Soon)</h2>
              
              <div className="space-y-4 pointer-events-none">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveInfo"
                    checked={false}
                    disabled
                  />
                  <Label htmlFor="saveInfo" className="text-sm text-gray-500">
                    Save my information for a faster checkout with a Shop account
                  </Label>
                </div>
                
                <div>
                  <Label htmlFor="phoneNumber" className="text-gray-500">Mobile phone number</Label>
                  <Input
                    id="phoneNumber"
                    value=""
                    placeholder="+92"
                    disabled
                    className="bg-gray-100 text-gray-400"
                  />
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Account features coming soon</span>
                </div>
              </div>
            </Card>

            {/* Clear Call-to-Action for COD */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-1">
              <Button 
                onClick={handleCheckout}
                className="w-full h-12 bg-white text-green-700 hover:bg-green-50 font-semibold text-lg"
              >
                <Truck className="h-5 w-5 mr-2" />
                Place Order - Cash on Delivery
              </Button>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                ✓ No advance payment required
              </p>
              <p className="text-sm text-muted-foreground">
                ✓ Pay when your order arrives
              </p>
            </div>
          </div>

          {/* Order Summary & Recommendations */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">3 month subscription with 20% discount</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">Rs {item.price.toLocaleString()}.00</div>
                      <div className="text-xs text-muted-foreground">Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
                
                {formData.shippingProtection && (
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Truck className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">Route Package Protection</h3>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">Rs 1,200.00</div>
                      <div className="text-xs text-muted-foreground">$3.95</div>
                    </div>
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">Rs {subtotal.toLocaleString()}.00</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `Rs ${shipping.toLocaleString()}.00`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">Rs {tax.toLocaleString()}.00</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>PKR Rs {total.toLocaleString()}.00</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Recurring subtotal: Rs {subtotal.toLocaleString()}.00 every 3 months
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Discount code or gift card"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;

